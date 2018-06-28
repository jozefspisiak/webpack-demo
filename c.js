const a = require("./a.js");

exports.callAFromC = function() {
  a.increaseAndPrintNumber();
};

a.increaseAndPrintNumber();
console.log("c included and called a()");
