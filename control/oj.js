const file = require('../judge_system/file');
const oj = require('../judge_system/judge');
const accountDAO = require('../dao/account');

const ChamDiem = async (req,res)=>{
    let token = req.get("Authorization");
    let problem = req.body.VanDe;
    let code = req.body.Code;
    let lang = req.body.Language;
    token = token.split(" ")[1];
    await accountDAO.TimTaiKhoan(token,async (error,result)=>{
        if(error) res.sendStatus(500);
        else{
            let username = result[0].TenDangNhap;
            await oj.Test(problem,async(test)=>{
                await file.createFileInfo(username,problem,code,lang,async (error,result)=>{
                    if(!error){
                        file.GhiFile(result);
                        let final = [];
                        await oj.Run(result,problem,(error,input,output,target,status)=>{
                            final.push({error,input,output,target,status});
                            if(final.length == test){
                                res.status(200).json({result:final});
                            }
                        });
                    }else{
                        res.sendStatus(500);
                    }
                })
            });
        }
    });
}
module.exports = {
    ChamDiem
}