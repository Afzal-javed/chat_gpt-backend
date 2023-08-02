const errorHandler = require('../middleware/errorMiddleware');
const useModel = require('../models/userModel');
const errorResponse = require('../utils/errorResponse');
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};

exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const existingEmail = await useModel.findOne({ email })
        if (existingEmail) {
            return next(new errorResponse('Email is Already register', 500))
        }
        const user = await useModel.create({ username, email, password })
        this.sendToken(user, 201, res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new errorResponse('Please enter email or password'))
        }
        const user = await useModel.findOne({ email })
        if (!user) {
            return next(new errorResponse('Invalid user', 401))
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new errorResponse('wrong password', 401));

        }
        this.sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success: true,
        message: "Logout Successfully",
    })
}