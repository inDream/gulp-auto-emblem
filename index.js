'use strict';

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var Emblem = require('emblem');
var Ember = require('./vendor/ember');

var getTemplateName = function(filepath, options){
  var name;
  if(options.rootPath){
    name = filepath.replace(new RegExp('\\\\', 'g'), '/').replace(/\.\w+$/, '').replace(options.rootPath, '');
  }else{
    name = path.basename(filepath).slice(0, -path.extname(filepath).length).replace(/\./g, '/');
  }
  while(name[0] == '.' || name[0] == '/'){
    name = name.slice(1);
  }
  return name;
};

module.exports = function(options) {
  var opts = options || {};
  var compilerOptions = opts.compilerOptions || {};
  return through.obj(function(file, enc, callback) {
    if (file.isNull()) {
      this.push(file);// pass along
      return callback();
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-auto-emblem', 'Streams are not supported!'));
      return callback();
    }
    var contents = file.contents.toString();
    var compiled = null;
    try { compiled = Emblem.precompile(Ember.EmberHandlebars, contents, compilerOptions).toString(); }
    catch (err) { this.emit('error', err); }
    if (compiled) {
      var name = getTemplateName(file.path, opts);
      var output = "Ember.TEMPLATES['" + name + "'] = Ember.Handlebars.template(" + compiled + ");";
      file.contents = new Buffer(output);
      file.path = file.path.slice(0, -path.extname(file.path).length) + '.js';
      this.push(file);
      return callback();
    }
  });
};
