import React from "react";
import AdSense from "./components/AdSense";
import ImageToPdf from "./components/ImageToPdf";
import './index.css';

function App() {
  return (
    <>
     <div className="bg-slate-300 flex justify-center items-center min-h-screen bg-gray-100">
        <ImageToPdf />
      </div>
      <AdSense />
    </>
  )
}

export default App;
