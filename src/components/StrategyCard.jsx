//import { useState } from "react";

export const StrategyCard = ({ title, content }) => {
  return (
    <div className="w-full m-2 h-32 p-2">
      <h1 className="text-2xl mb-2">{title}</h1>
      <p>{content}</p>
    </div>
  )
}
