const randomstring = require('randomstring');

const randomfilename = function (filename) {
    overallFileName = "";
    const filenamewithdot = filename.split(".");
    for (i = 0;i < filenamewithdot.length; i+=1){
        if(i === 0){
            filenamewithdot[i]  = filenamewithdot[i]+randomstring.generate(12);
            overallFileName += filenamewithdot[i];
        }else{
            overallFileName += "."+filenamewithdot[i];
        }


    }
    return overallFileName;
};

module.exports = randomfilename;