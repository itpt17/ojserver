const routes = require('express').Router();
const accountCtrl = require('./control/account');

routes.post("/dangnhap",(req,res)=>{
    accountCtrl.DangNhap(req,res);
});

module.exports = routes;