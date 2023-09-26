import Joi from 'joi';

export const changePasswordValidation = async (req, res, next) => {
    const userSchema = Joi.object({
        oldPassword: Joi.string().required().messages({
            'string.empty': 'Photo profile cannot be empty',
        }),
        newPassword: Joi.string().min(5).required().messages({
            'string.min': 'new password must be at least 5 characters long',
            'any.required': 'Password is required',
        }),
        confirmPassword: Joi.string().required().messages({
            'string.empty': 'confirmation password cannot be empty',
            'any.required': 'Password is required',
        }),
    }).custom((value, helpers)=>{
        if(value.newPassword !== value.confirmPassword) return helpers.error('register.password.diffrent');
    }).message({'register.password.diffrent': 'password and confirm password is different'});

    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
