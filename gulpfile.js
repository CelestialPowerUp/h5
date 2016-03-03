/**
 * 组件安装
 * npm install gulp-util gulp-modify through-gulp gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-rev gulp-rev-collector gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'),                       //基础库
    imagemin = require('gulp-imagemin'),          //图片压缩
    sass = require('gulp-ruby-sass'),             //sass
    minifycss = require('gulp-minify-css'),       //css压缩
    jshint = require('gulp-jshint'),              //js检查
    uglify = require('gulp-uglify'),              //js压缩
    rename = require('gulp-rename'),              //重命名
    concat = require('gulp-concat'),              //合并文件
    clean = require('gulp-clean'),                //清空文件夹
    rev = require('gulp-rev'),                    //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'), //替换相应的文件
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    replace = require('gulp-replace'),
    minimist = require('minimist'),
    compile = require('./gulp-plugin/compile_init.js');

var knownOptions = {
    string: ['dstRoot', 'f'],
    default: {dstRoot: process.env.NODE_ENV || 'production', f: process.env.NodeENV || '*'}
};

var options = minimist(process.argv.slice(2), knownOptions);

var srcRoot = './webapp',
    dstRoot = './' + options.dstRoot,
    thirdLibRoot = '/3rdLibs',
    thirdLibSrcRoot = srcRoot + thirdLibRoot,
    thirdLibDstRoot = dstRoot + thirdLibRoot;

// HTML处理
gulp.task('html', function () {
    var htmlSrc = srcRoot + '/**/*.html';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(dstRoot));
});

// Activity文件
gulp.task('activityImages', function () {
    var activityImagesSrc = srcRoot + '/activities/**/*.png';

    gulp.src(activityImagesSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(dstRoot + '/activities'));
});

// 配置文件
gulp.task('cfg', function () {
    var cfgSrc = srcRoot + '/map/*',
        cfgDst = dstRoot + '/map';

    gulp.src(cfgSrc)
        .pipe(gulp.dest(cfgDst));
});

// 样式处理
gulp.task('css', function () {
    var cssSrc = srcRoot + '/css/**/*',
        thirdLibCssSrc = thirdLibSrcRoot + '/css/**/*',
        cssDst = dstRoot + '/css',
        thirdLibCssDst = thirdLibDstRoot + '/css';

    gulp.src(cssSrc)
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));

    gulp.src(thirdLibCssSrc)
        .pipe(gulp.dest(thirdLibCssDst));
});

// 图片处理
gulp.task('images', function () {
    var imgSrc = srcRoot + '/img/**/*',
        imgDst = dstRoot + '/img';

    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// js处理
gulp.task('js', function () {
    var jsSrc = srcRoot + '/js/**/*.js',
        thirdLibJsSrc = thirdLibSrcRoot + '/js/**/*.js',
        jsDst = dstRoot + '/js',
        thirdLibJsDst = thirdLibDstRoot + '/js';

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(rev())
        .pipe(gulp.dest(jsDst))
        .pipe(rev.manifest('map.json'))
        .pipe(gulp.dest(dstRoot));

    gulp.src(thirdLibJsSrc)
        .pipe(gulp.dest(thirdLibJsDst));
});

// 清空
gulp.task('clean', function () {
    gulp.src(dstRoot)
        .pipe(clean());
});

// 构建任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('build', function () {
    gulp.start('html', 'activityImages', 'cfg', 'css', 'images', 'js');
});

// 替换成md5版本
gulp.task('rev', function () {
    gulp.src([dstRoot + '/map.json', dstRoot + '/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(dstRoot));
});

gulp.task('genData', function() {
    // 生成数据包
    gulp.src([dstRoot + '/map.json', dstRoot + '/js/**/*.js'])
        .pipe(compile(dstRoot))
        //.pipe(modify({
        //    fileModifier: function(file, contents) {
        //
        //        var compiledFileContent = compiledFiles[file.path];
        //        if (compiledFileContent) {
        //
        //            return compiledFileContent;
        //        } else {
        //
        //            return contents;
        //        }
        //    }
        //}))
        .pipe(gulp.dest(dstRoot + '/js/'));
});

// 整体处理JS文件,添加;(function() {...} ());
gulp.task('batch', function () {
    //gulp.src(srcRoot + '/js/**/*.js')
    gulp.src(srcRoot + '/**/*.html')
        //.pipe(header(';(function() {\n\n\t\'use strict\';\n\n'))
        //.pipe(footer('\n} ());'))
        //.pipe(replace(/\['(.*?)']/g, '.$1'))
        //.pipe(replace(/"(.*?)"/g, '\'$1\''))
        //.pipe(replace(/'use strict';/g, '\'use strict\';\n'))
        //.pipe(replace(/'use strict';[\s\S\n]*?yangaiche\(/g, '\'use strict\';\n\n\tyangaiche('))
        .pipe(replace(/<link rel="stylesheet" href="\.\/css\/h5\.css">/, '<link rel="stylesheet" href="./css/h5.css">\n\t<link rel="stylesheet" href="./css/yac-modal.css">'))
        .pipe(gulp.dest(dstRoot));
        //.pipe(gulp.dest(dstRoot + '/js/'));
});

// jshint处理
gulp.task('jshint', function () {
    var jsSrc = options.f === '*' ? srcRoot + '/js/**/*.js' : srcRoot + '/js/' + options.f;

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
});

gulp.task('tester', function() {
    //var str = '/Users/caoyouxin/git/yangaiche/h5/h5-local/js/yangaiche/ios/bridge-9e443ea4d2.js';
    //var root = 'h5-local';
    //var file = str.match(new RegExp(root + '/js/(.*)-.*\\.js$'))[1] + '.js';
    //console.log(file);
    //
    //console.log(str.match(new RegExp(root + '/js/(.*?)/'))[1]);

    Function.prototype.genMapObjKey = function(callback) {
        var __self = this;
        return function() {

            var ret = callback.apply(this, arguments);
            if (ret) {
                var args = Array.from(arguments).slice(0, arguments.length - 1);
                args.push(ret);
                __self.apply(this, args);
            } else {
                __self.apply(this, arguments);
            }
        };
    };

    //(function ($1, $2, $3) {
    //    console.log(arguments);
    //}).genMapObjKey(function($1, $2, $3) {
    //    if ($1) {
    //        console.log('$1 = true, mod $3');
    //        return 'aaa';
    //    }
    //}).genMapObjKey(function($1, $2, $3) {
    //    if (!$1) {
    //        console.log('$1 = false, mod $3');
    //        return 'bbb';
    //    }
    //})(false, 1);

    //var context = 'alipay';
    //(function(matched, $1, $2) {
    //    continueToCompile = true;
    //    console.log(context, $1, $2);
    //    if (mapObj[$2]) {
    //        return mapObj[$2];
    //    } else {
    //        throw 'sth. wrong when compiling...';
    //    }
    //}).genMapObjKey(function(matched, $1, $2) {
    //    if ($1 === 'load') {
    //        if (mapObj[context + '/' + $2 + '.js']) {
    //            return context + '/' + $2 + '.js';
    //        } else {
    //            return 'default/' + $2 + '.js';
    //        }
    //    }
    //}).genMapObjKey(function(matched, $1, $2) {
    //    if ($1 === 'load_default') {
    //        return 'default/' + $2 + '.js';
    //    }
    //}).genMapObjKey(function(matched, $1, $2) {
    //    if ($1 === 'load_lib') {
    //        return 'lib/' + $2 + '.js';
    //    }
    //})(context, 'load_default', 'openid');

});

// 监听任务 运行语句 gulp watch
//gulp.task('watch',function(){
//
//    server.listen(port, function(err){
//        if (err) {
//            return console.log(err);
//        }
//
//        // 监听html
//        gulp.watch('./src/*.html', function(event){
//            gulp.run('html');
//        });
//
//        // 监听css
//        gulp.watch('./src/scss/*.scss', function(){
//            gulp.run('css');
//        });
//
//        // 监听images
//        gulp.watch('./src/images/**/*', function(){
//            gulp.run('images');
//        });
//
//        // 监听js
//        gulp.watch('./src/js/*.js', function(){
//            gulp.run('js');
//        });
//
//    });
//});