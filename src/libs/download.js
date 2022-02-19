const downloadJson = (object = "", name = "") => {
  if (!object) {
    return;
  }
  const prefix = !!name ? name : new Date().getTime();
  const filename = prefix + ".json";
  const hrefConfig = "data:application/json;charset=utf-8;,";
  const href = hrefConfig + encodeURIComponent(object);

  // fake a click to download file
  const element = document.createElement("a");
  element.download = filename;
  element.href = href;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export { downloadJson };
