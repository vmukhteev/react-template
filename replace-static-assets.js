const fs = require('fs');
const filesToParse = ['./build/index.html'];

const readFile = (path, then) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) console.log(err);
    then(data);
  });
};

readFile('./webpack-assets.json', data => {
  const assets = JSON.parse(data);

  filesToParse.forEach(file => readFile(file, _data => {
    let content = _data;

    let strReplaced = "";
    Object.getOwnPropertyNames(assets).forEach(
      asset => {
        strReplaced += `<script src="${assets[asset].js}"></script>\n`;
      }

    );
    content = content.replace(/<script src="bundle\.js"><\/script>/,
      strReplaced
    );

    fs.writeFile(file, content, 'utf8', err => {
      if (err) console.log(err);
    });
  }));
});
