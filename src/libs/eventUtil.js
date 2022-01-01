const handleFunction = (func, ...args) => {
  if (typeof func === "function") {
    func(...args);
  }
};

export { handleFunction };
