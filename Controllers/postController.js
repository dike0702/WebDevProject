"use strict";

const { sendStatus } = require("express/lib/response");
const postModel = require("../Models/postModel");
const userModel = require("../Models/userModel");

/**
 * app.post("api/upload", postModel.addVideo)で使用される。
 * 
 */
async function drawingUpload(req, res){
    if(!req.session.isLoggedIn) {
        return res.sendStatus(403);//Forbidden
    }
    const user = userModel.getUserByUsername(req.session.user.username);
    const isCoach = user.isCoach;
    if(!isCoach){
        return res.sendStatus(401);//Unauthorized
    }

    const userID = req.session.user.userID;
    
    if(await postModel.addDrawingPost(req, res, userID)){
        return res.redirect("/drawing");
    } else {
        return res.sendStatus(400);
    }
}
async function gamingUpload(req, res){
    if(!req.session.isLoggedIn) {
        return res.sendStatus(403);//Forbidden
    }
    const user = userModel.getUserByUsername(req.session.user.username);
    const isCoach = user.isCoach;
    if(!isCoach){
        return res.sendStatus(401);//Unauthorized
    }

    const userID = req.session.user.userID;
    
    if(await postModel.addGamingPost(req, res, userID)){
        return res.redirect("/gaming");
    } else {
        return res.sendStatus(400);
    }
}
async function cookingUpload(req, res){
    if(!req.session.isLoggedIn) {
        return res.sendStatus(403);//Forbidden
    }
    const user = userModel.getUserByUsername(req.session.user.username);
    const isCoach = user.isCoach;
    if(!isCoach){
        return res.sendStatus(401);//Unauthorized
    }

    const userID = req.session.user.userID;
    
    if(await postModel.addCookingPost(req, res, userID)){
        return res.redirect("/cooking");
    } else {
        return res.sendStatus(400);
    }
}

async function editGamingPost(req, res) {
    const username = req.params.username;
    if (req.session.user.username !== username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    const post = postModel.getGamingPostByPostId(postid);
    if(post.contributer === username){
        if(await postModel.updateGamingPost(req, res, postid)) {
            return res.sendStatus(200);
        } else  {
            return res.sendStatus(400);
        }
    }
}
async function editCookingPost(req, res) {
    const username = req.params.username;
    if (req.session.user.username !== username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    const post = postModel.getCookingPostByPostId(postid);
    if(post.contributer === username){
        if(await postModel.updateCookingPost(req, res, postid)) {
            return res.sendStatus(200);
        } else  {
            return res.sendStatus(400);
        }
    }
}
async function editDrawingPost(req, res) {
    const username = req.params.username;
    if (req.session.user.username !== username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    const post = postModel.getDrawingPostByPostId(postid);
    if(post.contributer === username){
        if(await postModel.updateDrawingPost(req, res, postid)) {
            return res.sendStatus(200);
        } else  {
            return res.sendStatus(400);
        }
    }
}

async function deleteDrawingPost(req, res){
    const username = req.params.username;
    if(username !== req.session.user.username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    if(await postModel.deleteDrawingPostByPostId(postid)){
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}
async function deleteGamingPost(req, res){
    const username = req.params.username;
    if(username !== req.session.user.username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    if(await postModel.deleteGamingPostByPostId(postid)){
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}
async function deleteCookingPost(req, res){
    const username = req.params.username;
    if(username !== req.session.user.username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    if(await postModel.deleteCookingPostByPostId(postid)){
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}

// async function reviewUpload(req, res){
//     // if(!req.session.isLoggedIn){
//     //     return res.sendStatus(403);
//     // }
//     console.log(req);
//     const userID = req.session.user.userID;
//     const postid = req.params['postid'];
//     console.log(postid);

//     await postModel.addReview(req, res, userID, postid)

    // if(await postModel.addReview(req, res, userID, postid)){
    //     return res.sendStatus(200);
    // } else{
    //     res.sendStatus(400);
    // }
//}

module.exports = {
    drawingUpload,
    gamingUpload,
    cookingUpload,
    editCookingPost,
    editGamingPost,
    editDrawingPost,
    deleteDrawingPost,
    deleteGamingPost,
    deleteCookingPost
}