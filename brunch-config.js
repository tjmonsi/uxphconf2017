// See http://brunch.io for documentation.
const stylesheets = {joinTo: {'app.css': 'app/styles.css'}};
const javascripts = {joinTo: {'app.js': [
  /^app\/scripts/,
]}};
const appConfig = require('./config/app');
// for (let i in project_components) {
//   if (project_components[i].trim()) {
//     javascripts.joinTo['project_components/' + project_components[i].trim() + '/' + project_components[i].trim() + '.js'] =
//         'app/project_components/' + project_components[i].trim() + '/' + project_components[i].trim() + '.js';
//   }
// }

exports.files = {
  javascripts: javascripts,
  stylesheets: stylesheets
};

exports.plugins = {
  sass: {
    mode: 'native',
    options: {
      includePaths: ['project_components']
    },
    debug: 'comments',
    precision: 8,
    allowCache: true
  },
  static: {
    processors: [
      require('html-brunch-static')({
        processors: [
          require('marked-brunch-static')(),
          require('./additional_plugins/sass-brunch-static')(),
          require('./additional_plugins/json-brunch-static')(),
          require('./additional_plugins/js-brunch-static')()
        ],
        defaultContext: appConfig[appConfig.builds.beta],
        handlebars: {
          enableProcessor: true
        }
      })
    ]
  }
}

exports.overrides = {
  production: {
    optimize: true,
    sourceMaps: false,
    paths: {
      public: 'temp_build'
    },
    plugins: {
      autoReload: {enabled: false},
      static: {
        processors: [
          require('html-brunch-static')({
            processors: [
              require('marked-brunch-static')(),
              require('./additional_plugins/sass-brunch-static')(),
              require('./additional_plugins/json-brunch-static')(),
              require('./additional_plugins/js-brunch-static')()
            ],
            defaultContext: appConfig[appConfig.builds.production],
            handlebars: {
              enableProcessor: true
            }
          })
        ]
      }
    }
  }
}
