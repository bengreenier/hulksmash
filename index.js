var extend = require("extend");

// This is mostly silly, as it's just a wrapper around extend with deep always true
// takes 2-n objects
// returns 1 object
var _objectSmash = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(true);
  return extend.apply(extend, args);
};

// This extends, but uses root level keys as if they're different objects
// takes 1-n objects
// returns either 1 object (if only 1 given) or a bunch of objects in an array
var _keySmash = function() {
  var res = [];
  for(var i = 0 ; i < arguments.length ; i++) {
    var args = [true];
    for (var prop in arguments[i]) {
      args.push(arguments[i][prop]);
    }
    res.push(extend.apply(extend, args));
  }
  return (res.length == 1) ? res[0] : res;
};

// This does both, first calling keySmash on each object,
// and then objectSmash-ing them all together
// takes 2-n objects
// returns 1 object
var _hulkSmash = function() {
  return _objectSmash.apply(null, _keySmash.apply(null, arguments));
};

// add the objects and keys apis
_hulkSmash.objects = _objectSmash;
_hulkSmash.keys = _keySmash;

module.exports = _hulkSmash;