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

  config.addFilter("fromFiles", function(collection, files)
  {
    if( !collection || !files ) return [];

    return collection.filter(
      post => files.filter(
        file => post.template.inputPath.indexOf(file) > 0
      ).length
    )
  });

  config.addFilter("markdown", function (string) {
    return string ? marked(string) : string;
  });



  config.addShortcode("youtube", function(video_id) {
    return `{% include youtube ${video_id} %}`
  });

  return {
    pathPrefix: "/garden/",
    dir: {
      input: "src"
    }
  };
};
