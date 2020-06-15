const marked = require('marked');
const embedEverything = require('eleventy-plugin-embed-everything');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const ErrorOverlay = require("eleventy-plugin-error-overlay")

module.exports = function (config) {
  config.addPassthroughCopy("src/assets");

  config.setTemplateFormats([
    "md",
    "html",
    "liquid",
    "njk",
    "jpg",
    "jpeg",
    "png"
  ]);

  config.addPlugin(embedEverything);
  config.addPlugin(lazyImagesPlugin, {
    transformImgPath: (src) => src.replace('/garden/','./src/')
  });


  config.addPlugin(ErrorOverlay)



  config.addFilter("where", function (array, key, value) {
    return array.filter((item) => {
      const keys = key.split(".");
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return reducedKey === value ? item : false;
    });
  });

  config.addFilter("inFolder", function( array, inputPath ) {
    let path = inputPath.split('/');
    let search = path.splice(0, path.length-1).join('/');
    return array.filter( (item) => {
      return ( item.template.parsed.dir.indexOf( search ) >= 0 )
      &&
      ( item.template.inputPath != inputPath )
    })
  });


  config.addFilter("fromFiles", function(collection, files)
  {
    if( !collection || !files ) return [];

    return collection.filter(
      post => files.filter(
        file => post.template.inputPath.indexOf(file) >= 0
      ).length
    )
  });

  config.addFilter("markdown", function (string) {
    return string ? marked(string) : string;
  });

  config.addCollection("projects", function(collectionApi) {
    // get unsorted items
    return collectionApi.getAll().filter( item => "layout" in item.data && item.data.layout == "project-folder" );
  });


  return {
    pathPrefix: "/garden/",
    dir: {
      input: "src"
    }
  };
};
