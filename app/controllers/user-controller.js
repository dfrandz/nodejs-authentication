const db = require("../models");
const User = db.users;
let jwt = require('jsonwebtoken');
require("dotenv").config({path: '../../.env'});
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");




exports.create = async (req, res) =>{
    const {name,password,email} = req.body;

    try {
        let userExist = await User.findOne({where: {email}});
        if(userExist){
            return res.status(400).json({message:"User already exists"});
        }
    } catch (error) {
        console.log(error)
    }
    
    //hash password
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
        email: email,
        name: name,
        password: encryptedPassword
    });

    //save user to database

    try {
        user.save();
    } catch (error) {
        console.log(error);
    }

    const token = jwt.sign(
    {
        email: user.email,
        password: user.id
    },
        process.env.JWT_KEY,
    {
        expiresIn: "2h",
    });

    return res.status(201).json({
        user,
        token
    });
}

exports.signIn = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where:{email}});
        const correctPassword = await bcrypt.compare(password, user.password);
        if(user && correctPassword){
            const token = jwt.sign(
                {email: user.email,password: user.password},
                process.env.JWT_KEY,
                {expiresIn: "2h"}
            );
            return res.status(201).json({
                user,
                token
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(403).json({message:"incorrect credential"});
    }
}

exports.getAll = async (req, res) =>{
    let users;
    try {
        users = await User.findAll();
        if(!users){
            return res.status(404).json({message: "No Students found"});
        }
        return res.status(201).json({users});
    } catch (error) {
        console.log(error);
    }

}