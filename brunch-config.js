// See http://brunch.io for documentation.
const fs = require('fs');
const path = require('path');
const stylesheets = {joinTo: {'app.css': 'app/styles.css'}};
const javascripts = {joinTo: {'app.js': 'app/initialize.js'}};
const project_components_path = 'app/project_components';
const project_components = fs.readdirSync(project_components_path).filter(file => fs.statSync(path.join(project_components_path, file)).isDirectory())

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
        defaultContext: require('./app/configs/app.json'),
        handlebars: {
          enableProcessor: true
        }
      })
    ]
  }
}
