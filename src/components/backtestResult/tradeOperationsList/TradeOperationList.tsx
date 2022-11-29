import React, { FC } from "react";
import { CandleChartInterval, TradeOperation } from "../../../services/types";
import { TradeOperationItem } from "./TradeOperationItem";

interface TradeOperationListProps {
  tradeOperations: TradeOperation[];
  interval: CandleChartInterval;
}

export const TradeOperationList: FC<TradeOperationListProps> = ({
  tradeOperations,
  interval,
}) => {
  return (
    <div className="bg-white rounded-md my-8 shadow-sm border border-gray-300">
      <div className="grid grid-cols-4 justify-items-center pl-4 gap-2 py-2 bg-gray-50 border-b border-gray-300 text-base font-bold text-left">
        <div>Trade type</div>
        <div>Pnl</div>
        <div>Price Change</div>
        <div>Time in position</div>
      </div>
      {tradeOperations.map((o) => (
        <TradeOperationItem interval={interval} tradeOperation={o} />
      ))}
    </div>
  );
};
