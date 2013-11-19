/*
 * grunt-cmd-coffee
 * https://github.com/root/gr
 *
 * Copyright (c) 2013 Kevin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var variablePattern = {
    '_bind': {
      'fn': '__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }',
      'reg': [/__bind\s=\sfunction\(fn,\sme\)\s*\{.*\}/gm, /__bind\s=\sfunction\(fn,\sme\)\s*\{.*(\n.*){0,4}\}/gm]
    },
    '__hasProp': {
      'fn': '__hasProp = {}.hasOwnProperty',
      'reg': [/__hasProp\s=\s\{\}.hasOwnProperty/gm]
    },
    '__extends': {
      'fn': '__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; }',
      'reg': [/__extends\s=\sfunction\(child,\sparent\)\s*\{.*\}/gm/*, /__extends\s=\sfunction\(child,\sparent\)\s*\{.*(\n.*){0,11}\}/gm*/]
    },
    '__indexOf': {
      'fn': '__indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }',
      'reg': [/__indexOf\s=\s\[\]\.indexOf\s\|\|\sfunction\(item\)\s\{.*\}/gm, /__indexOf\s=\s\[\]\.indexOf\s\|\|\sfunction\(item\)\s\{.*(\n.*){0,5}\}/gm]
    }
  };

  grunt.registerMultiTask('cmd_coffee', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      wrapper: true
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var data = grunt.file.read(filepath),
            part_variable_list = [],
            part_key = 0,
            globalCoffeeVariable = '';

        // 替换已使用的coffescript变量
        for(part_key in variablePattern){
          var pattern = new RegExp(part_key);
          if(pattern.test(data)){
            part_variable_list.push(part_key);
            for(var pat_key in variablePattern[part_key]['reg']){
              data = data.replace(variablePattern[part_key]['reg'][pat_key], '');
            }
          }
        }

        // 删除空定义
        data = data.replace(/var\s*(, )*,.*;/gm, '');
        data = data.replace(/var\s,*;/gm, '');
        data = data.replace(/var\s*,(\n\s*,)*\s*;/gm, '');

        // 添加已使用的coffeescript变量
        part_variable_list.forEach(function(part_val, part_key){
          var separator = ',\r\n\t';
          if(part_key+1 >= part_variable_list.length){
            separator = ';\r\n';
          }
          globalCoffeeVariable += variablePattern[part_val]['fn'] + separator;
        });
        globalCoffeeVariable = 'var ' + globalCoffeeVariable + '\n\r';

        data = globalCoffeeVariable + data;

        // 增加闭包包裹
        if(options.wrapper){
          data = '(function(){\r\n'+data+'\r\n}).call(this);';
        }

        return data;
      });

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
