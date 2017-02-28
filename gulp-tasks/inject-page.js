const gulp = require('gulp');
const fs = require('fs');
const map = require('map-stream');
const gutil = require('gulp-util');
const pages = require('../config/pages.json');
const baseFile = 'base.html';
var pageFragments = pages.pages.map(function(p) {
  return 'pages/' + p.page
});
console.log(pageFragments)
// ['base.html']
const injectPage = function(v) {
  gutil.log('Creating pages');
  return gulp.src(pageFragments)
    .pipe(map(function(file, cb) {

      var data = fs.readFileSync(file.path, 'utf-8');
      var content = fs.readFileSync(baseFile, 'utf-8');

      const start = "<!-- CONTENT START HERE -->";
      const end = "<!-- CONTENT END HERE -->";
      //Creates the regEx this ways so I can pass the constiables.
      const regEx = new RegExp(start+"[\\s\\S]*"+end, "g");

      var injectContent = start +
          "\n" +
          data +
          "\n" +
          end;

      content = content.replace(regEx, injectContent);

      for (var i in pages.pages) {
        if (file.path === __dirname.replace('gulp-tasks','') + 'pages/' + pages.pages[i].page ) {
          fs.writeFileSync(pages.pages[i].target, content, 'utf-8');
          break;
        }
      }

      cb();

      // cb();
    }));
}

module.exports = injectPage;
