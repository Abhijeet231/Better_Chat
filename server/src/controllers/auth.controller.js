import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";

// SIGNUP USER
export const signup = async (req,res) => {
    
    const {fullName, email, password} = req.body;

    try {

        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All Fields are required!"})
        }

        if( !password || password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        //Searching for the user in the DB
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"});

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //Creating New User
        const newUser =  new User ({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            //Generating jwt token 
            await newUser.save();
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json({message: "Invalid user data"})
        }



    } catch (error) {
        console.log("Error in SignUp controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

// LOGIN USER
export const login = async (req,res) => {
    
    const{email, password} = req.body

    try {
        //Finding User in the DB
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        //Checking password
     const isPassCorrect = await bcrypt.compare(password, user.password)
     if(!isPassCorrect){
        return res.status(400).json({message: "Invalid Credentials"})
     }

     //Generating token
     generateToken(user._id, res)

     res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
     })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
        
    }
};

// LOGOUT USER
export const logout = (req,res) => {
    try {
        res.cookie("jwt", "",{maxAge:0} );
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
        
    }
}

// UPDATE USER PROFILE
export const updateProfile = async (req,res) => {
   try {
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic){
        return res.status(400).json({message: "profile pic is required"});
    }

 const uploadRes = await cloudinary.uploader.upload(profilePic)

 const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadRes.secure_url}, {new: true})

 res.status(200).json(updatedUser);

   } catch (error) {
    console.log("Error in Update Profile:", error.message);
    res.status(500).json({message: "Internal Server Error"})
    
   }
};

//Check Auth
export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    };
};
        