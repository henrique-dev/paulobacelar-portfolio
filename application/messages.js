const diff = require('deep-diff');

const fs = require('fs');
const fileNames = fs.readdirSync('src/messages/');

const otherFileNames = fileNames.filter((file) => file !== 'pt-BR.json');

fs.readFile(`src/messages/pt-BR.json`, 'utf-8', (mainError, mainData) => {
  if (mainError) {
    throw new Error('cannot read the file');
  }

  const mainJson = JSON.parse(mainData);

  otherFileNames.forEach((fileName) => {
    fs.readFile(`src/messages/${fileName}`, 'utf-8', (error, data) => {
      if (error) {
        throw new Error('cannot read the file');
      }

      const json = JSON.parse(data);

      const differences = diff(mainJson, json);

      if (differences) {
        const haveDiff = !differences.reduce((prevState, difference) => {
          if (difference.kind === 'N') {
            console.log(`The key ${difference.path.join('.')} is missing in pt-BR.json`);
            return false;
          }
          if (difference.kind === 'D') {
            console.log(`The key ${difference.path.join('.')} is missing in em ${fileName}`);
            return false;
          }

          return prevState;
        }, true);

        if (haveDiff) {
          throw new Error('Is there a difference in the files');
        }
      }
    });
  });
});
