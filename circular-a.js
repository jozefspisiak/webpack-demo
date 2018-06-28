const circularB = require("./circular-b.js");

exports.circulara = function() {
  console.log("circular A");
};

console.log("circA incl");
circularB.circularb();
