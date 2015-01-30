# hulksmash [![Build Status](https://travis-ci.org/bengreenier/hulksmash.svg)](https://travis-ci.org/bengreenier/hulksmash)
smash keys within object(s) together

[![browser support](https://ci.testling.com/bengreenier/hulksmash.png)
](https://ci.testling.com/bengreenier/hulksmash)

# api

hulksmash supports three methods:

  + __(object1,[objectN])__:  
    smashes keys together in each object, and then smashes each object together into one. returns an object.

  + __objects(object1,[objectN])__:  
    this is a direct passthrough to [justmoon/node-extend](https://github.com/justmoon/node-extend) with deep copy always `true`. returns an object.

  + __keys(object1,[objectN])__:  
    smashes root-level keys values together (deep copy is `true`) in an object. If given multiple objects, `hulksmash` will smash each objects root-level keys, and return an array of objects.


# examples

smash root-level keys together in an object:

```
var hulksmash = require('hulksmash');

var obj = hulksmash.keys({
    "one": {key: "value", override: false},
    "two": {other: true, override: true}
});

// yeilds the following object
var result = {
  key: "value",
  other: true,
  override: true
};

```

smash root-level keys together, in multiple objects, and then smash the objects together:

```
var hulksmash = require('hulksmash');

var obj = hulksmash({
      "one": {key: true},
      "two": {other: false}
    },{
      "three": {key: false},
      "four": {lastly: "pie"}
    });

// yeilds the following object
var result = {
  key: false,
  other: false,
  lastly: "pie"
};
```
