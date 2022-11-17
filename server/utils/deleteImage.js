const fs = require('fs');
const path = require('path')

const deleteFile = (file) =>{
    fs.unlink(file, err =>{
       if(err){
        throw err;
       }
    })
}

module.exports = deleteFile;