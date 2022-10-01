import axios, { AxiosResponse } from "axios";
import express from "express";
import cors from "cors";
import { Readable } from "stream";

import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import * as functions from "firebase-functions/v1";

initializeApp();

const corsHandler = cors({ origin: true });
const logger = functions.logger;

// ---------------------------------------------------------------------------
// https
// ---------------------------------------------------------------------------
const dqx9mbrpz1jhxHandler = (
  req: functions.https.Request,
  res: express.Response
) => {
  corsHandler(req, res, () => {
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
                    logger.error(err);
                  })
                  .on("finish", () => {
                    logger.info(file.cloudStorageURI);
                  });
              });
          }
        });
      }
      res.sendStatus(201);
    } else {
      logger.warn(req);
      res.sendStatus(405);
    }
  });
};

// ---------------------------------------------------------------------------
// storage
// ---------------------------------------------------------------------------
const notifyHandler = async (object: functions.storage.ObjectMetadata) => {
  logger.log(object.bucket);
};

//
// export
//
export const dqx9mbrpz1jhx = functions
  .region("asia-northeast1")
  .runWith({ memory: "128MB", timeoutSeconds: 540 })
  .https.onRequest(dqx9mbrpz1jhxHandler);
export const notify = functions.storage
  .bucket("dqx9mbrpz1jhx")
  .object()
  .onFinalize(notifyHandler);
