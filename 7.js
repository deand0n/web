Function.prototype.myOwnBind = function (newThis) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it's not callable");
  }
  let boundTargetFunction = this;
  return function boundFunction() {
    return boundTargetFunction.apply(newThis);
  };
};