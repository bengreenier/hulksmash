var assert = require("assert");
var hulksmash = require('../index');

describe('hulksmash', function() {
  it('should contain functions', function() {
    assert.equal(typeof(hulksmash.objects), "function", "Hulksmash.objects should be a function");
    assert.equal(typeof(hulksmash.keys), "function", "Hulksmash.keys should be a function");
    assert.equal(typeof(hulksmash), "function", "Hulksmash should be a function");
  });

  it('should smash objects together', function() {
    var smashed = hulksmash.objects({key:"value"},{other:"value"});
    assert.deepEqual(smashed, {key:"value",other:"value"}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash objects together and override', function() {
    var smashed = hulksmash.objects({key:"value"},{key:"new"});
    assert.deepEqual(smashed, {key:"new"}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash objects together deeply', function() {
    var smashed = hulksmash.objects({key:{inner:true}},{other:"value"});
    assert.deepEqual(smashed, {key:{inner:true},other:"value"}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash objects together deeply and override', function() {
    var smashed = hulksmash.objects({key:{inner:true}},{key:{inner:false}});
    assert.deepEqual(smashed, {key:{inner:false}}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash keys together', function() {
    var smashed = hulksmash.keys({
      "one": {key: true},
      "two": {other: false}
    });
    assert.deepEqual(smashed, {key:true, other:false}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash keys together and override', function() {
    var smashed = hulksmash.keys({
      "one": {key: true},
      "two": {key: false}
    });
    assert.deepEqual(smashed, {key:false}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash keys together deeply', function() {
    var smashed = hulksmash.keys({
      "one": {key: {inner:true}},
      "two": {other: "value"}
    });
    assert.deepEqual(smashed, {key:{inner:true},other:"value"}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash keys together deeply and override', function() {
    var smashed = hulksmash.keys({
      "one": {key: {inner:true}},
      "two": {key: {inner:false}}
    });
    assert.deepEqual(smashed, {key:{inner:false}}, "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash multiple objects keys together but keep objects seperate', function() {
    var smashed = hulksmash.keys({
      "one": {key: "value"},
      "two": {key: false}
    },{
      "one": {other: false},
      "two": {other: "value"}
    });
    assert.deepEqual(smashed, [{key:false},{other:"value"}], "smashed should not be: "+JSON.stringify(smashed));
  });

  it('should smash everything together', function() {
    var smashed = hulksmash({
      "one": {key: true},
      "two": {other: false}
    },{
      "three": {key: false},
      "four": {lastly: "pie"}
    });
    assert.deepEqual(smashed, {key: false, other: false, lastly: "pie"}, "smashed should not be: "+JSON.stringify(smashed));
  });
});