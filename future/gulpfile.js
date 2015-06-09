'use strict';

var gulp = require('gulp');

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');


var config = {
  js: {
    src: './src/index.js',
    dest: {
      path: './public/dist',
      filename: 'app.js'
    }
  }
};

/**
 * Compile and bundle source files
 */
gulp.task('build', function() {
  var developmentEnabled = (process.env.NODE_ENV == 'dev');

  browserify(config.js.src, {
    debug: developmentEnabled
  })
  .transform(babelify)
  .bundle()
  .on('error', console.error)
  .pipe(source(config.js.dest.filename))
  .pipe(gulp.dest(config.js.dest.path));
});

/**
 * Watch source file modifications
 */
gulp.task('watch', function() {
  gulp.watch(config.js.src, ['build']);
});

/**
 * Default task
 */
gulp.task('default', ['build']);
