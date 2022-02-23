const fs = require('fs');
const path = require('path')

const createFileInfo = (username,problem,content,language,cb)=>{
    let name = username;
    let islang = true;
    if(language === 'js'){
        name += ".js";
    }else islang = false;
    islang?cb(null,{name,content,problem,language}):cb(true,{});
}

const GhiFile = (fileInfo)=>{
    const filePath = path.join(__dirname,path.join("solution",fileInfo.name));
    let systemcode = getIO(path.join(__dirname,path.join("js_system_code",fileInfo.problem + ".txt")));
    let fcontent = systemcode[0] + "\n" + fileInfo.content + "\n" + systemcode[1];
    fs.writeFileSync(filePath,fcontent,"utf-8");
}

const getIO = (filePath)=>{
    let data = fs.readFileSync(filePath,"utf-8");
    data = data.split("#");
    return data;
}

module.exports = {
    GhiFile,
    createFileInfo,
    getIO
}