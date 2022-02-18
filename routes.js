const routes = require('express').Router();
const accountCtrl = require('./control/account');
const MiddleWare = require('./mdware');

routes.post("/dangnhap",MiddleWare.LoginValidate,(req,res)=>{
    accountCtrl.DangNhap(req,res);
});

routes.post("/dangky",MiddleWare.RegisterValidate,(req,res)=>{
    accountCtrl.DangKy(req,res);
})

module.exports = routes;