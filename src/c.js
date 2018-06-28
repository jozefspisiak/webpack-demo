const a = require("./a.js");

function write(message) {
  console.log(message);
}

exports.callAFromC = function() {
  a.increaseAndPrintNumber();
};

a.increaseAndPrintNumber();
write("c included and called a()");
