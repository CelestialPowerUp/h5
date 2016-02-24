/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-rev gulp-rev-collector gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
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
    revCollector = require('gulp-rev-collector'); //替换相应的文件


var minimist = require('minimist');

var knownOptions = {
    string: ['dstRoot', 'f'],
    default: { dstRoot: process.env.NODE_ENV || 'production', f: process.env.NodeENV || '*' }
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
gulp.task('activityImages', function() {
    var activityImagesSrc = srcRoot + '/activities/**/*.png';

    gulp.src(activityImagesSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(dstRoot + '/activities'));
});

// 配置文件
gulp.task('cfg', function() {
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
gulp.task('rev', function() {
    gulp.src([dstRoot + '/map.json', dstRoot + '/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(dstRoot));
});

// jshint处理
gulp.task('jshint', function () {
    var jsSrc = options.f === '*' ? srcRoot + '/js/**/*.js' : srcRoot + '/js/' + options.f;

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
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