module.exports = {
  eleventyComputed: {
    color: data => {
      if( data.pagination )
        return data.pagination.items[0].data.color;
      else
        return "#FFFFFF";
    }
  }
}
