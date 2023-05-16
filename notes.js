const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");


const addNote = function (title, body) {
  const notes = loadNotes();

  const note = {
    title: title,
    body: body,
  };

  const filteredNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (filteredNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    console.log(chalk.green.bold("New Note added"));
  } else {
    console.log(chalk.red.bold("Note title taken"));
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const finalNotes = notes.filter((note) => note.title !== title);
  if (notes.length === finalNotes.length) {
    console.log(chalk.red.inverse("No such title found"));
  } else {
    saveNotes(finalNotes);
    console.log(chalk.green.inverse("Note removed!"));
  }
};

const saveNotes = function (notes) {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const listNotes = function () {
  const notes = loadNotes()
  if (notes) {
    console.log(chalk.green.inverse("Your Notes"))
    notes.forEach(note => {
      console.log(note.title)
    });
  }
  else {
    console.log(chalk.red.inverse("Currently no notes"))
  }
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const readNote = (title) => {
  try {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    if (findNote) {
      console.log(chalk.green.inverse(findNote.title))
      console.log(findNote.body)
    }
    else {
      console.log(chalk.red.inverse("No such note found"))
    }
  } catch (e) {
    console.log(chalk.red.inverse("Note List empty"))
  }

}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};