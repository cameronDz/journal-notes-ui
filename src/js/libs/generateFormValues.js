const generateFormValues = (form, defaultValues = {}) => {
  const values = {};
  const length = Array.isArray(form?.inputs) ? form.inputs.length : 0;
  for (let idx = 0; idx < length; idx++) {
    const name = form.inputs[idx]?.name;
    const value = defaultValues?.[name];
    if (!!name) {
      values[name] = value !== undefined ? value : null;
    }
  }
  return values;
};

export { generateFormValues };
