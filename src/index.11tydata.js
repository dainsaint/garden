module.exports = {
  eleventyComputed: {
    color: data => data.collections.posts.length ? data.collections.posts[ data.collections.posts.length - 1].data.color || "#FFFFFF" : "#FFFFFF"
  }
}
