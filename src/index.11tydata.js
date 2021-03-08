module.exports = {
  eleventyComputed: {
    color: data => data.pagination?.items[0].data.color || "#FFFFFF"
  }
}
