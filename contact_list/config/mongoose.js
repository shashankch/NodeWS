const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contacts_list_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("connected successfully to contacts_list_db");
});
