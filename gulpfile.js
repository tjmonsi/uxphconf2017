const gulp = require('gulp');
const gulpif = require('gulp-if');
const path = require('path');
const injectSass = require('./gulp-tasks/inject-sass.js');
const injectMetadata = require('./gulp-tasks/inject-metadata.js');
const injectHeader = require('./gulp-tasks/inject-header.js');
const injectPage = require('./gulp-tasks/inject-page.js');
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
gulp.task('inject-page', injectPage);
gulp.task('inject-header', function(cb) {
  injectHeader();
  cb();
})
gulp.task('inject-metadata', function(cb) {
  injectMetadata();
  cb();
});
// gulp.task('inject-home', injectHome);
gulp.task('inject-sass', injectSass);
gulp.task('inject-all',  gulp.series(['inject-page', 'inject-sass', 'inject-header', 'inject-metadata']));

gulp.task('watch-all', function(cb) {

  gulp.watch(['pages/**/*.scss', 'web-components/**/*.scss', 'styles/**/*.scss', 'config/**/*.json', 'pages/**/*.html', 'header-fragment.html', 'base.html'],
   gulp.series('inject-all', function(cb2) { cb2(); }));
  cb();

});
