"use strict";

const postModel = require("../Models/postModel");
const userModel = require("../Models/userModel");

async function getDrawingUserPage(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const username = req.session.user.username;
      const postid = req.params.postid;
      const post = await postModel.getDrawingPostByPostId(postid);
      res.render("drawingUserPage", {post:post, username:username});
}

async function getGamingUserPage(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const username = req.session.user.username;
      const postid = req.params.postid;
      const post = await postModel.getGamingPostByPostId(postid);
      console.log(post);
      res.render("gamingUserPage", {post:post, username:username});
}

async function getCookingUserPage(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const username = req.session.user.username;
      const postid = req.params.postid;
      const post = await ostModel.getCookingPostByPostId(postid);
      res.render("cookingUserPage", {post:post, username:username});
}

async function getDrawingUserIndex(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const usernameAccessed = req.params.username;
      const usernameSession = req.session.user.username;
      const allPosts = await postModel.getAllDrawPostsByUsername(usernameAccessed);
      res.render("drawingUserIndex", {allPosts:allPosts, usernameAccessed:usernameAccessed, usernameSession:usernameSession});
}

async function getGamingUserIndex(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const usernameAccessed = req.params.username;
      const usernameSession = req.session.user.username;
      const allPosts = await postModel.getAllGamePostsByUsername(usernameAccessed);
      res.render("gamingUserIndex", {allPosts:allPosts, usernameAccessed:usernameAccessed, usernameSession:usernameSession});
}

async function getCookingUserIndex(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const usernameAccessed = req.params.username;
      const usernameSession = req.session.user.username;
      const allPosts = await postModel.getAllCookPostsByUsername(usernameAccessed);
      res.render("cookingUserIndex", {allPosts:allPosts, usernameAccessed:usernameAccessed, usernameSession:usernameSession});
}
async function getDrawingUsers(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      
      const users = await userModel.getAllDrawingUsers();
      let isUsers = true;
      if(users.length === 0) {
        isUsers = false;
      }
      res.render("drawingUsers", {users:users, isUsers:isUsers});
}
async function getGamingUsers(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const users = await userModel.getAllGamingUsers();
      let isUsers = true;
      if(users.length === 0){
        isUsers = false;
      }
      res.render("gamingUsers", {users:users, isUsers:isUsers});
}
async function getCookingUsers(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const users = await userModel.getAllCookingUsers();
      let isUsers = true;
      if(users.length === 0) {
        isUsers = false;
      }
      res.render("cookingUsers", {users:users, isUsers:isUsers});
}
async function getDrawing(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const username = req.session.user.username;
      const isCoach = req.session.role;
      const allData = await postModel.getAllDrawingPosts();
      res.render("drawIndex", {allData:allData, username:username, isCoach:isCoach});
}
async function getGaming(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const username = req.session.user.username;
      const isCoach = req.session.role;
      const allData = await postModel.getAllGamingPosts();
      res.render("gameIndex", {allData:allData, username, isCoach:isCoach});
}
async function getCooking(req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const username = req.session.user.username;
      const isCoach = req.session.role;
      const allData = await postModel.getAllCookingPosts();
      res.render("cookIndex", {allData:allData, username, isCoach:isCoach});
}

module.exports = {
    getDrawingUserPage,
    getGamingUserPage,
    getCookingUserPage,

    getDrawingUserIndex,
    getGamingUserIndex,
    getCookingUserIndex,

    getDrawingUsers,
    getCookingUsers,
    getGamingUsers,

    getDrawing,
    getGaming,
    getCooking
}