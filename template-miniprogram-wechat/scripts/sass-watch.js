const chokidar = require('chokidar');
const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const watchFile = path.join(__dirname, '../src/assets/**/*.scss');

chokidar.watch(watchFile).on('all', (event, file) => {
  const { dir, name } = path.parse(file);

  if (name.startsWith('_')) {
    return;
  }

  console.log(event, file);

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
});
