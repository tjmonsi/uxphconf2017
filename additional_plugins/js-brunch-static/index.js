var JsBrunchStatic;

JsBrunchStatic = (function() {
  function JsBrunchStatic(config1) {
    var ref, ref1;
    this.config = config1;
    if ((ref = this.config) != null ? ref.fileMatch : void 0) {
      this.handles = this.config.fileMatch;
      delete this.config.fileMatch
    }
    if ((ref1 = this.config) != null ? ref1.fileTransform : void 0) {
      this.transformPath = this.config.fileTransform;
      delete this.config.fileTransform
    }
  }

  JsBrunchStatic.prototype.handles = /\.static\.(?:js)$/;

  JsBrunchStatic.prototype.transformPath = function(filename) {
    return filename.replace(/\.static\.\w+$/, '.js');
  };

  JsBrunchStatic.prototype.compile = function(data, filename, options, callback) {
    return callback(null, data);
    // return sass.render({data: data.toString()}, function(err, css) {
    //   if (err) {
    //     callback(err);
    //     return;
    //   }
    //   return callback(null, css.css.toString());
    // })
  };

  return JsBrunchStatic;
})();

module.exports = function(config) {
  return new JsBrunchStatic(config);
};
