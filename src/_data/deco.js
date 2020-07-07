const fs = require('fs');
const path = require('path');

module.exports = async () => {
  let filePath = path.join(__dirname, '..', 'assets','img','deco' );
  let files = fs.readdirSync( filePath );
  return files.filter( x => x.indexOf(".png") >= 0 );
}
