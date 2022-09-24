import { useEffect, useState } from "react";
import {
  Dqx9mbrpz1jhx,
  getDqx9mbrpz1jhx,
} from "../utils/firestore/Dqx9mbrpz1jhx";

export type UseDqx9mbrpz1jhxOutput = {
  isLoading: boolean;
  items: Dqx9mbrpz1jhx[];
};

const DEFAULT_OUTPUT: UseDqx9mbrpz1jhxOutput = {
  isLoading: true,
  items: [],
};

export function useDqx9mbrpz1jhx(): UseDqx9mbrpz1jhxOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);

  useEffect(() => {
    void (async () => {
      const items = await getDqx9mbrpz1jhx();
      setOutput({ isLoading: false, items });
    })();
  }, []);

  return output;
}
