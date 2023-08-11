
const User=require("../db/schemas/User");

const {fileUploadS3}=require("../services/s3service");


let imageLocation = []



const s3fileUpload=(req,res,next)=>{


   console.log(req);


    fileUploadS3(req.file).then(data=>{

      imageLocation.push({link:data.Location})



   res.json({
    message:"Success",
    data
   })

      
    })
   // console.log(req.files);


}

const mongoController = (req,res,next) => {

  

  User.updateOne({username:process.env.USERNAME},{$push:{"file":imageLocation[0]}}).then(test=> {

    imageLocation = []
    res.json({
    message:"updated"
  })
  }).catch(err=> {
    console.log(err)
  })

  
}

const deleteFile =  (req,res) => {
 User.updateOne({ username:process.env.USERNAME}, {
    $pull: {
        file: {link: req.body.delete},
    },
}).then(data=> {
   console.log(data)

        res.json({
   message:"success",
          source:data
        })
});

   console.log(req.body.delete)

  }

module.exports = {
  s3fileUpload,
  mongoController,
  deleteFile
}
