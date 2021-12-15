function typeCheck(variable) {
  if (variable === undefined) {
    return 'undefined';
  }

  if (variable === null) {
    return 'null';
  }

  if (Array.isArray(variable)) {
    return 'array';
  }

  if (variable.length) {
    return 'array-like';
  }
  return typeof variable;
}