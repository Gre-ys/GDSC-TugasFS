const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
	//Validate Data
	const{error} = registerValidation(req.body);
	if(error) return res.status(400).json({message:error.details[0].message});
	
	//Check User Exist in Database
	const usernameExist = await User.findOne({username: req.body.username});
	if(usernameExist) return res.status(400).json({message:'Username Sudah Digunakan!'});
	
	//Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	
	//Create New User
	const user = new User({
		username: req.body.username,
		password: hashedPassword,
		wishlist: []
	});
	
	try{
		const savedUser = await user.save();
		res.json({message:"Registrasi Berhasil"});
	}catch(err){
		res.status(400).json({message:err});
	}
});

router.post('/login', async (req,res) => {
	//Validate Data
	const{error} = loginValidation(req.body);
	if(error) return res.status(400).json({message:error.details[0].message});
	
	//Check User Exist in Database
	const usernameExist = await User.findOne({username: req.body.username});
	if(!usernameExist) return res.status(400).json({message:'Username atau Password Salah...'});
	
	//Check Password Correct
	const validPass = await bcrypt.compare(req.body.password, usernameExist.password);
	if(!validPass) return res.status(400).json({message:'Username atau Password Salah...'});
	
	//Create Token
	const token = jwt.sign({_id: usernameExist._id}, process.env.TOKEN_SECRET);
	res.header('auth-token', token).json({token:token});
});

module.exports = router;