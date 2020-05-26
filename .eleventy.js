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

  return {
    pathPrefix: "/garden/",
    dir: {
      input: "src"
    }
  };
};
