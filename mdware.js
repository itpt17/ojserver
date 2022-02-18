const LoginValidate = (req,res,next)=>{
    let tendangnhap = req.body.txtTaiKhoan;
    let matkhau = req.body.txtMatKhau;
    if(tendangnhap.length == 0){
        res.status(200).json({
            login:false,
            messageCode:-1,
            message:'Tên đăng nhập không được để trống',
            token:null,
            tokenExpires: null
        });
    }else if(matkhau.length == 0){
        res.status(200).json({
            login:false,
            messageCode:-1,
            message:'Mật khẩu không được để trống',
            token:null,
            tokenExpires: null
        });
    }else{
        next();
    }
}

module.exports = {
    LoginValidate
}