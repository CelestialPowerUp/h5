'use strict';

var gutil = require('gulp-util');
var through = require('through-gulp');
//var file = require('vinyl-file');

module.exports = function(root) {
    var mapObj, initFiles = [], replacedFiles = [];

    root = root.replace(/^(\.\/)*/, '');

    Function.prototype.genMapObjKey = function(index, callback) {
        var __self = this;
        return function() {
            var ret = callback.apply(this, arguments);
            if (ret) {
                var args = Array.from(arguments);
                args.splice(index, 1, ret);
                return __self.apply(this, args);
            } else {
                return __self.apply(this, arguments);
            }
        };
    };

    function genEqual(toEqual) {
        return function(currentValue) {
            return toEqual === currentValue;
        };
    }

    function compile(context, content, file) {
        var continueToCompile = false;
        var replaceValue = function(matched, $1, $2) {
            continueToCompile = true;
            var fileContent = mapObj[$2];
            //console.log(context, file.path, matched, $1, $2, Boolean(fileContent));
            if (fileContent) {
                if (replacedFiles.some(genEqual($2))) {
                    return '';
                } else {
                    replacedFiles.push($2);
                    return fileContent;
                }
            } else {
                throw 'sth. wrong when compiling...';
            }
        }.genMapObjKey(2, function(matched, $1, $2) {
            if ($1 === 'load') {
                if (mapObj[context + '/' + $2 + '.js']) {
                    return context + '/' + $2 + '.js';
                } else {
                    return 'default/' + $2 + '.js';
                }
            }
        }).genMapObjKey(2, function(matched, $1, $2) {
            if ($1 === 'load_default') {
                return 'default/' + $2 + '.js';
            }
        }).genMapObjKey(2, function(matched, $1, $2) {
            if ($1 === 'load_lib') {
                return 'lib/' + $2 + '.js';
            }
        });
        var replacedContent = content.replace(/yangaiche\(sys\.(load.*?)_module\)\(['"](.*?)['"]\)[,;]*/, replaceValue);
        if (continueToCompile) {
            return compile(context, replacedContent, file);
        } else {
            return replacedContent;
        }
    }

    return through(function(file, encoding, callback) {

        if (file.isStream()) {
            callback(new gutil.PluginError('compile_init', 'Streaming not supported'));
            return;
        }

        if (file.isBuffer()) {

            const path = file.path;
            var content = file.contents.toString();

            if (path.endsWith('.json')) {
                mapObj = JSON.parse(content);
                callback();
                return;
            } else {
                var mapObjKey = path.substring(file.base.length).match(/(.*)-.*\.js$/)[1] + '.js';

                mapObj[mapObjKey] = content;
            }

            if (path.match(/init\/.*_init-.*\.js$/)) {
                initFiles.push(file);
            }

        }

        //给下一个流
        this.push(file);
        callback();

    }, function(callback) {

        for (var i = 0; i < initFiles.length; i++) {
            var initFile = initFiles[i];
            var simpleFileName = initFile.path.substring(initFile.base.length), context;
            if (simpleFileName[0] === '/') {
                context = simpleFileName.match(/\/(.*?)\/.*/)[1];
            } else {
                context = simpleFileName.match(/(.*?)\/.*/)[1];
            }
            replacedFiles = [];
            try {
                var compiledInitFile = compile(context, initFile.contents.toString(), initFile);
            } catch (e) {
                callback(new gutil.PluginError('compile_init', e));
            }
            initFile.contents = new Buffer(compiledInitFile);
            this.push(initFile);
        }

        console.log('well done compiling _init.js(es)');

        callback();
    });
};