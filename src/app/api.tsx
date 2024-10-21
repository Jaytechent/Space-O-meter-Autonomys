// pages/api/fetchSpacePledge.ts
import { formatSpacePledged } from "@/utils/number";
import { spacePledge } from "@autonomys/auto-consensus";
import { activate } from "@autonomys/auto-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const api = await activate({ networkId: "gemini-3h" });
    const total = await spacePledge(api);
    await api.disconnect();
    const formattedPledge = formatSpacePledged(total);
    res.status(200).json({ pledge: formattedPledge });
  } catch (error) {
    console.error("Error fetching space pledge:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}

// // src/app/api/route.ts
// import { NextResponse } from "next/server";
// import fetchSpacePledge from "../utils/fetchSpacepledge"; // Adjust import path as needed

// export async function GET() {
//   try {
//     const pledge = await fetchSpacePledge();
//     return NextResponse.json({ pledge });
//   } catch (error) {
//     console.error("Error fetching space pledge:", error);
//     return NextResponse.error();
//   }
// }
