import fs from 'fs';

class StorageController {
  static #instance = null;

  getFileContent(callback) {
    fs.readFile('storage/data.json', 'utf8', (err, jsonString) => {
      try {
        const data = JSON.parse(jsonString);

        callback(data);
      } catch (err) {
        console.log('Error parsing JSON string:', err);
      }
    });
  }

  setFileContent(data, callback) {
    const jsonString = JSON.stringify(data);

    fs.writeFile('storage/data.json', jsonString, () => {
      callback();
    });
  }

  static create() {
    if (! StorageController.#instance) {
      StorageController.#instance = new StorageController();
    }

    return StorageController.#instance;
  }
}

export default StorageController.create();