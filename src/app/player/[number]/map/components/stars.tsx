"use client";
import useWindowDimensions from "@/app/initialstats/round/hooks/useWindowDimension";
import { useMemo } from "react";

const Stars = () => {
  const { width, height } = useWindowDimensions();
  console.log(width, height);

  const numStars = 300;
  const positions = useMemo(() => {
    return Array(numStars).fill(1).map(() => {
      console.log('width', width)
      console.log('height', height)
      return {
        x: Math.random() * (2 * width) - 0.5 * width,
        y: Math.random() * (2 * height) - 0.5 * height,
        radius: Math.random() * 7,
      };
    });
  }, [width, height]);

  return (
    <g
      x="0"
      y="0"
      fill="white"
      stroke="none"
      preserveAspectRatio="none"
      filter="blur(1px) drop-shadow(2px 4px 10px white)"
      style={{ width: "100vw", height: "100vh" }}
    >
      {positions.map((star, index) => {
        return <circle key={index} cx={star.x} cy={star.y} r={star.radius} />;
      })}
    </g>
  );
};

export default Stars;
