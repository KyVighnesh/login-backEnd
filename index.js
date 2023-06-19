const express = require ("express")
const app  = express();
const connect = require("./db/mongodb")
const multer = require('multer')
const cors = require("cors")
const mongoose = require('mongoose');
const path=require("path");
const {signup,signin,getFiles} = require("./controllers/authcontroller")
const {fileUploadS3} = require("./services/s3service")
const {s3fileUpload,mongoController,deleteFile} = require("./controllers/fileUploadController")
const {encryptPassword} = require("./middlewares/middleware")
const URL = "mongodb+srv://vighneshwars10:TM5Bx50g1W3bDXcw@cluster0.izmc5nk.mongodb.net/"



app.use(express.json());
app.use(cors())


const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('file')











app.post("/signup",encryptPassword,signup)

app.post("/signin",signin)

app.post("/upload",upload,s3fileUpload)

app.put("/mongoUpdate",mongoController)

app.get("/files",getFiles)

app.put("/delete",deleteFile)





connect(URL).then(data => {
  console.log("database connected")
}).catch(err=> {
  console.log(err)
})






app.listen(8080,()=> {
  console.log("server connected at 8090")
})

