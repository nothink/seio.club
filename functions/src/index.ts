import axios, { AxiosResponse } from "axios";
import express from "express";
import { Readable } from "stream";

import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { https, logger, storage } from "firebase-functions/v2";

initializeApp();

// ---------------------------------------------------------------------------
// https
// ---------------------------------------------------------------------------

// Take the body json passed to this HTTP endpoint and insert it into
// Firestore under the path /dqx9mbrpz1jhx/:documentId/urls
export const dqx9mbrpz1jhx = https.onRequest(
  { cors: true, timeoutSeconds: 600 },
  (req: https.Request, res: express.Response) => {
    if (req.method === "POST") {
      const bucket = getStorage().bucket("dqx9mbrpz1jhx");
      const urls = req.body.urls as string[];
      for (const elem of urls) {
        // Iterate files in urls.
        const url = new URL(elem);
        const filename = url.pathname.substring(1);
        const file = bucket.file(filename);
        file.exists().then(([exists]) => {
          if (!exists) {
            axios
              .get(url.href, { responseType: "stream" })
              .then((res: AxiosResponse<Readable>) => {
                res.data
                  .pipe(file.createWriteStream())
                  .on("error", (err) => {
                    logger.log(err);
                  })
                  .on("finish", () => {
                    logger.log(file.cloudStorageURI);
                  });
              });
          }
        });
      }
      res.sendStatus(201);
    } else {
      res.sendStatus(405);
    }
  }
);

export const notify = storage.onObjectFinalized(
  { bucket: "dqx9mbrpz1jhx" },
  (event) => {
    logger.log(event.bucket);
  }
);
