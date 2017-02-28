const gulp = require('gulp');
const gulpif = require('gulp-if');
// const watch = require('gulp-watch');
const path = require('path');
const injectSass = require('./gulp-tasks/inject-sass.js');
const injectMetadata = require('./gulp-tasks/inject-metadata.js');
const injectHome = require('./gulp-tasks/inject-home.js');
const injectHeader = require('./gulp-tasks/inject-header.js');
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
gulp.task('inject-header', function(cb) {
  injectHeader();
  cb();
})
gulp.task('inject-metadata', function(cb) {
  injectMetadata();
  cb();
});
gulp.task('inject-home', injectHome);
gulp.task('inject-sass', injectSass);
gulp.task('inject-all',  gulp.series(['inject-sass', 'inject-header', 'inject-home', 'inject-metadata']));

gulp.task('watch-all', function(cb) {

  gulp.watch(['pages/**/*.scss', 'web-components/**/*.scss', 'styles/**/*.scss', 'config/**/*.json', 'home-page.html', 'header-fragment.html'],
   gulp.series('inject-all', function(cb2) { cb2(); }));
  cb();

});
