const marked = require('marked');

module.exports = function (config) {
  config.addPassthroughCopy("src/assets");

  config.addFilter("where", function (array, key, value) {
    return array.filter((item) => {
      const keys = key.split(".");
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return reducedKey === value ? item : false;
    });
  });

  config.addFilter("markdown", function (string) {
    return string ? marked(string) : string;
  });

  return {
    pathPrefix: "/garden/",
    dir: {
      input: "src"
    }
  };
};