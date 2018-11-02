const express = require('express');
const md5 = require('blueimp-md5');

const Params = require('../msg');
const User = require('../model/users');

const router = express.Router();
router.use(express.urlencoded({extended:true}));

router.post('/login', async (req, res)=>{
  const {username, password} = req.body;
  if (!username || !password ){
    res.json(new Params(2,'用户参数不合法'));
    return;
  }
  try {
    const data = await User.findOne({username,password: md5(password)});
    if (!data){
      res.json(new Params(4, '用户名不存在'));
    }else {
      res.json(new Params(0, {id: data.id, username: data.username, type: data.type}));
    }
  } catch (e) {
    res.json(new Params(1, '网络故障'));
  }
});

router.post('/register', async (req, res)=>{
  const {username, password, type} = req.body;
  if (!username || !password || !type){
    res.json(new Params(2,'用户参数不合法'));
    return;
  }
  try {
    const data = await User.findOne({username});
    if (data){
      res.json(new Params(3, '用户名已存在'));
    }else {
      const user = await User.create({username, password: md5(password), type});
      res.json(new Params(0, {id: user.id, username: user.username, type: user.type}));
    }
  } catch (e) {
    res.json(new Params(1, '网络故障'));
  }
});

router.post('/updateUser', async (req, res)=>{
  const {id, salary, company, job, info, header} = req.body;
  try {
    await User.findByIdAndUpdate(id, {salary, company, job, info,header});
    res.json(new Params(0, '更新成功'));
  } catch (e) {
    res.json(new Params(1, '网络故障'));
  }

});




module.exports = router;