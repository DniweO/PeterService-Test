var gulp          = require('gulp'),
    scss          = require('gulp-sass'),
    cleanCSS      = require('gulp-clean-css'),
    pug           = require('gulp-pug'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),

    runSequence   = require('run-sequence'),
    browserSync   = require('browser-sync').create(),

    //  ######### svg sprite #########
    svgo         = require('gulp-svgo'),
    svgSprite = require('gulp-svg-sprite'),
    cheerio   = require('gulp-cheerio'),
    replace   = require('gulp-replace'),

    //  ######### !svg sprite #########

    paths   = {
        js          : './src/js/',
        images      : './src/images/',
        svg         : './src/svg/',
        fonts       : './src/fonts/',
        scss        : './src/styles/',
        pug         : './src/pug/',
        libs        : './node_modules/',
        dest        : {
            root        : './build/'
        }
    },
    sources = {
        jsSrc   : function() {
            return gulp.src([paths.js + '**/*.js'])
        },
        imgSrc      : function() { return gulp.src([
            paths.images + '**/*.png',
            paths.images + '**/*.jpg',
            paths.images + '**/*.gif',
            paths.images + '**/*.jpeg',
            paths.images + '**/*.svg',
            paths.images + '**/*.ico'
        ])},
        fontsSrc      : function() { return gulp.src([
            paths.fonts + '**/*.woff',
            paths.fonts + '**/*.woff2',
            paths.fonts + '**/*.ttf',
            paths.fonts + '**/*.eot'
        ])},
        scssSrc     : function() {
            return gulp.src([paths.scss + 'main.scss'])
        },
        pugSrc     : function() {
            return gulp.src([paths.pug + '*.pug'])
        },
        libsJsSrc  : function() {
            return gulp.src( [
                paths.libs + 'jquery/dist/jquery.min.js',
                paths.libs + 'swiper/dist/js/swiper.min.js'
            ]);
        },
        libsScssSrc : function() {
            return gulp.src([
                paths.libs + 'swiper/dist/css/swiper.min.css',
            ])
        },
    };

gulp.task('js', function() {
    sources.jsSrc()
        .pipe(concat('main.js'))
        .on('error', console.log)
        .pipe(gulp.dest(paths.dest.root + 'js'));
});

gulp.task('libsJs', function() {
    sources.libsJsSrc()
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.dest.root + 'js/'));
});

gulp.task('scss', function() {
    sources.scssSrc()
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest.root + 'css'));
});

gulp.task('libsScss', function() {
    sources.libsScssSrc()
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(paths.dest.root + 'css'));
});

gulp.task('pug', function() {
    var locals = {};

    sources.pugSrc()
        .pipe(pug({ locals: locals }))
        .on('error', console.log)
        .pipe(gulp.dest(paths.dest.root));
});

gulp.task('images', function() {
    sources.imgSrc()
        .on('error', console.log)
        .pipe(gulp.dest(paths.dest.root + 'images'));
});

gulp.task('fonts', function() {
    sources.fontsSrc()
        .on('error', console.log)
        .pipe(gulp.dest(paths.dest.root + 'fonts'));
});

gulp.task('svg', function() {
    return gulp.src(paths.svg + '*.svg')
        // minify svg
        //.pipe(svgmin({
        //  js2svg: {
        //    pretty: true
        //  }
        //}))
        .pipe(svgo({
            js2svg: {
                indent: 2,
                pretty: true
            }
        }))
        // remove all fill and style declarations in out shapes
        .pipe(cheerio({
            run          : function($) {
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite : '../sprite.svg',
                    render : {
                        scss: {
                            dest    : '../../styles/_svg-sprite.scss',
                            template: paths.scss + 'templates/_sprite-template.scss'
                        }
                    },
                    example: true
                }
            }
        }))
        .pipe(gulp.dest(paths.images))
        ;
});

gulp.task('server',     function() {
    browserSync.init({
        server: {
            baseDir: paths.dest.root
        },
        files: [
            paths.app + '**/*.*',
            paths.dest.root + '**/*.*'
        ],
        port: 8000,
        ui: { port: 8001 }
    });
});

gulp.task('compile', ['pug', 'scss', 'libsScss', 'js', 'libsJs', 'images', 'fonts', 'svg']);

gulp.task('default',    function() {
    runSequence('watch', 'server');
});

gulp.task('watch',  ['compile'], function () {
    gulp.watch([paths.images    + '**/*.*'],    ['img'],   browserSync.reload);
    gulp.watch([paths.fonts     + '**/*.*'],    ['fonts'], browserSync.reload);
    gulp.watch([paths.pug       + '**/*.pug'],  ['pug'],   browserSync.reload);
    gulp.watch([paths.scss      + '**/*.scss'], ['scss'],  browserSync.reload);
    gulp.watch([paths.js        + '**/*.js'],   ['js'],    browserSync.reload);
    gulp.watch([paths.svg       + '**/*.svg'],  ['svg'],   browserSync.reload);
});