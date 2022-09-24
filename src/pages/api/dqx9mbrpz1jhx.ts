// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//
//  λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import {
  Dqx9mbrpz1jhx,
  getDqx9mbrpz1jhx,
} from "@/utils/firestore/Dqx9mbrpz1jhx";

const dqx9mbrpz1jhxHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Dqx9mbrpz1jhx>
) => {
  const result = await getDqx9mbrpz1jhx();
  const first = result[0];
  return res.status(200).json({ id: "John Doe", urls: first.urls });
};

export default dqx9mbrpz1jhxHandler;
