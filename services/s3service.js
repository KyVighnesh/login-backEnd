const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');


const s3 = new AWS.S3({
    accessKeyId: "AKIAWJXUR4N6PIFDLRPB",
    secretAccessKey: "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"
})

const fileUploadS3=(file)=>{

    const fileType=file.originalname.split(".")[1];

    const params = {
        Bucket: "fileuploadassignmentky",
        Key: `${uuidv4()}.${fileType}`,
        Body: file.buffer
    }



    return new Promise((res,rej)=>{

        s3.upload(params,(err,result)=>{

            if(err){
                rej(err);
            }

           res(result)
    
        })

    })


  

}

module.exports={
    fileUploadS3
}