(function(){
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	__hasProp = {}.hasOwnProperty,
	__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	__indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

(function() {
  

  define(function(require, exports, module) {
    var Animal;
    Animal = (function() {
      function Animal() {
        this.sell = __bind(this.sell, this);
      }

      Animal.prototype.price = 5;

      Animal.prototype.sell = function() {
        return alert("Give me " + this.price + " shillings!");
      };

      return Animal;

    })();
    return module.exports = Animal;
  });

}).call(this);

(function() {
  

  define(function(require, exports, module) {
    var Module, ORM, User, moduleKeywords, _ref;
    moduleKeywords = ['extended', 'included'];
    Module = (function() {
      function Module() {}

      Module.extend = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(moduleKeywords, key) < 0) {
            this[key] = value;
          }
        }
        if ((_ref = obj.extended) != null) {
          _ref.apply(this);
        }
        return this;
      };

      Module.include = function(obj) {
        var key, value, _ref;
        for (key in obj) {
          value = obj[key];
          if (__indexOf.call(moduleKeywords, key) < 0) {
            this.prototype[key] = value;
          }
        }
        if ((_ref = obj.included) != null) {
          _ref.apply(this);
        }
        return this;
      };

      return Module;

    })();
    ORM = {
      find: function(id) {
        return console.log('find fn');
      },
      create: function(attrs) {},
      extended: function() {
        return this.include({
          save: function() {}
        });
      }
    };
    return User = (function(_super) {
      __extends(User, _super);

      function User() {
        _ref = User.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      User.extend(ORM);

      return User;

    })(Module);
  });

}).call(this);

}).call(this);