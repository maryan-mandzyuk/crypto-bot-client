import React, { FC } from "react";

interface StatsItemProps {
  title: string;
  value: number;
}
export const StatsItem: FC<StatsItemProps> = ({ value, title }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded max-w-sm min-w-full">
      <div className="flex-grow flex flex-col ml-4">
        <span className="text-xl font-bold text-left">{`${value}`}</span>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{title}</span>
        </div>
      </div>
    </div>
  );
};
