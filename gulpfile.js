#!/usr/bin/env node

const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const path = {
  'public': {
    root: 'www',
    styles: 'www/css',
    scripts: 'www/js',
    images: 'www/images',
    sprite: 'www/css/',
    fonts: 'www/fonts'
  },
  app: {
    root: 'app',
    styles: ['app/styles/**/*.sass'],
    scripts: 'app/js/**/*.js',
    images: 'app/images/**/*.*',
    fonts: 'app/fonts/**/*.*',
    templates: 'app/templates/**/*.pug'
  }
};


gulp.task('default', [
  'scripts',
  'styles',
  'fonts',
  'images',
  'templates',
  'vendor-scripts',
  'vendor-css',
  'vendor-fonts'
]);

gulp.task('watch', function () {
  gulp.run('serve');
  gulp.watch(path.app.scripts, ['scripts']);
  gulp.watch(path.app.styles, ['styles']);
  gulp.watch(path.app.images, ['images']);
  gulp.watch(path.app.templates, ['templates']);
  gulp.watch(path.app.fonts, ['fonts']);
});

/**
 * build scripts
 */
gulp.task('scripts', function (done) {
  gulp.src(path.app.scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(path.public.scripts))
    .on('error', function (err) {
      throw new Error(err);
    })
    .on('end', done);
});
/**
 * build vendor scripts
 */
gulp.task('vendor-scripts', function (done) {
  gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/popper.js/dist/popper.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('vendor.bundle.js'))
    .pipe(gulp.dest(path.public.scripts))
    .on('error', function (err) {
      throw new Error(err);
    })
    .on('end', done);
});

/**
 * build styles
 */
gulp.task('styles', function (done) {
  gulp.src(path.app.styles)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(path.public.styles))
    .on('error', sass.logError)
    .on('end', done);
});

/**
 * build vendor css
 */
gulp.task('vendor-css', function (done) {
  gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(concat('vendor.bundle.css'))
    .pipe(gulp.dest(path.public.styles))
    .on('error', function (err) {
      throw new Error(err);
    })
    .on('end', done);
});
/**
 * build fonts
 */
gulp.task('fonts', function (done) {
  gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.public.fonts))
    .on('error', function (err) {
      throw new Error(err);
    })
    .on('end', done);
});

/**
 * build vendor fonts
 */
gulp.task('vendor-fonts', function (done) {
  gulp.src('./node_modules/bootstrap/fonts/*.*')
    .pipe(gulp.dest(path.public.fonts))
    .on('error', function (err) {
      throw new Error(err);
    })
    .on('end', done);
});

/**
 * build images
 */
gulp.task('images', function (done) {
  gulp.src(path.app.images)
    .pipe(gulp.dest(path.public.images))
    .on('error', function (err) {
      throw new Error(err);
    })
    .on('end', done);
});

/**
 * build templates
 */
gulp.task('templates', function (done) {
  gulp.src(path.app.templates)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.public.root))
    .on('error', function (err) {
      throw new Error(err);
    })
    .on('end', done);
});

gulp.task('serve', function(done) {
  browserSync.init({
    server: {
        baseDir: './www'
    }
  });

  gulp.watch(`${path.public.root}/**/*.html`)
    .on('change', browserSync.reload);
});