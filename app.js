const notes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note!",
  builder: {
    title: {
      description: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      description: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      description: "Title of Note",
      demandOption: true,
      type: "string",
    },
  },

  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List notes",
  handler: function () {
    console.log("List notes");
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function () {
    console.log("Read a note");
  },
});

yargs.parse();
