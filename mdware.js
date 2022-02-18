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

const RegisterValidate = (req,res,next)=>{
    let tendangnhap = req.body.txtTaiKhoan;
    let matkhau1 = req.body.txtMatKhau;
    if(!tendangnhap.match(/[a-zA-Z0-9]{6,20}/)){
        res.status(200).json({register:false,messageCode:-1,message:'Tên đăng nhập chỉ gồm chữ và số (6-20 kí tự)'});
    }else{
        if(matkhau1.length < 8) 
            res.status(200).json({register:false,messageCode:-1,message:'Mật khẩu tối thiểu 8 kí tự'});
        else if(matkhau1.includes(' ')){
            res.status(200).json({register:false,messageCode:-1,message:'Mật khẩu không chứa dấu cách'});
        }else next();
    }
}

module.exports = {
    LoginValidate,
    RegisterValidate
}