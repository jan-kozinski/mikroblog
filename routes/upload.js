const router = require("express").Router();
const multer = require("multer");
const bucket = require("../config/bucketConfig");

//TEST file upload api

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

// Upload endpoint to send file to Firebase storage bucket
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

    // Create new blob in the bucket referencing the file
    const blob = bucket.file(req.file.originalname);

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => next(err));

    blobWriter.on("finish", () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      // Return the file name and its public URL
      res.status(200).json({
        succes: true,
        fileName: req.file.originalname,
        fileLocation: publicUrl,
      });
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  } catch (error) {
    res
      .status(400)
      .json({ succes: false, msg: `Error, could not upload file: ${error}` });
    return;
  }
});
module.exports = router;
