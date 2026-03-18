import { useEffect, useState } from "react";

function LoadingView() {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgressWidth("88%");
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#0C0C0C]">
      <div
        className="fixed top-0 left-0 h-0.5 bg-[#FF4500] transition-[width] duration-6000 ease-linear"
        style={{ width: progressWidth }}
      />
    </div>
  );
}

export default LoadingView;
