const categoryDAO = require('../dao/category');

const DanhMuc = async (req,res)=>{
    await categoryDAO.DanhMuc((error,result)=>{
        if(error) res.status(500).json({error: 'server error'});
        else{
            res.status(200).json({category: result});
        }
    });
}

module.exports = {
    DanhMuc
}