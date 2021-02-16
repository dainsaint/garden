const marked = require('marked');
const embedEverything = require('eleventy-plugin-embed-everything');
const lazyImages = require('eleventy-plugin-lazyimages');
const rss = require("@11ty/eleventy-plugin-rss");



function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'dark';
    }
    else {

        return 'light';
    }
}


module.exports = function (config) {
  config.addPassthroughCopy("src/assets");
  config.addPassthroughCopy("src/admin");
  config.setDataDeepMerge(true);

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
  // config.addPlugin(lazyImages, {
  //   // transformImgPath: (src) => src.replace('/assets/','./src/assets')
  // });

  // config.addPlugin( rss );


  config.addFilter("contrast", function( color ) {
    return lightOrDark( color || '#FFFFFF' );
  })

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


  config.addFilter("fromFile", function(collection, file)
  {
    if( !collection || !file || file == "") return null;

    let list = collection.filter(
      post => post.template.inputPath.indexOf(file) >= 0
    );

    if( list.length )
      return list[0];
    else
      return {};
  });

  config.addFilter("inProject", function(collection, projectPath)
  {
    if( !collection || !projectPath ) return {};

    let list = collection.filter(
      post => post.data.project != "" && projectPath.indexOf( post.data.project ) >= 0
    );

    return list;
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

  // config.addCollection("projects", (api) => {
  //   return api.getFilteredByTag("projects").map( project => {
  //
  //     let list = api.getFilteredByTag("posts").filter(
  //       post => {
  //         console.log( post.data.project );
  //         return post.data.project && post.data.project != "" && project.inputPath.indexOf( post.data.project ) >= 0
  //       }
  //     ).sort( (a,b) => new Date(a.data.date) - new Date(b.data.date) );
  //
  //
  //     return { ...project };
  //   })
  // })


  return {
    // pathPrefix: "/garden/",
    dir: {
      input: "src"
    }
  };
};
