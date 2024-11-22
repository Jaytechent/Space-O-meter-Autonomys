"use client";
import { ApiData, DEFAULT_API_DATA, fetchApiData } from "@/utils/api";
import { NetworkId } from "@autonomys/auto-utils";
import { useCallback, useEffect, useState } from "react";
import Footer from "../app/Footer";

const MAX_SPACE = 10000;
const MAX_SPACEG = 1000;

const calculatePercentage = (value: number, max: number) => (value / max) * 100;

export const Scene = () => {
  const [taurusData, setTaurusData] = useState<ApiData>(DEFAULT_API_DATA);
  const [geminiData, setGeminiData] = useState<ApiData>(DEFAULT_API_DATA);
  const [loading, setLoading] = useState(true);

  // Memoized function to fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [taurus, gemini] = await Promise.all([
        fetchApiData(NetworkId.TAURUS),
        fetchApiData(NetworkId.GEMINI_3H),
      ]);
      console.log("Taurus Data:", taurus);
      console.log("Gemini Data:", gemini);
      // setTaurusData(taurus);
      // setGeminiData(gemini);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 100000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div
      className="relative bg-cover bg-center text-white py-4 flex flex-col justify-center items-center background-animated"
      style={{
        backgroundImage: `url('/images/bg.webp')`,
        minHeight: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <h1 className="text-4xl font-bold mb-4 text-center z-10">
        AUTONOMYS NETWORK DATA OVERVIEW
      </h1>

      {loading ? (
        <div className="text-center z-10">
          <p className="text-xl">Loading data...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full justify-center z-10">
          <NetworkCard
            title="Taurus Network"
            data={taurusData}
            maxSpace={MAX_SPACE}
          />
          <NetworkCard
            title="Gemini 3H Network"
            data={geminiData}
            maxSpace={MAX_SPACEG}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

function NetworkCard({
  title,
  data,
  maxSpace,
}: {
  title: string;
  data: ApiData;
  maxSpace: number;
}) {
  const percentage = calculatePercentage(
    parseFloat(data.spacePledged.replace(/,/g, "")) || 0,
    maxSpace
  );

  return (
    <div className="m-4 p-4 rounded-lg flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      <h3 className="text-2xl font-bold mb-4">Current Space Pledged</h3>
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
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
          <p className="text-4xl">{data.spacePledged}</p>
        </div>
      </div>
      <p className="text-lg">Blockchain Size: {data.blockchainSize}</p>
      <p className="text-lg">Block Height: {data.blockHeight}</p>
    </div>
  );
}
