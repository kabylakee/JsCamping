function add(a, b) {
  if (b) return a + b;
  return (b2) => {
    return a + b2;
  };
}

function sub(a, b) {
  if (b) return a - b;
  return (b2) => {
    return b2 - a;
  };
}

function mul(a, b) {
  if (b) return a * b;
  return (b2) => {
    return a * b2;
  };
}

function div(a, b) {
  if (b) return a / b;
  return (b2) => {
    return b2 / a;
  };
}

function pipe(...args) {
  return (b) => {
      let res = 0;
      for(let i = 0; i < args.length; i++) {
          res = args[i](b);
          b = res;
      }
      return res;
  }
}

let a = add(1, 2); 
console.log(a);
let b = mul(a, 10); 
console.log(b);
let sub1 = sub(1);
let c = sub1(b); 
console.log(c);
let d = mul(sub(a, 1))(c); 
console.log(d);
let doSmth = pipe(add(d), sub(c), mul(b), div(a));
let result = doSmth(0);
console.log(result);
let x = pipe(add(1), mul(2))(3); 
console.log(x);

