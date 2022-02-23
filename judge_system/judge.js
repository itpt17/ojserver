const pc = require('child_process');
const fs = require('fs');
const path = require('path');
const { getIO } = require('./file');

const Compile = async (fileInfo)=>{
    if(fileInfo.language=='js'){}
}

const Test = async (problem,cb)=>{
    const inputPath = path.join(__dirname,path.join("input",problem + ".txt"));
    const inps = getIO(inputPath);
    cb(inps.length);
}

const getName = (code)=>{
    let funcName = code.split("function ")[1];
    funcName = funcName.split("(")[0];
    return funcName;
}

const Run = async (fileInfo,problem,cb)=>{
    const filePath = path.join(__dirname,path.join("solution",fileInfo.name));
    const inputPath = path.join(__dirname,path.join("input",problem + ".txt"));
    const outputPath = path.join(__dirname,path.join("output",problem + ".txt"));
    const testPath = path.join(__dirname,path.join("tester",fileInfo.name));
    const sysPath = path.join(__dirname,path.join("js_system_code",problem + ".txt"));
    const inps = getIO(inputPath);
    const oups = getIO(outputPath);
    const syscode = getIO(sysPath);
    const __function = getName(syscode[0]);
    for(let i = 0; i < inps.length; i++){
        let __inp = inps[i].split(" ").join(",");
        let __ctn = __function + "(" + __inp + ")";
        let codectn = fs.readFileSync(filePath,"utf-8");
        codectn += "\n" + __ctn;
        fs.writeFileSync(testPath,codectn,"utf-8");
        let Runner = pc.spawnSync("node",[testPath]);
        let error = `${Runner.stderr}`; error = error.trim();
        let input = inps[i].trim();
        let output = `${Runner.stdout}`; output = output.trim();
        let target = oups[i].trim();
        let status = error ? -1 : output === target ? 1 : 0;
        cb(error,input,output,target,status);
    }
}

module.exports = {
    Compile,
    Run,
    Test
}