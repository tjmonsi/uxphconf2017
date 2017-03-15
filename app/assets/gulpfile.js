const gulp = require('gulp');
const fs = require('fs');
const mergeStream = require('merge-stream');
const uglify = require('gulp-uglify');
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');
const gulpif = require('gulp-if');
const PolymerProject = require('polymer-build').PolymerProject;
const HtmlSplitter = require('polymer-build').HtmlSplitter
const forkStream = require('polymer-build').forkStream;
const addServiceWorker = require('polymer-build').addServiceWorker;
const project = new PolymerProject(require('./polymer.json'));
const sourcesHtmlSplitter = new HtmlSplitter();

function defaultFx() {
  const sourcesStream = project.sources()
    .pipe(sourcesHtmlSplitter.split())
    .pipe(gulpif(/\.js$/, uglify({compress: true})))
    .pipe(gulpif(/\.css$/, cssSlam()))
    .pipe(gulpif(/\.html$/, htmlMinifier({collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true})))
    .pipe(sourcesHtmlSplitter.rejoin());

  const dependenciesStream = project.dependencies()
    .pipe(sourcesHtmlSplitter.split())
    .pipe(gulpif(/\.js$/, uglify({compress: true})))
    .pipe(gulpif(/\.html$/, htmlMinifier({collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true})))
    .pipe(gulpif(/\.css$/, cssSlam()))
    .pipe(sourcesHtmlSplitter.rejoin());

  // Create a build pipeline to write our dependencies & optimized sources streams to the 'build/' dir
  // (not shown: project.dependencies() can also be split & optimized)
  const buildStream = mergeStream(sourcesStream, dependenciesStream);
  // Fork your build stream to write directly to the 'build/unbundled' dir
  // const unbundledBuildStream = forkStream(buildStream)
  //   .pipe(gulp.dest('build/unbundled'))
  //   .on('end', copier.bind(this,'build/unbundled'));;

  // Fork your build stream to bundle your application and write to the 'build/bundled' dir
  const bundledBuildStream = forkStream(buildStream)
    // .pipe(project.bundler)
    // .pipe(sourcesHtmlSplitter.split())
    // .pipe(gulpif(/\.js$/, uglify({compress: true})))
    // .pipe(gulpif(/\.html$/, htmlMinifier({collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true})))
    // .pipe(gulpif(/\.css$/, cssSlam()))
    // .pipe(sourcesHtmlSplitter.rejoin())
    .pipe(gulp.dest('../build/'))
    .on('end', () => {
      addServiceWorker({
        buildRoot: '../build/',
        project: project,
        bundled: false, // set if `project.bundler` was used
        swPrecacheConfig: require('./sw-precache-config')
      }).then(() => {
        console.log('generated')
      });
    })
}



gulp.task('default', defaultFx);

