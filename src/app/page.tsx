"use client";

import { useEffect, useState } from "react";
import Footer from "../app/Footer";

const MAX_SPACE = 20;

const calculatePercentage = (value: number) => {
  return (value / MAX_SPACE) * 100;
};

export default function Home() {
  const [spacePledgeTaurus, setSpacePledgeTaurus] = useState("Loading...");
  const [blockchainSizeTaurus, setBlockchainSizeTaurus] = useState(0);
  const [blockHeightTaurus, setBlockHeightTaurus] = useState(0);
  const [percentageTaurus, setPercentageTaurus] = useState(0);

  const [spacePledgeGemini, setSpacePledgeGemini] = useState("Loading...");
  const [blockchainSizeGemini, setBlockchainSizeGemini] = useState(0);
  const [blockHeightGemini, setBlockHeightGemini] = useState(0);
  const [percentageGemini, setPercentageGemini] = useState(0);

  const [loading, setLoading] = useState(false); // Loading state

  const fetchSpacePledgeTaurus = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchSpacePledge");
      if (response.ok) {
        const data = await response.json();
        const pledgeValue = parseFloat(data.spacePledged.replace(/,/g, ""));
        const newPercentage = calculatePercentage(pledgeValue);
        setSpacePledgeTaurus(data.spacePledged);
        setBlockchainSizeTaurus(data.blockchainSize);
        setBlockHeightTaurus(data.blockHeight);
        setPercentageTaurus(newPercentage);
      } else {
        setSpacePledgeTaurus("Error fetching pledge");
      }
    } catch (error) {
      setSpacePledgeTaurus("Error fetching pledge");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpacePledgeGemini = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gemini-3h");
      if (response.ok) {
        const data = await response.json();
        const pledgeValue = parseFloat(data.spacePledged.replace(/,/g, ""));
        const newPercentage = calculatePercentage(pledgeValue);
        setSpacePledgeGemini(data.spacePledged);
        setBlockchainSizeGemini(data.blockchainSize);
        setBlockHeightGemini(data.blockHeight);
        setPercentageGemini(newPercentage);
      } else {
        setSpacePledgeGemini("Error fetching pledge");
      }
    } catch (error) {
      setSpacePledgeGemini("Error fetching pledge");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpacePledgeTaurus();
    fetchSpacePledgeGemini();
  }, []);

  return (
    <div
      className={`relative bg-cover bg-center text-white py-4 flex flex-col justify-center items-center background-animated`}
      style={{
        backgroundImage: `url('https://files.oaiusercontent.com/file-PsHng6BFYXwAGqOVzZqghO7d?se=2024-10-30T05%3A29%3A45Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D318f2a4f-3e70-4cb5-8a20-97a6f4b96c14.webp&sig=2K06/0FTbAPnwCmVicB/m2yIDWCd%2BSSbqRP90NBGMN4%3D')`,

        minHeight: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <h1 className="text-4xl font-bold mb-4 text-center z-10">
        AUTONOMYS NETWORK DATA OVERVIEW
      </h1>

      <div className="flex flex-col md:flex-row w-full justify-center z-10">
        {/* Taurus Data */}
        <div className="m-4 p-4 rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-bold">Taurus Network</h2>
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
                strokeDasharray={`${percentageTaurus} ${
                  100 - percentageTaurus
                }`}
                d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-4xl">{spacePledgeTaurus}</p>
            </div>
          </div>
          <p className="text-lg">Blockchain Size: {blockchainSizeTaurus}</p>
          <p className="text-lg">Block Height: {blockHeightTaurus}</p>
        </div>

        {/* Gemini Data */}
        <div className="m-4 p-4 rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-bold">Gemini 3H Network</h2>
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
                strokeDasharray={`${percentageGemini} ${
                  100 - percentageGemini
                }`}
                d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-4xl">{spacePledgeGemini}</p>
            </div>
          </div>
          <p className="text-lg">Blockchain Size: {blockchainSizeGemini}</p>
          <p className="text-lg">Block Height: {blockHeightGemini}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Footer from "../app/Footer";

// const MAX_SPACE = 20;

// const calculatePercentage = (value: number) => {
//   return (value / MAX_SPACE) * 100;
// };

// export default function Home() {
//   const [spacePledge, setSpacePledge] = useState("Loading...");
//   const [blockchainSize, setBlockchainSize] = useState(0);
//   const [blockHeight, setBlockHeight] = useState(0);
//   const [percentage, setPercentage] = useState(0);
//   const [loading, setLoading] = useState(false); // Loading state

//   const updateSpacePledge = async () => {
//     setLoading(true); // Set loading to true before fetch
//     try {
//       const response = await fetch("/api/fetchSpacePledge");
//       if (response.ok) {
//         const data = await response.json();
//         const pledgeValue = parseFloat(data.spacePledged.replace(/,/g, ""));
//         const newPercentage = calculatePercentage(pledgeValue);
//         setSpacePledge(data.spacePledged);
//         setBlockchainSize(data.blockchainSize);
//         setBlockHeight(data.blockHeight);
//         setPercentage(newPercentage);
//         // console.log(data);
//       } else {
//         setSpacePledge("Error fetching pledge");
//       }
//     } catch (error) {
//       setSpacePledge("Error fetching pledge");
//       console.error(error);
//     } finally {
//       setLoading(false); // Set loading to false after fetch
//     }
//   };

//   // Fetch data once on component mount
//   useEffect(() => {
//     updateSpacePledge();
//   }, []);

//   return (
//     <div
//       className={`relative bg-cover bg-center text-white py-4 flex flex-col justify-center items-center background-animated`}
//       style={{
//         backgroundImage: `url('https://files.oaiusercontent.com/file-PsHng6BFYXwAGqOVzZqghO7d?se=2024-10-30T05%3A29%3A45Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D318f2a4f-3e70-4cb5-8a20-97a6f4b96c14.webp&sig=2K06/0FTbAPnwCmVicB/m2yIDWCd%2BSSbqRP90NBGMN4%3D')`,
//         minHeight: "100vh",
//       }}
//     >
//       <div className="absolute inset-0 bg-black opacity-30 z-0" />
//       <h1 className="text-4xl font-bold mb-4 text-center z-10">
//         Autonomys TAURUS Testnet
//       </h1>
//       <h1 className="text-4xl font-bold mb-4 text-center z-10">
//         Space Race Plot O Meter
//       </h1>
//       <h3 className="text-2xl font-bold mb-4 text-center z-10">
//         Current Space Pledged
//       </h3>

//       <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10">
//         <svg viewBox="0 0 36 36" className="w-full h-full">
//           <path
//             className="text-gray-600"
//             fill="none"
//             strokeWidth="3"
//             stroke="currentColor"
//             d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
//           />
//           <path
//             className="text-green-500"
//             fill="none"
//             strokeWidth="3"
//             stroke="currentColor"
//             strokeDasharray={`${percentage} ${100 - percentage}`}
//             d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
//           />
//         </svg>

//         <div className="absolute inset-0 flex items-center justify-center z-10">
//           <p className="text-4xl md:text-6xl">{spacePledge}</p>
//         </div>
//       </div>

//       {/* Display blockSize and blockHeight */}
//       <div className="mt-4 text-center z-10">
//         <p className="text-lg">Blockchain Size: {blockchainSize}</p>
//         <p className="text-lg">Block Height: {blockHeight}</p>
//       </div>

//       <Footer />
//     </div>
//   );
// }
