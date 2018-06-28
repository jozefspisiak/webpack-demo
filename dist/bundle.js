(function(modules) {
    var installedModules = {};
    function require(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = (installedModules[moduleId] = {
            exports: {}
        });
        modules[moduleId](module, module.exports, require);
        return module.exports;
    }
    return require(0);
})([
function(module, exports, require) {
const a = require(4).a;
const c = require(3).c;

a();
c();

const circular = require(1);

},function(module, exports, require) {
const circularb = require(2).circularb;

exports.circulara = function() {
  console.log("circular A");
};

console.log("circA incl");
circularb();

},function(module, exports, require) {
const circulara = require(1);

exports.circularb = function() {
  circulara.circulara();
};

console.log("circB incl");

},function(module, exports, require) {
const a = require(4).a;

exports.c = function() {
  a();
};

a();
console.log("c included and called a()");

},function(module, exports, require) {
let incrementVariable = 0;

exports.a = function() {
  incrementVariable++;
  console.log(incrementVariable);
};

console.log("a included");

},])