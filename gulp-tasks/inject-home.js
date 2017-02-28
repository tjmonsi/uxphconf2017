const gulp = require('gulp');
const fs = require('fs');
const map = require('map-stream');
const gutil = require('gulp-util');
const indexFile = 'index.html';
const injectSplash = function() {
  gutil.log('Injecting Home Page');
  return gulp.src(['home-page.html'])
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

          const start = "<!-- HOME PAGE START HERE -->";
          const end = "<!-- HOME PAGE END HERE -->";
          //Creates the regEx this ways so I can pass the constiables.
          const regEx = new RegExp(start+"[\\s\\S]*"+end, "g");

          var injectSplashContent = start +
              "\n" +
              data +
              "\n" +
              end;

          content = content.replace(regEx, injectSplashContent);

          fs.writeFile(indexFile, content, 'utf-8', function(err) {
            if (err) {
              console.log(err)
            }
            return cb();
          })

        })
      })
    }));
}

module.exports = injectSplash;
