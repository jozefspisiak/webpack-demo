const circularb = require("./circular-b.js").circularb;

exports.circulara = function() {
  console.log("circular A");
};

console.log("circA incl");
circularb();
