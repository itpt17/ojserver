const connect = require('./util');

const VanDe = async (cb)=>{
    await connect.query("SELECT * FROM VanDe",(err,res)=>{
        cb(err,res);
    })
}

const VanDeID =  async (ID,cb)=>{
    await connect.query(`SELECT * FROM VanDe WHERE ID='${ID}'`,(err,res)=>{
        cb(err,res);
    })
}

module.exports = {
    VanDe,
    VanDeID
}