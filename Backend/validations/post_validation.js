import Joi from 'joi';

export const createPostValidation = async (req, res, next) => {
    const userSchema = Joi.object({
        authorId: Joi.number().required().messages({
            'number.empty': 'id of author cannot be empty',
            'any.required': 'id of author is required',
        }),
        title: Joi.string().required().messages({
            'string.empty': 'title cannot be empty',
            'any.required': 'title is required',
        }),
        content: Joi.string().required().messages({
            'string.empty': 'content cannot be empty',
            'any.required': 'content is required',
        }),
        pulished: Joi.boolean().required().messages({
            'boolean.empty': 'published cannot be empty',
            'any.required': 'published is required',
        }),
        category: Joi.string().required().messages({
            'string.empty': 'category cannot be empty',
            'any.required': 'category is required',
        }),
    });
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
export const deletePostValidation = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Invalid refresh token" });
    try {
        const token = await prismaClient.refreshToken.findUnique({
            where: { token: refreshToken },
            include: {
                user: {
                    select: {
                        id: true,
                    }
                },
                include: {
                    posts
                }
            }
        })
        if (!token) return res.sendStatus(403);

        next();
    } catch (err) {

    }
};