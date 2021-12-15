function take(callback, numberOfTimes) {
  let result = [];
  for (let i = 0; i < numberOfTimes; i++) {
    result.push(callback());
  }
  return result;
}