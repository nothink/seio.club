// The Cloud Functions for Firebase SDK to create Cloud Functions
// and set up triggers.
const axios = require("axios").default;
const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");

admin.initializeApp();

const RES_COL = "dqx9mbrpz1jhx";
const REGION = "asia-northeast1";

// Take the body json passed to this HTTP endpoint and insert it into
// Firestore under the path /dqx9mbrpz1jhx/:documentId/urls
exports.dqx9mbrpz1jhx = functions.region(REGION).https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "POST") {
      const urls = req.body.urls;
      // Push the new message into Firestore using the Firebase Admin SDK.
      admin
        .firestore()
        .collection(RES_COL)
        .add({ urls: urls })
        .then((result) => {
          functions.logger.log("added dqx9mbrpz1jhx ID: ", result.id);
        });
      res.send(201);
    } else {
      res.send(405);
    }
  });
});

// Listens for new messages added to /dqx9mbrpz1jhx/:documentId
exports.fetch = functions
  .region(REGION)
  .runWith({
    timeoutSeconds: 480,
  })
  .firestore.document("/" + RES_COL + "/{documentId}")
  .onCreate((snap) => {
    // Grab the current value of what was written to Firestore.
    const urls = snap.get("urls");

    const bucket = getStorage().bucket(RES_COL);

    for (const elem of urls) {
      // Iterate files in urls.
      const url = new URL(elem);
      const filename = url.pathname.substring(1);
      const file = bucket.file(filename);
      file.exists().then(([exists]) => {
        if (!exists) {
          axios.get(url.href, { responseType: "stream" }).then((res) => {
            res.data
              .pipe(file.createWriteStream())
              .on("error", (err) => {
                functions.logger.log(err);
              })
              .on("finish", () => {
                functions.logger.log(filename);
              });
          });
        }
      });
    }

    // Delete this document.
    return admin.firestore().collection(RES_COL).doc(snap.id).delete();
  });
