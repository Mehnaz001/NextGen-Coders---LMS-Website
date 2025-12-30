import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";

export const signUp = async (req,res) => {
    try {
        const {name, email, password, role} = req.body;
        let existUser = await User.findOne({email});

        if(existUser) {
            return res.status(400).json({message: "User already exist"});
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json({message:"Enter valid email"});
        }

        if(password.length < 8) {
            return res.status(400).json({message: "Enter strong password"})
        }

        let hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashPassword,
            role
        })
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite:"Strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user)
    } catch(e) {
        return res.status(400).json({message: `Sign up error ${e}`})
    }
}

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: " User not found"})
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message:"Incorrect password"});
        }

        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite:"Strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)

    } catch(e) {
        return res.status(400).json({message: `Login error ${e}`})
    }
}

export const logOut = async () => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({message: "LogOut successfully"})
    } catch(err) {
        return res.status(500).json({message: `LogOut error ${err}`})
    }
}