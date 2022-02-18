const routes = require('express').Router();
const accountCtrl = require('./control/account');
const MiddleWare = require('./mdware');

routes.post("/dangnhap",MiddleWare.LoginValidate,(req,res)=>{
    accountCtrl.DangNhap(req,res);
});

module.exports = routes;