const downloadJson = (object = '') => {
  if (!object) { return; }
  const filename = new Date().getTime() + '.json';
  const contentType = "application/json;charset=utf-8;";
  
  // fake a click to download file
  const element = document.createElement('a');
  element.download = filename;
  element.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(object));
  element.target = '_blank';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export { downloadJson };
