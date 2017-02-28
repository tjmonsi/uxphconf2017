const gulp = require('gulp');
const fs = require('fs');
const map = require('map-stream');
const gutil = require('gulp-util');
const pages = require('../config/pages.json');
const indexFile = 'index.html';
const baseFile = 'base.html';
const injectHeader = function(v) {
  gutil.log('Injecting Header Fragment');
  return gulp.src(['header-fragment.html'])
    .pipe(map(function(file, cb) {
      fs.readFile(file.path, 'utf-8', function(err, data) {
        if (err) {
          gutil.log(err.message);
          console.log(err);
          cb(err)
        }

        const start = "<!-- HEADER START HERE -->";
        const end = "<!-- HEADER END HERE -->";
        //Creates the regEx this ways so I can pass the constiables.
        const regEx = new RegExp(start+"[\\s\\S]*"+end, "g");

        for (var p in pages.pages) {
          var content = fs.readFileSync(pages.pages[p].target, 'utf-8');

          if (!regEx.test(content)) {
            //Return empty. if we return cb(null, file). It will add
            //the file that we do not want to the pipeline!!
            return cb();
          }

          var injectSplashContent = start +
              "\n" +
              data +
              "\n" +
              end;

          content = content.replace(regEx, injectSplashContent);

          fs.writeFileSync(pages.pages[p].target, content, 'utf-8');
        }

        cb();

      })
    }));
}

module.exports = injectHeader;
