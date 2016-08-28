'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
  runSequence('sass','start','sass:watch')   
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js hbs css'
  , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('sass', function () {
  return gulp.src('./public/css/main_scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/main_css/'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./public/css/main_scss/*.scss', ['sass']);
}); 