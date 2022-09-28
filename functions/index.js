// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const axios = require("axios").default;
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");

admin.initializeApp();

const RES_COL = "dqx9mbrpz1jhx";

// Take the body json passed to this HTTP endpoint and insert it into
// Firestore under the path /dqx9mbrpz1jhx/:documentId/urls
exports.dqx9mbrpz1jhx = functions.https.onRequest(async (req, res) => {
  if (req.method === "POST") {
    const urls = req.body.urls;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const result = await admin
      .firestore()
      .collection(RES_COL)
      .add({ urls: urls });
    functions.logger.log("added dqx9mbrpz1jhx ID: ", result.id);
    res.send(201);
  } else {
    res.send(405);
  }
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.fetch = functions.firestore
  .document("/" + RES_COL + "/{documentId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const urls = snap.get("urls");

    const bucket = getStorage().bucket(RES_COL);

    for (const elem of urls) {
      const url = new URL(elem);
      const filename = url.pathname;
      const file = bucket.file(filename);
      file.exists().then((exists) => {
        if (!exists) {
          axios.get(url.href, { responseType: "stream" }).then((res) => {
            res.data.pipe;
          });
        }
      });

      functions.logger.log(filename);
    }

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.

    // Delete this document.
    return admin.firestore().collection(RES_COL).doc(snap.id).delete();
  });
