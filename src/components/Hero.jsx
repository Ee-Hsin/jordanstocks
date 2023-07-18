//import { useState } from "react";
import background from "../img/MalaysiaRainforest.jpg"

export const Hero = () => {
  return (
    <div
      className="absolute top-0 z-0 min-w-full h-[100vh] text-center flex flex-col justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "initial",
        backgroundPositionY: "5%",
      }}
      id="hero"
    >
      <h1 className="text-5xl mb-2">Seraya</h1>
      <p>A long-term, business-owner orientated Investment Partnership</p>
    </div>
  )
}
