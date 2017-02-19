const gulp = require('gulp');
const gulpif = require('gulp-if');
// const watch = require('gulp-watch');
const path = require('path');
const injectSass = require('./gulp-tasks/inject-sass.js');
const injectMetadata = require('./gulp-tasks/inject-metadata.js');
const injectSplash = require('./gulp-tasks/inject-splash.js');
/**
 * This is a three part gulpfile.
 *
 * 1. SASS Strategy
 * 2. Page Building Strategy
 * 3. Production Building Strategy
 */

/**
 * SASS STRATEGY
 */
 
gulp.task('inject-metadata', function(cb) {
  injectMetadata();
  cb();
});
gulp.task('inject-splash', injectSplash);
gulp.task('inject-sass', injectSass);
gulp.task('inject-all',  gulp.series(['inject-sass', 'inject-splash', 'inject-metadata']));

gulp.task('watch-all', function(cb) { 
  
  gulp.watch(['pages/**/*.scss', 'web-components/**/*.scss', 'styles/**/*.scss', 'config/**/*.json', 'project-spash.html'], 
   gulp.series('inject-all', function(cb2) { cb2(); }));
  cb(); 
  
});
