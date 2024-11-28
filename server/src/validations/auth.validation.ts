import Joi from 'joi'

//validate user login input 
export const loggerSchema = Joi.object({
    username: Joi.alt(Joi.string().pattern(/^251[7,9]\d{8}$/), Joi.string().min(6).required()),
    password: Joi.string().min(8).required(),
});

//validate user input before changing password
export const changePassword = Joi.object({
    username: Joi.string().required(),
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required()
})