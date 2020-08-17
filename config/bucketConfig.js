var firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: process.env.FIRESTORE_URI,
  storageBucket: process.env.BUCKET_URI,
});

var bucket = firebaseAdmin.storage().bucket();

module.exports = bucket;
