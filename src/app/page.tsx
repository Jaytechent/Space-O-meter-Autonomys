"use client";

import { useEffect, useState } from "react";
import Footer from "../app/Footer";

const MAX_SPACE = 20;

const calculatePercentage = (value: number) => {
  return (value / MAX_SPACE) * 100;
};

export default function Home() {
  const [spacePledge, setSpacePledge] = useState("Loading...");
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  const updateSpacePledge = async () => {
    setLoading(true); // Set loading to true before fetch
    try {
      const response = await fetch("/api/fetchSpacePledge");
      if (response.ok) {
        const data = await response.json();
        const pledgeValue = parseFloat(data.pledge.replace(/,/g, ""));
        const newPercentage = calculatePercentage(pledgeValue);
        setSpacePledge(data.pledge);
        setPercentage(newPercentage);
        console.log(data);
      } else {
        setSpacePledge("Error fetching pledge");
      }
    } catch (error) {
      setSpacePledge("Error fetching pledge");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    const fetchInitialData = () => {
      updateSpacePledge();
    };

    const timeoutId = setTimeout(fetchInitialData, 1000); // delay before first fetch

    const intervalId = setInterval(updateSpacePledge, 600000); // periodic updates

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={`relative bg-cover bg-center text-white py-4 flex flex-col justify-center items-center background-animated`}
      style={{
        backgroundImage: `url('https://thumbs.dreamstime.com/b/futuristic-space-mining-operation-design-background-instagram-facebook-wall-painting-ai-generated-content-operation-ai-324126118.jpg')`,
        minHeight: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <h1 className="text-4xl font-bold mb-4 text-center z-10">
        Autonomys Gemini 3h Testnet
      </h1>
      <h1 className="text-4xl font-bold mb-4 text-center z-10">
        Space Race Plot O Meter
      </h1>
      <h3 className="text-2xl font-bold mb-4 text-center z-10">
        Current Space Pledge
      </h3>

      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10">
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

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-4xl md:text-6xl">{spacePledge}/20</p>
        </div>
      </div>

      <button
        className={`mt-4 p-2 rounded text-white transition z-10 ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={updateSpacePledge}
        disabled={loading}
      >
        {loading ? "Loading..." : "Refresh"}
      </button>

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
//   const [percentage, setPercentage] = useState(0);

//   const updateSpacePledge = async () => {
//     const response = await fetch("/api/fetchSpacePledge");
//     if (response.ok) {
//       const data = await response.json();
//       const pledgeValue = parseFloat(data.pledge.replace(/,/g, ""));
//       const newPercentage = calculatePercentage(pledgeValue);
//       setSpacePledge(data.pledge);
//       setPercentage(newPercentage);
//       console.log(data);
//     } else {
//       setSpacePledge("Error fetching pledge");
//     }
//   };

//   // useEffect(() => {
//   //   updateSpacePledge();
//   //   const intervalId = setInterval(updateSpacePledge, 100000);
//   //   return () => clearInterval(intervalId);
//   // }, []);

//   return (
//     <div
//       className={`relative bg-cover bg-center text-white py-4 flex flex-col justify-center items-center background-animated`}
//       style={{
//         backgroundImage: `url('https://thumbs.dreamstime.com/b/futuristic-space-mining-operation-design-background-instagram-facebook-wall-painting-ai-generated-content-operation-ai-324126118.jpg')`,
//         minHeight: "100vh",
//       }}
//     >
//       <div className="absolute inset-0 bg-black opacity-30 z-0" />
//       <h1 className="text-4xl font-bold mb-4 text-center z-10">
//         Autonomys Gemini 3h Testnet
//       </h1>
//       <h1 className="text-4xl font-bold mb-4 text-center z-10">
//         Space Race Plot O Meter
//       </h1>
//       <h3 className="text-2xl font-bold mb-4 text-center z-10">
//         Current Space Pledge
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
//           <p className="text-4xl md:text-6xl">{spacePledge}/20</p>
//         </div>
//       </div>

//       <button
//         className="mt-4 p-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition z-10"
//         onClick={updateSpacePledge}
//       >
//         Refresh
//       </button>

//       <Footer />
//     </div>
//   );
// }
