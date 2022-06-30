const fs = require('fs');
const path = require('path');

let filname = path.resolve(__dirname, './src/electron/resources/');

fs.promises.readFile(filname + '/icon.ico').then(async (buffer) => {
  const string = buffer.toString('base64');
  const bf = Buffer.from(string);
  await fs.promises.writeFile(filname + '/icon.copy.ico', bf);
  console.log('copy success!!!')
});
