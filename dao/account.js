const connect = require('./util');
const crypto  = require('crypto');

const DangNhap = async (tendangnhap,matkhau,cb)=>{
    matkhau = crypto.createHash("sha256").update(matkhau).digest("hex");
    let sql =  `SELECT * FROM TaiKhoan WHERE TenDangNhap='${tendangnhap}' AND MatKhau='${matkhau}'`;
    await connect.query(sql,(err,res)=>{
        if(err) cb(err,null);
        else{
            res.length > 0 ? cb(null,true) : cb(null,false);
        }
    });
}

const CapNhatToken = async (token,tendangnhap,cb)=>{
    let sql = `UPDATE TaiKhoan SET Token='${token}' WHERE TenDangNhap='${tendangnhap}'`;
    await connect.query(sql,(err,res)=>{
        cb(err,res);
    }) 
}

module.exports = {
    DangNhap,
    CapNhatToken
}