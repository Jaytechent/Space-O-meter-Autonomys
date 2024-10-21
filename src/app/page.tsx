import { formatSpacePledged } from "@/utils/number";
import { spacePledge } from "@autonomys/auto-consensus";
import { activate } from "@autonomys/auto-utils";
import Footer from "../app/Footer";

async function fetchSpacePledge() {
  try {
    const api = await activate({ networkId: "gemini-3h" });
    const total = await spacePledge(api);
    await api.disconnect();
    return formatSpacePledged(total);
  } catch (error) {
    console.error("Error fetching space pledge:", error);
    return "Error fetching data";
  }
}

const MAX_SPACE = 200;

const calculatePercentage = (value: number) => {
  return (value / MAX_SPACE) * 100;
};

export default async function Home() {
  const spacePledge = await fetchSpacePledge();
  const pledgeValue = parseFloat(spacePledge.replace(/,/g, "")); // Convert formatted string to number
  const percentage = calculatePercentage(pledgeValue);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-purple-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-slate-500 opacity-20 animate-pulse" />
        <h1 className="text-4xl font-bold mb-4">
          Autonomys Gemini 3h Testnet{" "}
        </h1>
        <h1 className="text-4xl font-bold mb-4">Space Race Plot O Meter </h1>
        <h3 className="text-4xl font-bold mb-4">Current Space Pledge</h3>

        <div className="relative w-64 h-64">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              className="text-gray-600"
              fill="none"
              strokeWidth="3"
              stroke="currentColor"
              d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
            />
            <path
              className="text-green-500"
              fill="none"
              strokeWidth="3"
              stroke="currentColor"
              strokeDasharray={`${percentage} ${100 - percentage}`}
              d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-6xl">{spacePledge}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
