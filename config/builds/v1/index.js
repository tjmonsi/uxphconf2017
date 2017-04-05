exports.app = {
  version: '0.0.1',
  name: 'UXPH Conference 2017',
  shortName: 'UXPH',
  description: "Learn about User Experience Design with people from all over the world. Mark your calendars. Pledge your support. Attend. Present.",
  build: 'beta',
  ravenConfig: 'https://9f5d8e1abe974d799eefe34c0cba46af@sentry.io/119409',
  themeColor: '#FF422E',
  backgroundColor: '#FF422E'
}
exports.manifest = require('./manifest')
exports.meta = require('./meta');
exports.data = require('./data');
