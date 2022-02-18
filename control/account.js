require('dotenv').config();
const accountDAO = require('../dao/account');
const jwt = require('jsonwebtoken');

const DangNhap = async (req,res)=>{
    let tendangnhap = req.body.txtTaiKhoan;
    let matkhau = req.body.txtMatKhau;
    await accountDAO.DangNhap(tendangnhap,matkhau,async (error,result)=>{
        if(error) res.status(500).json({error:'server error'});
        else{
            if(result){
                let token = jwt.sign({tendangnhap},process.env.SECRETSTR,{expiresIn:'1d'});
                await accountDAO.CapNhatToken(token,tendangnhap,(error,result)=>{
                    if(error) res.status(500).json({error:'server error'});
                    else{
                        res.status(200).json({
                            login:true,
                            messageCode:1,
                            message:'Đã đăng nhập',
                            token,
                            tokenExpires: '1d'
                        });
                    }
                })
            }else{
                res.status(200).json({
                    login:false,
                    messageCode:0,
                    message:'Sai thông tin đăng nhập !',
                    token:null,
                    tokenExpires:null
                });
            }
        }
    })
}

const DangKy = async (req,res)=>{
    let tendangnhap = req.body.txtTaiKhoan;
    let matkhau = req.body.txtMatKhau;
    let ngaysinh,email,sodienthoai,hovaten;
    try{
        ngaysinh = req.body.sltNgaySinh;
        email = req.body.txtEmail;
        sodienthoai = req.body.txtSdt;
        hovaten = req.body.txtHovaTen;
    }catch{}
    let thongtin = {
        tendangnhap,
        matkhau,
        ngaysinh,
        email,
        sodienthoai,
        hovaten
    }
    await accountDAO.DangKy(thongtin,(error,result)=>{
        if(error){
            res.status(500).json({error:'server error'});
        }else{
            if(result){
                res.status(200).json({
                    register: true,
                    messageCode: 1,
                    message: 'Đã đăng ký'
                })
            }else{
                res.status(200).json({
                    register: false,
                    messageCode: 0,
                    message: 'Tài khoản đã tồn tại'
                })
            }
        }
    })
}

module.exports = {
    DangNhap,
    DangKy
}