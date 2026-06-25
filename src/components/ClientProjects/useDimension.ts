import { useEffect, useState } from "react";

interface Dimension {
  width: number;
  height: number;
}

function getInitialDimension(): Dimension {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function useDimension(): Dimension {
  const [dimension, setDimension] = useState<Dimension>(getInitialDimension);

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimension;
}
