const router = require("express").Router();
const multer = require("multer");
const { v4: uuid } = require("uuid");

const s3 = require("../config/s3");

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

// Upload endpoint to send file to AWS S3 bucket
router.post("/", uploader.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({
        succes: false,
        msg: "Error, could not upload file",
      });
      return;
    }

    //Accept only images
    const types = ["image/png", "image/jpeg"];
    if (!types.includes(req.file.mimetype)) {
      res.status(400).json({
        succes: false,
        msg: "Error, file is not an image. Aceppted types: png, jpg",
      });
      return;
    }

    //determine file extension
    let fileName = req.file.originalname.split(".");
    const fileType = fileName[fileName.length - 1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}.${fileType}`,
      Body: req.file.buffer,
    };

    //Upload file to the S3 storage
    s3.upload(params, (error, data) => {
      if (error) {
        return res.status(500).send(error);
      }

      res.status(200).json({
        succes: true,
        fileName: req.file.originalname,
        fileLocation: data.Location,
        key: data.Key,
      });
    });
  } catch (error) {
    res
      .status(400)
      .json({ succes: false, msg: `Error, could not upload file: ${error}` });
    return;
  }
});
module.exports = router;
