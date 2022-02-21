const problemDAO = require('../dao/problem');

const VanDe = async (req,res)=>{
    await problemDAO.VanDe((error,result)=>{
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).json({prolems:result});
        }
    })
}

const VanDeID = async (req,res)=>{
    let ID = req.params.id;
    await problemDAO.VanDeID(ID,(error,result)=>{
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).json({prolem:result});
        }
    })
}

module.exports = {
    VanDe,
    VanDeID
}