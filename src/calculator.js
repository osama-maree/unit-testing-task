const calculator = (...arg) => {
  if (arg.length < 3 || !(arg.length % 2)) {
    throw new Error("Invalid number of inputs");
  }
  // Ignore vale more than 1000
  for (let i = 0; i < arg.length; i += 2) {
    if (arg[i] > 1000 && i == 0) {
      arg.splice(i, 2);
      i -= 2;
    } else if (arg[i] > 1000) {
      arg.splice(i - 1, 2);
      i -= 2;
    }
  }
  let skip = false;
  arg = arg.filter((value, index) => {
    if (skip) {
      skip = false;
      return false;
    }
    if (value > 1000) {
      if (index === 0) {
        skip = true;
      } else {
        arg.splice(index - 1, 2);
      }
      return false;
    }
    return true;
  });
  const equ = [];
  for (let i = 1; i < arg.length; i += 2) {
    if (arg[i] !== "-" && arg[i] !== "+" && arg[i] !== "*" && arg[i] !== "/") {
      throw new Error("Invalid operator");
    }
    if (arg[i] == "+" || arg[i] == "-") {
      if (typeof arg[i - 1] !== "number" || typeof arg[i + 1] !== "number") {
        throw new Error("Invalid input type");
      }
      equ.push(arg[i - 1]);
      equ.push(arg[i]);
    } else {
      arg[i + 1] = evaluate(arg[i - 1], arg[i + 1], arg[i]);
    }
  }
  if (equ.length == 0) return arg[arg.length - 1];
  if (typeof equ[equ.length - 1] !== "number") equ.push(arg[arg.length - 1]);

  const result = equ.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      if (currentIndex % 2 === 0 && currentValue !== 0) {
        const operator = array[currentIndex - 1];
        return evaluate(accumulator, currentValue, operator);
      }
      return accumulator;
    }
  );

  return result;
};

function evaluate(a, b, operation) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Invalid input type");
  }
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/": {
      if (b == 0) {
        throw new Error("Division by zero");
      }
      return a / b;
    }
  }
}
module.exports = calculator;
