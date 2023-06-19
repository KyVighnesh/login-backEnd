
const User=require("./schemas/User");



const createUser = (userinfo)=> {

  return new Promise((res,rej)=>{


  User.findOne({username:userinfo.username}).then(data=> {

    if(data) {
      rej("user already exists")
    }

    else {
      const user = new User(userinfo)


      res(user.save())
    }


    
  })
  })
}

const getUserByUsername=(data)=>{

    return User.findOne({username:data});

}

const getFilesFromDb = () => {
  return User.find({username:process.env.USERNAME})
}

//const uploadFile = (cap,file,id) => {

  //return new Promise((rej,res)=> {
  
    
    //let newImage = new Image({
    //caption:cap,
    //filename:file,
    //fileId:id
  //})


  //res(newImage.save())

  //})
//}

module.exports = {
  createUser,
  getUserByUsername,
  getFilesFromDb
}