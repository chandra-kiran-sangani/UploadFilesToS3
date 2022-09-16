const { S3 } = require('aws-sdk');
const multer = require('multer');


exports.s3FileUpload = async (file) => {
    const s3 = new S3();


    const storage = multer.memoryStorage();
    const fileFilter = (req, file, cb) => {
        const fileType = file.mimetype;
        const fileExtension = fileType.split("/")[0];
        if(fileExtension === "image/png" || fileExtension === "image/jpg" || fileExtension === "image/jpeg" || fileExtension === "pdf")
        {
            cb(null, true);
        } else {
            cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false);
        }
    };


    const upload = multer({
        storage,
        fileFilter,
        limits: { fileSize: 1024 * 1024 * 10, files: 3},
    });

    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key : `fileUploads/${file.originalname}`,
        Body: file.buffer
    };
    const result = await s3.upload(params).promise();
    return {
        upload,
        result
    }
}