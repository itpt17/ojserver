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

const TimTaiKhoan = async (token,cb)=>{
    let sql = `SELECT * FROM TaiKhoan WHERE Token='${token}'`;
    await connect.query(sql,(err,res)=>{
        cb(err,res);
    })
}

const DangKy = async (thongtin,cb)=>{
    let tendangnhap = thongtin.tendangnhap;
    let matkhau =  thongtin.matkhau;
    let hovaten = thongtin.hovaten ? thongtin.hovaten : '-';
    let email = thongtin.email ? thongtin.email : '-';
    let sodienthoai = thongtin.sodienthoai ? thongtin.sodienthoai : '-';
    let ngaysinh = thongtin.ngaysinh ? thongtin.ngaysinh : '-';
    matkhau = crypto.createHash("sha256").update(matkhau).digest("hex").toUpperCase();
    let sql =  `SELECT * FROM TaiKhoan WHERE tendangnhap='${tendangnhap}'`;
    await connect.query(sql,async (err,res)=>{
           if(err) cb(err,null);
           else{
               if(res.length <= 0){
                    sql = `INSERT INTO TaiKhoan VALUES('${tendangnhap}','${matkhau}',NULL,'${email}','${sodienthoai}','${hovaten}','${ngaysinh}')`;
                    await connect.query(sql,(err,res)=>{
                        if(err) cb(err,null);
                        else cb(null,true); 
                    });
               }else{
                   cb(null,false);
               }
           }
    })
}

module.exports = {
    DangNhap,
    CapNhatToken,
    DangKy,
    TimTaiKhoan
}