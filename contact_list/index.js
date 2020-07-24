const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));

// middleware 1

// app.use(function (req, res, next) {
//   req.myName = "shikhar";
//   // console.log("middleware 1");
//   next();
// });

// middleware 2

// app.use(function (req, res, next) {
//   console.log("middlw2:", req.myName);
//   console.log("middleware 2");
//   next();
// });

var contactList = [
  {
    name: "shashank",
    phone: "4342343243",
  },
  {
    name: "sheldon",
    phone: "675675675",
  },
  {
    name: "Howard",
    phone: "434343675",
  },
];

app.get("/", function (req, res) {
  //   console.log(req);
  //   console.log(__dirname);
  //   res.send("<h1>it is running now</h1> ");

  // return res.render("home", { title: "My Contacts List!" });
  //  Contact.find({name:'dfdf'}, function (err, contacts)
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("error in fetching contacts from db");
      return;
    }

    return res.render("home", {
      title: "contacts list",
      contact_list: contacts,
    });
  });
});

app.post("/create-contact", function (req, res) {
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });

  // contactList.push(req.body);
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact");
        return;
      }

      console.log("##############", newContact);
    }
  );
  // return res.redirect("/");
  return res.redirect("back");

  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.phone);
  // return res.redirect('/play');
});

// app.get("/profile", function (req, res) {
//   res.send("<h1>profile is running now</h1> ");
// });
// app.get("/details", function (req, res) {
//   res.send("<h1>details is running now</h1> ");
// });

app.get("/play", function (req, res) {
  // console.log(res);
  return res.render("practice", {
    title: "lets play ohhooo",
  });
});

// app.get('/delete-contact/:phone', function (req, res) {

//   console.log(req.params);
//   let phone = req.params.phone;

// });

app.get("/delete-contact", function (req, res) {
  console.log(req.query);
  // let phone = req.query.phone;

  // let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

  // if (contactIndex != 1) {
  //   contactList.splice(contactIndex, 1);
  // }

  let id = req.query.id;
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting the data");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running:", error);
  }
  console.log("express is running:", port);
});
