// TODO: Firebase SDK can't resolve types
import {
  collection,
  getDocs,
} from "firebase/firestore/lite"; /* eslint import/named: 0 */

import { firestore } from "../firebase";

export type Dqx9mbrpz1jhx = {
  /**
   * fetched "dqx9mbrpz1jhx.cloudfront.net" urls
   * */
  id: string;
  urls: string[];
};

export async function getDqx9mbrpz1jhx(): Promise<Dqx9mbrpz1jhx[]> {
  const items = new Array<Dqx9mbrpz1jhx>();
  const snapshot = await getDocs(collection(firestore, "/dqx9mbrpz1jhx"));

  snapshot.forEach((doc) => {
    const book = doc.data() as Dqx9mbrpz1jhx;
    items.push({ ...book, id: doc.id });
  });

  return items;
}
