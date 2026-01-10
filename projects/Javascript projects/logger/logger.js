const fs= require("fs")
const path=require("path");

const MAX_FILE_SIZE= 1*1024*1024;
const LOG_FILE_NAME='app.log'

class Logger{
    constructor(filename){
        this.filename=path.join(__dirname,filename);
        this.backupFilename=path.join(__dirname,'app-backup.log');

        this.stream = null;
        this.currentFileSize=0;

        //Initialize logic 
        this.init();

    }
    init(){
        if(fs.existsSync(this.filename)){
            const stats = fs.statSync(this.filename);
            this.currentFileSize=stats.size;
        }
        this.initStream()
    }

    initStream(){
        this.stream =fs.createWriteStream(this.filename,{flags:"a"});
        console.log(`[System] Stream opened . Current size:"${this.currentFileSize}bytes`)
    }
    formatMessage(level,message){
        const timestamp = new Date().toISOString();
        return`[${timestamp}][${level}]:${message}\n;`
    }

    log(leve,message){
        //1.Prepare the string
        const logEntry=this.formatMessage(level,message);
        const entrySize = Buffer.byteLength(logEntry,'utf-8')

        //2. Check if this new line will break the limi
        if (this.currentFileSize + entrySize>MAX_FILE_SIZE){
            this.rotateLog();
        }
        //3.Write to stream(non-blocking)
        if(this.stream.writeable){
            this.stream.write(logEntry);
            this.currentFileSize += entrySize ;
        }

    }
}