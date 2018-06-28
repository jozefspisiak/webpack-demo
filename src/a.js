let incrementVariable = 0;

function write(message) {
  console.log(message);
}

exports.increaseAndPrintNumber = function() {
  incrementVariable++;
  write(incrementVariable);
};

write("a included");
