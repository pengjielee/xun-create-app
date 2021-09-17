const chokidar = require('chokidar');
const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '../src/assets/scss/');

fs.readdir(dir, function (err, files) {
  for (var i = 0; i < files.length; i++) {
    const name = files[i];
    if (name.startsWith('_')) {
      continue;
    }
    const file = path.join(dir, name);
    fs.stat(file, function (err, data) {
      if (data.isFile()) {
        const { dir, name } = path.parse(file);
        let target = path.join(path.resolve(dir, '..'), 'wxss');
        sass.render(
          {
            file: file,
            outputStyle: 'compact',
          },
          function (err, result) {
            if (!err) {
              const newFile = `${target}/${name}.wxss`;
              fs.writeFile(newFile, result.css, function (err) {
                if (!err) {
                  //file written on disk
                  console.log(`updated ${newFile}`);
                }
              });
            } else {
              console.log(err);
            }
          },
        );
      }
    });
  }
});
