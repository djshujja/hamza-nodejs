const userModel = require("../models/usermodel");
const allUsers = (pageNo = 0)=>{
    return new Promise((resolve,reject)=>{
        userModel.find({"rights": { "$ne": 'admin' }}).skip(pageNo * 20).limit(20).then(data=>{
              resolve(data);
        }).catch(err=>{
               reject(err);
        })
    })
};

const userSelectionPageNo = (pageNo)=>{
    return new Promise((resolve,reject)=>{
        userModel.find({}).limit(1).then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        })
    })
}

const makeAdmin = (id)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOneAndUpdate({
            _id:id
        },{
            read:true,
            write:true,
            edit:true,
            rights:"admin",
            delete:true
        }).then(()=>{
            resolve("You have made a new admin successfully");
        }).catch(err=>{
            reject(err);
        })
    });
}


const makeManager = (id)=>{

    return new Promise((resolve,reject)=>{
        userModel.findOneAndUpdate({
            _id:id
        },{
            read:true,
            write:true,
            rights:"manager",
            edit:true
        }).then(()=>{
            resolve("You have made a new manager successfully");
        }).catch(err=>{
            reject(err);
        })
    });
}

const deleteUser = (id)=>{

    return new Promise((resolve,reject)=>{
        userModel.deleteOne({
            _id:id
        }).then(()=>{
            resolve("User deleted successfully");
        }).catch(err=>{
            reject(err);
        })
    });
}


module.exports = {
    allUsers,
    makeAdmin,
    makeManager,
    deleteUser

}