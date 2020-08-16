import * as React from "react";

export function useWindowResize() {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handler = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return dimensions;
}
