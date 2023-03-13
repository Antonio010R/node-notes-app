const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");

const getNotes = function () {
  return "Your notes...";
};

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

const saveNotes = function (notes) {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { getNotes: getNotes, addNote: addNote };
