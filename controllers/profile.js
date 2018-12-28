const handleProfileGet = (req, res, db)=>{
	const { id } = req.params; //remenber
	db.select('*').from('users').where({id})
	.then(user=>{
		if(user.length){
		res.json(user[0])	
	}else{
		res.json('Not found')
		}
	// if(!found){
	// 	res.status(400).json('user not found');
	// }
	})
	.catch(err=>res.status(400).json('error getting user'))
}

module.exports={
	handleProfileGet:handleProfileGet
}