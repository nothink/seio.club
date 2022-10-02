import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import express from "express";
import cors from "cors";
import { Readable } from "stream";

import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import * as functions from "firebase-functions/v1";

initializeApp();

const corsHandler = cors({ origin: true });
const logger = functions.logger;

// utils
const getDqx9mbrpz1jhx = async (url: URL) => {
  const bucket = getStorage().bucket("dqx9mbrpz1jhx");
  const filename = url.pathname.startsWith("/")
    ? url.pathname.substring(1)
    : url.pathname;
  if (!filename) {
    logger.warn("A file name must be specified. : ", filename);
    return;
  }
  const file = bucket.file(filename);
  const [exists] = await file.exists();
  if (exists) {
    return;
  }

  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      responseType: "stream",
      timeout: 600000,
      maxContentLength: 1073741824,
    };
    const res: AxiosResponse<Readable> = await axios.get(url.href, options);
    res.data
      .pipe(file.createWriteStream())
      .on("error", (err) => {
        logger.error("stream error");
        logger.error(err.message);
      })
      .on("finish", () => {
        logger.info("created:", file.cloudStorageURI.href);
      });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      logger.error(e.message);
      logger.error(
        `Error! HTTP Status: ${e.response.status} ${e.response.statusText}`
      );
    } else {
      logger.error("Unknown error: ", e);
    }
  }
};

// ---------------------------------------------------------------------------
// https
// ---------------------------------------------------------------------------
const dqx9mbrpz1jhxHandler = (
  req: functions.https.Request,
  res: express.Response
) => {
  corsHandler(req, res, async () => {
    if (req.method === "POST") {
      const urls = req.body.urls as string[];
      for (const elem of urls) {
        // Iterate files in urls.
        const url = new URL(elem);
        await getDqx9mbrpz1jhx(url);
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
  logger.info("link: ", object.mediaLink);
  logger.info("name: ", object.name);
};

//
// export
//
export const dqx9mbrpz1jhx = functions
  .region("asia-northeast1")
  .runWith({ memory: "256MB", timeoutSeconds: 540 })
  .https.onRequest(dqx9mbrpz1jhxHandler);
export const notify = functions
  .region("asia-northeast1")
  .runWith({ memory: "256MB", timeoutSeconds: 540 })
  .storage.bucket("dqx9mbrpz1jhx")
  .object()
  .onFinalize(notifyHandler);
