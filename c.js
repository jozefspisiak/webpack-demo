const a = require("./a.js").a;

exports.c = function() {
  a();
};

a();
console.log("c included and called a()");
