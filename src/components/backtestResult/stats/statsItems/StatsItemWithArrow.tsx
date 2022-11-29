import React, { FC } from "react";
import { ArrowElement } from "./ArrowElement";

interface StatsItemWithArrowProps {
  title: string;
  value: number;
  valueInPercent: number;
}
export const StatsItemWithArrow: FC<StatsItemWithArrowProps> = ({
  title,
  value,
  valueInPercent,
}) => {
  const color = value > 0 ? "green" : "red";
  const arrowDirection = value > 0 ? "up" : "down";

  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded max-w-sm min-w-full">
      <div
        className={`flex flex-shrink-0 items-center justify-center bg-${color}-200 h-16 w-16 rounded`}
      >
        <ArrowElement size={6} direction={arrowDirection} />
      </div>
      <div className="flex-grow flex flex-col ml-4">
        <span className="text-xl font-bold text-left">{`$${value.toFixed(
          2
        )}`}</span>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{title}</span>
          <span className={`text-${color}-500 text-sm font-semibold ml-2`}>
            {`${valueInPercent.toFixed(2)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
