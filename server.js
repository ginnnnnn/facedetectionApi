const express =require('express');
const bodyParser =require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const knex=require('knex');
const signin=require('./controllers/signin');
const register=require('./controllers/register');
const profile=require('./controllers/profile');
const image=require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ginnnnnn',
    password : '',
    database : 'smart-brain'
  }
});


const app =express();


app.use(bodyParser.json());
app.use(cors());




app.get('/',(req, res)=>{
	res.json('working')
})


app.post('/signin',(req, res)=>{signin.handleSignin(req, res, db, bcrypt)}) // signin check post

 app.post('/register',register.handleRegister(db, bcrypt))

app.get('/profile/:id',(req, res)=>{profile.handleProfileGet(req, res, db)})

app.put('/image',(req, res)=>{image.handleImage(req, res, db)})

app.post('/imageurl',(req, res)=>{image.handleApiCall(req, res)})


app.listen( process.env.PORT || 3000,()=>{
	console.log(`this app is running on port ${process.env.PORT}`)
})


// 	* api thinkcap
//  /--> GET res == root this is working //check the root working
//  /signin ---> POST success/fail // user send json pack and res success/fail
//  /register --->POST == user // new vistor register and send jsonpack ,res user new
//  /profile/:userID-->GET =user //for user index
//  /image ----> PUT----->user // for user update
// // bcrypt
// 

	// const bcrypt = require('bcrypt');
 //  const saltRounds = 10;
 //  const myPassword = 'password1';
 //  const testPassword = 'password2';
 //  const myHash ='$2a$10$fok18OT0R/cWoR0a.VsjjuuYZV.XrfdYd5CpDWrYkhi1F0i8ABp6e'; // myPassword加密後結果(驗證用)

//saltRounds: 整數型態，數值越高越安全。
// myPassword: 要加密的字串。
// testPassword: 測試驗證密碼的變數。
// myHash: myPassword加密後結果(給驗證用)
 // // 加密
 //  bcrypt.hash(myPassword, saltRounds).then(function (hash) {
 //    // Store hash in your password DB.
 //    console.log(hash);
 //  });

 //  // 驗證密碼
 //  bcrypt.compare(myPassword, myHash).then(function (res) {
 //    console.log(res); // true
 //  });
 //  bcrypt.compare(testPassword, myHash).then(function (res) {
 //    console.log(res); // false
 //  });