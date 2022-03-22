const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
  region: process.env.REGION,
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_ID,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `interior/${Date.now()}_${file.originalname}`);
    },
  }),
});

let deleteImg = (key) => {
  s3.deleteObject(
    {
      Bucket: process.env.BUCKET_ID,
      Key: key,
    },
    (err, data) => {
      if (err) {
        throw err;
      }
    }
  );
};

export { deleteImg, upload };
