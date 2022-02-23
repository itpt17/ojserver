const routes = require('express').Router();
const accountCtrl = require('./control/account');
const categoryCtrl= require('./control/category');
const problemCtrl = require('./control/problem');
const judgeCtrl = require('./control/oj');
const MiddleWare = require('./mdware');

routes.post("/dangnhap",MiddleWare.LoginValidate,(req,res)=>{
    accountCtrl.DangNhap(req,res);
});

routes.post("/dangky",MiddleWare.RegisterValidate,(req,res)=>{
    accountCtrl.DangKy(req,res);
})

routes.get("/danhmuc",(req,res)=>{
    categoryCtrl.DanhMuc(req,res);
})

routes.get("/danhmuc/:id",(req,res)=>{
    categoryCtrl.MotDanhMuc(req,res);
})

routes.get("/vande",(req,res)=>{
    problemCtrl.VanDe(req,res);
});

routes.get("/vande/:id",(req,res)=>{
    problemCtrl.VanDeID(req,res);
})

routes.post("/oj",MiddleWare.checkToken,(req,res)=>{
    judgeCtrl.ChamDiem(req,res);
})

module.exports = routes;