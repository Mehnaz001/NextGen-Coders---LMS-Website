import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";
import sendMail from "../config/sendMail.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Enter strong password" });
        }

        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exist" });
        }

        let hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(user);
    } catch (e) {
        return res.status(500).json({ message: `Sign up error ${e}` });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: `Login error ${e}` });
    }
};

export const logOut = async (req, res) => {
    try {
        
        res.clearCookie("token");
        return res.status(200).json({ message: "LogOut successfully" });
    } catch (err) {
        return res.status(500).json({ message: `LogOut error ${err}` });
    }
};

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;
        await user.save();

        await sendMail(email, otp);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: `SendOTP error ${error}` });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        
        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.resetOtp = undefined;
        user.otpExpires = undefined;
        user.isOtpVerified = true;
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Verify OTP error ${error}` });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(403).json({ message: "OTP verification is required" });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Enter strong password" });
        }

        let hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.isOtpVerified = false;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Reset password error ${error}` });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        let user = await User.findOne({ email });
        let isNewUser = false;

        if (!user) {
            user = await User.create({ name, email, role });
            isNewUser = true;
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        
        return res.status(isNewUser ? 201 : 200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `GoogleAuth error ${error}` });
    }
};