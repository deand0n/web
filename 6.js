function partialAny(func, ...args) {
  return function () {
    let arrInside = Array.from(args);
    let j = 0;
    outer: for (i = 0; i < args.length; i++) {
      if (args[i] == undefined) {
        while (j < arrInside.length) {
          args = args.fill(arrInside[j], i, i + 1);
          j++;
          continue outer;
        };
      };
    };
    return func.apply(this, args);
  };
};