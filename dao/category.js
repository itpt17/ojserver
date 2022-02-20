const connect = require('./util');

const DanhMuc = async (cb)=>{
    let sql =  `SELECT * FROM DanhMuc`;
    await connect.query(sql,(err,res)=>{
        cb(err,res);
    })
}

const MotDanhMuc = async (ID,cb)=>{
    let sql =  `SELECT * FROM DanhMuc WHERE ID='${ID}'`;
    await connect.query(sql,(err,res)=>{
        cb(err,res);
    })
}

module.exports = {
    DanhMuc,
    MotDanhMuc
}