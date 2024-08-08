const fs = require('fs');

const contaPalavra = (chunk) => chunk.toString().split(/\s+/).filter(Boolean).length;

const readStream = fs.createReadStream('txt.txt', { highWaterMark: 4 * 1024 });

readStream.on('data', (chunk) => {
  console.log(`Palavras no chunk: ${contaPalavra(chunk)}`);
});
