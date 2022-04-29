"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const crypto = require('crypto');
const helmet = require("helmet");
const isProduction = process.env.NODE_ENV === "production";


/*Register Session Management*/
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.COOKIE_SECRET, 
    resave: false,
    saveUninitialized: false,
    name: "session", // now it is just a generic name
    isLoggedIn: false,
    cookie: {
      sameSite: isProduction, //allow cookie only in the website
      secure: isProduction, //allow cookie only on https transmission
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    }
};
app.use(session(sessionConfig));//session

app.use(express.urlencoded({extended: true}));
app.use(express.json({limit:200}));
app.use(express.static("public", {index: "index.html", extensions: ["html"]}));
app.use(express.static(__dirname+"/public"));
app.use(express.static("public/media/drawingVidImages"));
app.use(express.static("public/media/gamingVidImages"));
app.use(express.static("public/media/cookingVidImages"));

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

const userController = require('./Controllers/userController');
const postController = require('./Controllers/postController');
const userValidator = require('./Validators/userValidator');
const postValidator = require('./Validators/postValidator');
const viewController = require("./Controllers/viewController");
const userModel = require('./Models/userModel');
const postModel = require("./Models/postModel");
const mailService = require("./mailService/mailService");
const {notFoundHandler, productionErrorHandler, catchAsyncErrors} = require("./utils/errorHandlers");


const fileOpts = {
  filename: function(req, file, cb) {
  const randomName = crypto.randomBytes(12).toString('hex');
  // Parse the extension from the file's original name
  const [extension] = file.originalname.split(".").slice(-1);
  // Now the random name preserves the file extension
  cb(null, `${randomName}.${extension}`);
  },
  fileFilter (req, file, cb) {      
  if (file.mimetype.startsWith("image/")) { //accept image file only
    return cb(null, true); // accept the file
  } else {
    return cb(null, false); // reject the file
  }
  }
};
const storageDrawing = multer.diskStorage({ destination:'public/media/drawingVidImages/', fileOpts});
const storageGaming = multer.diskStorage({ destination: 'public/media/gamingVidImages/', fileOpts });
const storageCooking = multer.diskStorage({ destination: 'public/media/cookingVidImages/', fileOpts });

const drawingVidImage = multer({ storage:storageDrawing});
const gamingVidImage = multer({ storage:storageGaming});
const cookingVidImage = multer({ storage:storageCooking});

app.post("/api/register", userValidator.registerValidator, userController.createNewUser);
app.post("/api/login", userValidator.loginValidator, userController.login);
app.get("/logout",userController.logOut);

//Show ...ing home page
app.get("/drawing", catchAsyncErrors(viewController.getDrawing));
app.get("/gaming", catchAsyncErrors(viewController.getGaming));
app.get("/cooking", catchAsyncErrors(viewController.getCooking));

app.post("/api/drawingUpload",drawingVidImage.single('drawingVidImage'), 
postValidator.uploadPostValidator, postController.drawingUpload);

app.post("/api/gamingUpload",gamingVidImage.single('gamingVidImage'), 
postValidator.uploadPostValidator, postController.gamingUpload);

app.post("/api/cookingUpload",cookingVidImage.single('cookingVidImage'), 
postValidator.uploadPostValidator, postController.cookingUpload);

//Show list of users 
app.get("/drawingUsers", catchAsyncErrors(viewController.getDrawingUsers));
app.get("/gamingUsers", catchAsyncErrors(viewController.getGamingUsers));
app.get("/cookingUsers", catchAsyncErrors(viewController.getCookingUsers));

//Show user's home page
app.get("/drawingUser/:username", catchAsyncErrors(viewController.getDrawingUserIndex));
app.get("/gamingUser/:username", catchAsyncErrors(viewController.getGamingUserIndex));
app.get("/cookingUser/:username", catchAsyncErrors(viewController.getCookingUserIndex));

//show user's edit page ejs
app.get("/drawingUser/:username/:postid", catchAsyncErrors(viewController.getDrawingUserPage));
app.get("/gamingUser/:username/:postid", catchAsyncErrors(viewController.getGamingUserPage));
app.get("/cookingUser/:username/:postid", catchAsyncErrors(viewController.getCookingUserPage));

//Post method for edit post
app.post("/drawingUser/:username/:postid/edit", drawingVidImage.single('reImage'),
postValidator.editPostValidator, postController.editDrawingPost);
app.post("/gamingUser/:username/:postid/edit", gamingVidImage.single('reImage'),
postValidator.editPostValidator, postController.editGamingPost);
app.post("/cookingUser/:username/:postid/edit", cookingVidImage.single('reImage'),
postValidator.editPostValidator, postController.editCookingPost);

//Post method for delete post
app.post("/drawingUser/:username/:postid/delete", postController.deleteDrawingPost);
app.post("/gamingUser/:username/:postid/delete", postController.deleteGamingPost);
app.post("/cookingUser/:username/:postid/delete", postController.deleteCookingPost);

app.use(notFoundHandler);

if(isProduction) {
  app.set('trust proxy',1);
  app.use(helmet());
  app.use(productionErrorHandler);
}

module.exports = app;
// app.post("/api/edit/:username", userController.editUser);
// app.get("/delete/:username", userController.deleteUser);
// app.get("/delete/:username", (req, res) => {
//   const username = req.params['username'];
//   userModel.deleteUserbyUsername(username);
//   res.redirect("/register");
// })
// review page
// app.get("/review/:postid", (req, res) => {
//   const postid = req.params['postid'];
//   console.log(postid);
//   const allreview = postModel.getReviewByPostid(postid);
//   console.log(allreview);
//   res.render("reviewIndex", {data:allreview, req, postid});
// });
// app.post("/api/review/:postid/post", (req, res) => {
//   const postid = req.params['postid'];
//   postController.reviewUpload(req, res); 
//   const url = "/review/" + postid;
//   console.log(url);
//   res.redirect(url);
//   console.log('aaa');
// });
// app.get("/postReview/:postid", (req, res) => {
//   const postid = req.params['postid'];
//   res.render("postReview", {postid});
// });


// module.exports = app;