const calc = (...arg) => {
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
  for (let i = 1; i < equ.length; i += 2) {
    equ[i + 1] = evaluate(equ[i - 1], equ[i + 1], equ[i]);
  }
  return equ[equ.length - 1];
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
module.exports = calc;
