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

module.exports = {
    DangNhap
}