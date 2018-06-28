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
const a = require(4);
const c = require(3);

a.increaseAndPrintNumber();
c.callAFromC();

const circular = require(1);

},function(module, exports, require) {
const circularB = require(2);

exports.circulara = function() {
  console.log("circular A");
};

console.log("circA incl");
circularB.circularb();

},function(module, exports, require) {
const circularA = require(1);

exports.circularb = function() {
  circularA.circulara();
};

console.log("circB incl");

},function(module, exports, require) {
const a = require(4);

function write(message) {
  console.log(message);
}

exports.callAFromC = function() {
  a.increaseAndPrintNumber();
};

a.increaseAndPrintNumber();
write("c included and called a()");

},function(module, exports, require) {
let incrementVariable = 0;

function write(message) {
  console.log(message);
}

exports.increaseAndPrintNumber = function() {
  incrementVariable++;
  write(incrementVariable);
};

write("a included");

},])