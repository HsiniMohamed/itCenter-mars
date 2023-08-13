// import express module
const express = require("express");

//import body-parser module
const bodyParser = require("body-parser");

//import bcrypt module
const bcrypt = require("bcrypt");

//import muletr module
const multer = require("multer");

//import path module
const path = require("path");

//import axios module
const axios = require("axios");

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/schoolManagementDB");

// import JsonWebToken module
const jwt = require("jsonwebtoken");

// import express-session module
const session = require("express-session");

//create application express
const app = express();

//Models Importation
const Cours = require("./models/cours");
const Groupe = require("./models/groupe");
const Note = require("./models/note");
const User = require("./models/user");

//application config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// Session Configuration
const secretKey = "croco23";
app.use(
  session({
    secret: secretKey,
  })
);

// shortCut
app.use("/myImages", express.static(path.join("backend/images")));
app.use("/myPDFs", express.static(path.join("backend/pdfs")));

//Media types
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    if (file.mimetype === "application/pdf") {
      cb(null, "backend/pdfs");
    } else {
      cb(null, "backend/images");
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const fileName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, fileName);
  },
});

//Bussiness Logic Cours Begin

//Bussiness Logic:Get all Cours
app.get("/api/cours", (req, res) => {
  console.log("here in BL : Get All Cours");
  Cours.find().then((docs) => {
    console.log("here documents", docs);
    res.status(200).json({ courses: docs, message: "Success" });
  });
});

//Bussiness Logic:Get Cours By teacher Id
app.get("/api/cours/teacher/:techerId", (req, res) => {
  console.log("here in BL : Get Cours By teacher Id");
  Cours.find({ teacherId: req.params.techerId }).then((doc) => {
    res.status(200).json({ courses: doc });
  });
});
//Bussiness Logic:Get Cours By Id
app.get("/api/cours/:id", (req, res) => {
  console.log("here in BL : Get Cours By Id");
  let id = req.params.id;
  Cours.findOne({ _id: id }).then((doc) => {
    res.status(200).json({ cours: doc });
  });
});

//Bussiness Logic: Add  Cours
app.post("/api/cours", (req, res) => {
  console.log("here in BL : Add Cours  ");
  User.findOne({
    tel: req.body.teacherId,
    role: "teacher",
    validity: "valid",
  }).then((doc) => {
    if (!doc) {
      res.json({ message: "0" });
    } else {
      let obj = new Cours(req.body);
      obj.save();
      res.json({ message: "added with success" });
    }
  });
});

//Bussiness Logic: Edit  Cours
app.put("/api/cours", (req, res) => {
  console.log("here in BL : Edit Cours  ", req.body);
  let newCours = req.body;
  User.findOne({
    tel: newCours.teacherId,
    role: "teacher",
    validity: "valid",
  }).then((doc) => {
    if (!doc) {
      res.json({ message: "0" });
    } else {
      Cours.updateOne({ _id: newCours._id }, newCours).then((result) => {
        console.log("herer object after update", result);
        result.nModified == 1
          ? res.json({ message: " eidted with success" })
          : res.json({ message: "echec" });
      });
    }
  });
});

//Business Logic: Delete Cours By Id
app.delete("/api/cours/:id", (req, res) => {
  console.log("here in BL : Delete Cours By Id");
  let id = req.params.id;
  Cours.deleteOne({ _id: id }).then((result) => {
    console.log("here result", result);
    result.deletedCount == 1
      ? res.json({ message: " deleted with success" })
      : res.json({ message: "Id Not Found" });
  });
});
//Bussiness Logic Cours End

//Bussiness Logic Groupes Begin
//Bussiness Logic:Get all Cours
app.get("/api/groupes", (req, res) => {
  console.log("here in BL : Get All Groupes");
  Groupe.find().then((docs) => {
    console.log("here documents", docs);
    res.status(200).json({ groupes: docs, message: "Success" });
  });
});

//Bussiness Logic:Get Groupe By Id
app.get("/api/groupes/:id", (req, res) => {
  console.log("here in BL : Get Groupe By Id");
  let id = req.params.id;
  Groupe.findOne({ _id: id }).then((doc) => {
    res.status(200).json({ groupe: doc });
  });
});
//Bussiness Logic:Get Groupe By Id Teacher
app.get("/api/groupes/teachers/:id", (req, res) => {
  console.log("here in BL : Get Groupe By Id Teacher");
  Groupe.find({ teacherId: req.params.id }).then((doc) => {
    res.status(200).json({ groupe: doc });
    console.log("here", doc);
  });
});
//Bussiness Logic: Add  Groupe
app.post("/api/groupes", (req, res) => {
  console.log("here in BL : Add Groupe  ");
  let obj = new Groupe(req.body);
  obj.save();
  res.json({ message: "added with success" });
});
//Bussiness Logic: Edit  Groupe
app.put("/api/groupes", (req, res) => {
  console.log("here in BL : Edit Groupe  ", req.body);
  Groupe.updateOne({ _id: req.body._id }, req.body).then((result) => {
    console.log("herer object after update", result);
    result.nModified == 1
      ? res.json({ message: "eidted with success" })
      : res.json({ message: "echec" });
  });
});
//Business Logic: Delete group By Id
app.delete("/api/groupes/:id", (req, res) => {
  console.log("here in BL : Delete group By Id");
  let id = req.params.id;
  Groupe.deleteOne({ _id: id }).then((result) => {
    console.log("here result", result);
    result.deletedCount == 1
      ? res.json({ message: " deleted with success" })
      : res.json({ message: "Id Not Found" });
  });
});
//Bussiness Logic Groupes End

//Bussiness Logic Notes Begin
//Bussiness Logic:Get Note By Id
app.get("/api/notes/:id", (req, res) => {
  console.log("here in BL : Get Note By Id");
  let id = req.params.id;
  Note.find({ studentId: id }).then((doc) => {
    res.status(200).json({ notes: doc });
  });
});
//Bussiness Logic: Add  Note
app.post("/api/notes", (req, res) => {
  console.log("here in BL : Add Note  ");
  let obj = new Note(req.body);
  obj.save();
  res.json({ message: "added with success" });
});

//Business Logic Signup Teacher
app.post(
  "/api/users/signup/teacher",
  multer({ storage: storageConfig }).single("cv"),
  (req, res) => {
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
      req.body.pwd = cryptedPwd;
      req.body.cv = `${req.protocol}://${req.get("host")}/myPDFs/${
        req.file.filename
      }`;
      let userObj = new User(req.body);
      userObj.save((err, doc) => {
        console.log("echec ", err);
        console.log("succes", doc);
        if (err) {
          if (err.errors.email) {
            res.status(200).json({ message: "0" });
          } else if (err.errors.tel) {
            res.status(200).json({ message: "1" });
          }
        } else {
          res.status(200).json({ message: "2" });
        }
      });
    });
  }
);
//Business Logic Signup Student
app.post(
  "/api/users/signup/student",
  multer({ storage: storageConfig }).single("photo"),
  (req, res) => {
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
      req.body.pwd = cryptedPwd;
      // Utilisez req.file pour accéder au fichier téléchargé spécifique au rôle

      req.body.photo = `${req.protocol}://${req.get("host")}/myImages/${
        req.file.filename
      }`;
      let userObj = new User(req.body);
      userObj.save((err, doc) => {
        console.log("echec ", err);
        console.log("succes", doc);
        if (err) {
          if (err.errors.email) {
            res.status(200).json({ message: "0" });
          } else if (err.errors.tel) {
            res.status(200).json({ message: "1" });
          }
        } else {
          res.status(200).json({ message: "2" });
        }
      });
    });
  }
);
//Bussiness logic :Signup parent
//Telchild Not found:0
//Email Error:1
//Tel Error:2
//Success :3
app.post("/api/users/signup/parent", (req, res) => {
  User.findOne({ tel: req.body.telChild, role: "student" }).then((doc) => {
    console.log("herer doc login", doc);
    if (!doc) {
      res.json({ message: "0" });
    } else {
      bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
        req.body.pwd = cryptedPwd;
        let userObj = new User(req.body);
        userObj.save((err, doc) => {
          console.log("echec ", err);
          console.log("succes", doc);
          if (err) {
            if (err.errors.email) {
              res.status(200).json({ message: "1" });
            } else if (err.errors.tel) {
              res.status(200).json({ message: "2" });
            }
          } else {
            res.status(200).json({ message: "3" });
          }
        });
      });
    }
  });
});
//Bussiness logic :Signup admin
app.post("/api/users/signup/admin", (req, res) => {
  bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
    req.body.pwd = cryptedPwd;
    let userObj = new User(req.body);
    userObj.save((err, doc) => {
      console.log("echec ", err);
      console.log("succes", doc);
      if (err) {
        if (err.errors.email) {
          res.status(200).json({ message: "0" });
        } else if (err.errors.tel) {
          res.status(200).json({ message: "1" });
        }
      } else {
        res.status(200).json({ message: "2" });
      }
    });
  });
});
// Bussiness logic :Signup commun
// app.post(
//   "/api/users/signup",
//   (req, res, next) => {
//     if (req.body.role === "teacher") {
//       multer({ storage: storageConfig }).single("cv")(req, res, next);
//     } else if (req.body.role === "student") {
//       multer({ storage: storageConfig }).single("photo")(req, res, next);
//     } else {
//       // Gérer les autres rôles ici, le cas échéant
//       next();
//     }
//   },
//   (req, res) => {
//     bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
//       req.body.pwd = cryptedPwd;
//       // Utilisez req.file pour accéder au fichier téléchargé spécifique au rôle
//       if (req.body.role === "teacher") {
//         req.body.cv = `${req.protocol}://${req.get("host")}/myPDFs/${
//           req.file.filename
//         }`;
//       } else if (req.body.role === "student") {
//         req.body.photo = `${req.protocol}://${req.get("host")}/myImages/${
//           req.file.filename
//         }`;
//       }
//       let userObj = new User(req.body);
//       userObj.save((err, doc) => {
//         console.log("echec ", err);
//         console.log("succes", doc);
//         if (err) {
//           if (err.errors.email) {
//             res.status(200).json({ message: "0" });
//           }
//         } else {
//           res.status(200).json({ message: "1" });
//         }
//       });
//     });
//   }
// );

//Business Logic Login
//Tel Error:0
//Password Error:1
//Success :2
//validaty error:4
app.post("/api/users/login", (req, res) => {
  let user;
  console.log("here into Bl Login", req.body);
  //Check if tel exist
  User.findOne({ tel: req.body.tel })
    .then((doc) => {
      console.log("herer doc login", doc);
      user = doc;
      //Check validity status

      if (user.validity == "en attente") {
        res.json({ msg: "4" });
      } else {
        //Send  tel Error msg
        if (!doc) {
          res.json({ msg: "0" });
        } else {
          //Check pwd
          return bcrypt.compare(req.body.pwd, doc.pwd);
        }
      }
    })
    .then((isEqual) => {
      console.log("here is equal", isEqual);
      if (!isEqual) {
        res.json({ msg: "1" });
      } else {
        let userToSend = {
          userId: user._id,
          fName: user.firstName,
          lName: user.lastName,
          email: user.email,
          tel: user.tel,
          telChild: user.telChild,
          role: user.role,
        };
        // If the user is valid, generate a JWT token
        const token = jwt.sign(userToSend, secretKey, {
          expiresIn: "1h",
        });
        res.json({ user: token, msg: "2" });
        console.log("user", userToSend);
      }
    });
});

//Business Logic get all teachers
app.get("/api/users/teachers", (req, res) => {
  console.log("here into bl : get all teachers");
  User.find({ role: "teacher" }).then((docs) => {
    res.json({ usersTab: docs });
  });
});
//Business Logic Search teachers By Specialite
app.get("/api/users/teachers/:specialite", (req, res) => {
  const specialiteQuery = new RegExp(req.params.specialite, "i");
  // 'i' pour une recherche insensible à la casse
  User.find({ role: "teacher", specialite: specialiteQuery }).then((docs) => {
    res.json({ usersTab: docs });
  });
});
//Business Logic get all stydents
app.get("/api/users/students", (req, res) => {
  console.log("here into bl : get all students");
  User.find({ role: "student" }).then((docs) => {
    res.json({ usersTab: docs });
  });
});
//Business Logic get all Parents
app.get("/api/users/parents", (req, res) => {
  console.log("here into bl : get all parents");
  User.find({ role: "parent" }).then((docs) => {
    res.json({ usersTab: docs });
  });
});
//Bussiness Logic:Get User By Id
app.get("/api/users/:id", (req, res) => {
  console.log("here in BL : Get User By Id");
  let id = req.params.id;
  User.findOne({ tel: id }).then((doc) => {
    res.status(200).json({ user: doc });
  });
});
//Business Logic: validate teacher By Id
app.put("/api/users", (req, res) => {
  User.updateOne({ _id: req.body._id }, req.body).then((response) => {
    if (response.nModified == 1) {
      res.json({ msg: "OK" });
    } else {
      res.json({ msg: "Not OK" });
    }
  });
});
//Business Logic: Delete User By Id
app.delete("/api/users/:id", (req, res) => {
  console.log("here in BL : Delete Users By Id");
  let id = req.params.id;
  User.deleteOne({ _id: id }).then((result) => {
    console.log("here result", result);
    result.deletedCount == 1
      ? res.json({ message: " deleted with success" })
      : res.json({ message: "Id Not Found" });
  });
});
//make application exportable
module.exports = app;
