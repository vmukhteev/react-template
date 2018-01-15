import path from 'path';
import fs from 'fs';

export default function WebpackInjectPlugin(options) {
  this.options = {...options};
}

WebpackInjectPlugin.prototype.apply = function (compiler) {

  compiler.plugin('after-emit', (compilation) => {
      let stats = compilation.getStats().toJson({
        hash: false,
        publicPath: true,
        assets: true,
        chunks: false,
        modules: false,
        source: true,
        errorDetails: false,
        timings: false,
      });

      //console.log(stats);

      fs.writeFileSync(
        path.join(compiler.options.output.path, (this.options.filename || 'inject.json')),
        JSON.stringify(
          stats.assets
            .map(asset => asset.name)
            .filter(name => !/\.html$/.test(name))
            .reverse()
        )
      );
  });
};