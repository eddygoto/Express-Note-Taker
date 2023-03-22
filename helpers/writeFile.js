// const fs = require('fs');
// const path = require('path');

// function createNote(body, notes) {
//     const note = body;
//     notes.push(note);

//     fs.writeFileSync(
//         path.join(__dirname, '../db/db.json'),
//         JSON.stringify({
//             notes: notes
//         }, null, 2)
//     )

//     return note;
// }

// function deleteNote(notes, id) {
//     let deleteId = parseInt(id);
//     notes.splice(deleteId, 1);

//     for (let i = deleteId; i < notes.length; i++) {
//         notes[i].id = i.toString();
//     }

//     fs.writeFileSync(
//         path.join(__dirname, '../db/db.json'),
//         JSON.stringify({
//             notes: notes
//         }, null, 2)
//     )
// }

// module.exports = { createNote, deleteNote }

const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
