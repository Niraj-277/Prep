const fs=require('fs')

//we will swap the notebook afterjust 50 bytes (very small)
const MAX_SIZE=50;

class SimpleLogger{
    constructor(){
        this.filename='app.log';
        this.backupfile='app-backup.log'

        //step 1. Open the first notebook

        this.stream=fs.createWriteStream("this.filename",{flags:"a"});
        this.currentSize=0;
    }
    log(message){
        const finalMessage=message +'\n';
        const messageSize=finalMessage.length;

        //the check
        if(this.currentSize+messageSize>MAX_SIZE){
            console.log("Notebook full! Swapping...");
            this.rotate();
        }

        //Write the message 
        this.stream.write(finalMessage)

        this.currentSize+=messageSize;
    }
    rotate(){
        this.stream.end()

        //step3 : Rename the old notebook to backup

        try{
            fs.renameSync(this.filename,this.backupfile);
        }catch(err){
            console.log("could not rename(maybe backup already exists")
        }

        //step4 : Open the fresh notebook
        this.stream=fs.createWriteStream(this.filename,{flags:"a"})

        //Reset our size counter to 0
        this.currentSize=0;
    }
}

const logger = new SimpleLogger();

console.log("writing short Logs...");

logger.log("1. hello");
logger.log("2. world");

logger.log("3. This is a very long message that will fill the notebook.");

logger.log("4. I am in the new notebook!");