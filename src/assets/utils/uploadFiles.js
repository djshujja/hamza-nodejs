const randomfilename = require("./randomfilename");
const path = require("path");
const fs = require("fs");

const uploadProductFile = (files,path,cb)=>{
  if(files){
   const file = files.files;
 
   const filename = randomfilename(file.name);
    file.mv(path+filename,async (err)=>{
        if(err)
           console.log("error occur due to image transfer error ",err);
         
        cb("/src/assets/images/uploaded/"+filename);
           
    })
}
}

const uploadMultipleFiles = (files,path,cb)=>{
    if(files){


        let all_images_path = "";
        let imagePath = ""; // here it represent single Image
        let i = 0;
        for(let key in files){
            const file = files[key];
            const filename = randomfilename(file.name);
            file.mv(path+filename,async (err)=>{if(err)console.log("error occur due to image transfer error ",err);

            });
            if(i === 0){
                imagePath += "/src/assets/images/uploaded/"+filename;
            }
           all_images_path += "/src/assets/images/uploaded/"+filename+",";

            i++;
        }

        cb(imagePath,all_images_path);



    }

}

const deleteMultipleFiles = (multipleFile)=>{
    multipleFile.split(",").map(file=>{
        file ? fs.unlinkSync(path.join(__dirname+"/../../.."+file)) : "";
    });


}


module.exports ={ uploadProductFile,uploadMultipleFiles,deleteMultipleFiles};

