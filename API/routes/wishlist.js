const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');
const User = require('../model/User');

router.patch('/', verify, async (req, res) => {
	try{
		const updatedWishlist = await User.updateOne(
		{_id:req.user},
		{$set: {wishlist: req.body.wishlist}}
		);
		res.json({message:'Update Berhasil...'});
	}catch(err){
		res.json({message: err});
	}
});

router.get('/', verify, async (req,res) => {
	try{
		const result = await User.findOne({_id:req.user});
		const wishlist = result.wishlist;
		res.json({result:wishlist});
		
	}catch(err){
		res.json({message: err});
	}
});

module.exports = router;