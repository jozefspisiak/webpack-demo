(function(modules) {
    var installedModules = {};
    function require(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId];
        var module = (installedModules[moduleId] = {
            exports: {}
        });
        modules[moduleId](module, module.exports, require);
        return module.exports;
    }
    return require(0);
})([
function(module, exports, require) {
const a = require(1).a;

a();

},function(module, exports, require) {
exports.a = function() {
  console.log("a");
};

},])