const fs = require('fs');
const dest = 'build';
const filesToParse = [`./${dest}/index.html`, `./${dest}/inject.js`];

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

    let names = ['vendor', 'app'];

    names.forEach(
      asset => {
        strReplaced += `<script src="${assets[asset].js}"></script>\n`;
      }
    );

    content = content
      .replace(/<!--scripts[.\s\S]*end-scripts-->/,
        strReplaced
      )
      .replace(/<<<app>>>/g, assets['app'].js)
      .replace(/<<<vendor>>>/g, assets['vendor'].js)
    ;

    fs.writeFile(file, content, 'utf8', err => {
      if (err) console.log(err);
    });
  }));
});
