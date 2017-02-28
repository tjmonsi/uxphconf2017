const gulp = require('gulp');
const fs = require('fs');
const map = require('map-stream');
const gutil = require('gulp-util');
const pages = require('../config/pages.json');
// const indexFile = 'index.html';
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

        fs.readFile(indexFile, 'utf-8', function(err, content) {
          if (err || !content) {
            console.log(err);
            return cb();
          }

          const start = "<!-- HEADER START HERE -->";
          const end = "<!-- HEADER END HERE -->";
          //Creates the regEx this ways so I can pass the constiables.
          const regEx = new RegExp(start+"[\\s\\S]*"+end, "g");

          var injectSplashContent = start +
              "\n" +
              data +
              "\n" +
              end;

          content = content.replace(regEx, injectSplashContent);

          for (var p in pages.pages) {
            fs.writeFileSync(pages.pages[p], content, 'utf-8');
          }

          cb();

          // fs.writeFile(indexFile, content, 'utf-8', function(err) {
          //   if (err) {
          //     console.log(err)
          //   }
          //   return cb();
          // })

          cb();

        })
      })
    }));
}

module.exports = injectHeader;
