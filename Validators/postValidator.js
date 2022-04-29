"use strict";
const Joi = require("joi");

const validateOpt = {
	abortEarly: false,
	stripUnknown: true, 
	errors: {
		escapeHtml: true,
	}
};

const postSchema = Joi.object({
    url:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")),

    title:Joi.string()
        .min(3)
        .max(30)
        .required(),


    description:Joi.string()
        .min(3)
        .max(255)
        .required()
});

const editPostSchema = Joi.object({
    reUrl:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")),

    reTitle:Joi.string()
        .min(3)
        .max(30)
        .required(),


    reDesc:Joi.string()
        .min(3)
        .max(255)
        .required()
});

function uploadPostValidator(req, res, next) {
    const {value, error} = postSchema.validate(req.body, validateOpt);
    if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});//Bad Request
    }
    
    req.body = value;
    next();
}

function editPostValidator(req, res, next) {
    const {value, error} = editPostSchema.validate(req.body, validateOpt);
    if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});//Bad Request
    }
    
    req.body = value;
    next();
}


module.exports = {
    uploadPostValidator,
    editPostValidator
}