const downloadJson = (object = '') => {
  if (!object) { return; }
  const filename = new Date().getTime() + '.json';

  // fake a click to download file
  const element = document.createElement('a');
  element.download = filename;
  element.href = 'data:application/json;charset=utf-8;,' + encodeURIComponent(JSON.stringify(object));
  element.target = '_blank';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export { downloadJson };
