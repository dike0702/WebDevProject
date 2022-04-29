"use strict";


const db = require("./db");
const userModel = require("./userModel");
const crypto = require("crypto");
const res = require("express/lib/response");

async function addDrawingPost(req, res, userID){
    const postid = crypto.randomBytes(12).toString('hex');
    const user = await userModel.getUserByUserid(userID);
    const username = user.username;
    const email = user.email;
    const url       = req.body.url;
    const title       = req.body.title;
    const description = req.body.description;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `
        INSERT INTO drawingPosts
        (postid,contributer, email, url, title, description, filename, mimetype, path, originalName) 
        VALUES
        (@postid,@username, @email, @url, @title, @description, @filename, @mimetype, @path, @originalName)
        `;

    
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "postid":postid,
            username,
            "email": email,
            "url": url,
            "title": title,
            "description": description,
            "filename": filename,
            "mimetype":mimetype,
            "path":path,
            "originalName": originalName
        });
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
}
async function addGamingPost(req, res, userID){
    const postid = crypto.randomBytes(12).toString('hex');
    const user = await userModel.getUserByUserid(userID);
    const username = user.username;
    const email = user.email;
    const url       = req.body.url;
    const title       = req.body.title;
    const description = req.body.description;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `
        INSERT INTO gamingPosts
        (postid,contributer, email, url, title, description, filename, mimetype, path, originalName) 
        VALUES
        (@postid,@username, @email, @url, @title, @description, @filename, @mimetype, @path, @originalName)
        `;

    
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "postid":postid,
            username,
            "email":email,
            "url": url,
            "title": title,
            "description": description,
            "filename": filename,
            "mimetype":mimetype,
            "path":path,
            "originalName": originalName
        });
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
}

async function addCookingPost(req, res, userID){
    const postid = crypto.randomBytes(12).toString('hex');
    const user = await userModel.getUserByUserid(userID);
    const username = user.username;
    const email = user.email;
    const url       = req.body.url;
    const title       = req.body.title;
    const description = req.body.description;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `
        INSERT INTO cookingPosts
        (postid,contributer, email, url, title, description, filename, mimetype, path, originalName) 
        VALUES
        (@postid,@username, @email, @url, @title, @description, @filename, @mimetype, @path, @originalName)
        `;

    
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "postid":postid,
            username,
            "email":email,
            "url": url,
            "title": title,
            "description": description,
            "filename": filename,
            "mimetype":mimetype,
            "path":path,
            "originalName": originalName
        });
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
}

async function updateGamingPost (req, res, postid) {
    const reTitle = req.body.reTitle;
    const reDesc = req.body.reDesc;
    const reUrl = req.body.reUrl;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `UPDATE gamingPosts SET title=@title, description=@description, url=@url, filename=@filename, mimetype=@mimetype, path=@path, originalName=@originalName
                WHERE postid=@postid`;
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "title":reTitle,
            "description":reDesc,
            "url":reUrl,
            "filename":filename,
            "mimetype":mimetype,
            "path":path,
            "originalName":originalName,
            "postid":postid
        })
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
async function updateCookingPost (req, res, postid) {
    const reTitle = req.body.reTitle;
    const reDesc = req.body.reDesc;
    const reUrl = req.body.reUrl;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `UPDATE cookingPosts SET title=@title, description=@description, url=@url, filename=@filename, mimetype=@mimetype, path=@path, originalName=@originalName
                WHERE postid=@postid`;
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "title":reTitle,
            "description":reDesc,
            "url":reUrl,
            "filename":filename,
            "mimetype":mimetype,
            "path":path,
            "originalName":originalName,
            "postid":postid
        })
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
async function updateDrawingPost (req, res, postid) {
    const reTitle = req.body.reTitle;
    const reDesc = req.body.reDesc;
    const reUrl = req.body.reUrl;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `UPDATE drawingPosts SET title=@title, description=@description, url=@url, filename=@filename, mimetype=@mimetype, path=@path, originalName=@originalName
                WHERE postid=@postid`;
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "title":reTitle,
            "description":reDesc,
            "url":reUrl,
            "filename":filename,
            "mimetype":mimetype,
            "path":path,
            "originalName":originalName,
            "postid":postid
        })
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

function getAllDrawingPosts(){
    const sql = `SELECT * FROM drawingPosts`;
    try{
        const stmt = db.prepare(sql);
        return stmt.all();
    } catch(err) {
        console.error(err);
    }
}

function getAllGamingPosts(){
    const sql = `SELECT * FROM gamingPosts`;
    try{
        const stmt = db.prepare(sql);
        return stmt.all();
    } catch(err) {
        console.error(err);
    }
}

function getAllCookingPosts(){
    const sql = `SELECT * FROM cookingPosts`;
    try{
        const stmt = db.prepare(sql);
        return stmt.all();
    } catch(err) {
        console.error(err);
    }
}

function getAllDrawPostsByUsername(username){
    const sql = `SELECT * FROM drawingPosts WHERE contributer=@username`;
    try {
        const postList = db.prepare(sql).all({username});
        return postList;
    } catch(err) {
        console.error(err);
    }
}
function getAllGamePostsByUsername(username){
    const sql = `SELECT * FROM gamingPosts WHERE contributer=@username`;
    try {
        const postList = db.prepare(sql).all({username});
        return postList;
    } catch(err) {
        console.error(err);
    }
}
function getAllCookPostsByUsername(username){
    const sql = `SELECT * FROM cookingPosts WHERE contributer=@username`;
    try {
        const postList = db.prepare(sql).all({username});
        return postList;
    } catch(err) {
        console.error(err);
    }
}

function getGamingPostByPostId(postid){
    const sql = `SELECT * FROM gamingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        const post = stmt.get({"postid":postid});
        return post;
    } catch (err) {
        console.error(err);
    }
}

function getDrawingPostByPostId(postid){
    const sql = `SELECT * FROM drawingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        const post = stmt.get({"postid":postid});
        return post;
    } catch(err) {
        console.error(err);
    }
}
function getCookingPostByPostId(postid){
    const sql = `SELECT * FROM cookingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        const post = stmt.get({"postid":postid});
        return post;
    } catch(err) {
        console.error(err);
    }
}

function deleteDrawingPostByPostId(postid) {
    const sql = `DELETE FROM drawingPosts WHERE postid=@postid`;
    const stmt =  db.prepare(sql);
    try {
        stmt.run({postid});
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
function deleteGamingPostByPostId(postid) {
    const sql = `DELETE FROM gamingPosts WHERE postid=@postid`;
    const stmt =  db.prepare(sql);
    try {
        stmt.run({postid});
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
function deleteCookingPostByPostId(postid) {
    const sql = `DELETE FROM cookingPosts WHERE postid=@postid`;
    const stmt =  db.prepare(sql);
    try {
        stmt.run({postid});
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    addDrawingPost,
    addGamingPost,
    addCookingPost,

    getAllCookingPosts,
    getAllDrawingPosts,
    getAllGamingPosts,

    getAllDrawPostsByUsername,
    getAllGamePostsByUsername,
    getAllCookPostsByUsername,

    getCookingPostByPostId,
    getGamingPostByPostId,
    getDrawingPostByPostId,

    updateCookingPost,
    updateDrawingPost,
    updateGamingPost,
    
    deleteCookingPostByPostId,
    deleteDrawingPostByPostId,
    deleteGamingPostByPostId,
}


// function removePost(filename){
//     const sql = `DELETE * FROM Posts WHERE filename=@filename`;
//     const stmt = db.prepare(sql);
//     stmt.run({
//         "contributor": userID
//     });
// }

// // url, title, descriptionはそれぞれのfunctionから取得可能
// function geturl(userID){
//     const sql = `
//         SELECT url
//         FROM Posts 
//         Where contributor=@userID`;

//     const stmt = db.prepare(sql);
//     const record = stmt.get({userID});

//     if (!record) return;

//     return record.url;
// }

// function getTitle(userID){
//     const sql = `
//         SELECT title 
//         FROM Posts
//         Where contributor=@userID`;

//     const stmt = db.prepare(sql);
//     const record = stmt.get({userID});

//     if (!record) return;

//     return record.title;
// }

// function getDiscription(userID){
//     const sql = `
//         SELECT description
//         FROM Posts
//         Where contributor=@userID`;

//     const stmt = db.prepare(sql);
//     const record = stmt.get({userID});

//     if (!record) return;

//     return record.description;
// }