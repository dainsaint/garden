module.exports = function(config)
{
  config.addPassthroughCopy("assets");

  config.addFilter('where', function (array, key, value) {
    console.log( '>>', value );
  return array.filter(item => {
    const keys = key.split('.');
    const reducedKey = keys.reduce((object, key) => {
      return object[key];
    }, item);

    return (reducedKey === value ? item : false);
  });

});

}
