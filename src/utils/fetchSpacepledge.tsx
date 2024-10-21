// src/app/utils/fetchSpacePledge.ts
import { formatSpacePledged } from "@/utils/number";
import { spacePledge } from "@autonomys/auto-consensus";
import { activate } from "@autonomys/auto-utils";

const fetchSpacePledge = async () => {
  try {
    const api = await activate({ networkId: "gemini-3h" });
    const total = await spacePledge(api);
    await api.disconnect();
    return formatSpacePledged(total);
  } catch (error) {
    console.error("Error fetching space pledge:", error);
    throw new Error("Error fetching data");
  }
};

export default fetchSpacePledge;
