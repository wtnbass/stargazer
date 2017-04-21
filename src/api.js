export default (path, option) =>
  fetch(`http://kirakiratter.com/api/v1/${path}`, option).then(r => r.json());
