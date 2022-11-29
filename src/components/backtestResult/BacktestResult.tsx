import React, { FC } from "react";
import {
  BacktestStatistic,
  CandleChartInterval,
  TradeOperation,
} from "../../services/types";
import { StatsSection } from "./stats/StatsSection";
import { TradeOperationList } from "./tradeOperationsList/TradeOperationList";

interface BacktestResultProps {
  stats: BacktestStatistic;
  tradeOperations: TradeOperation[];
  interval: CandleChartInterval;
}
export const BacktestResult: FC<BacktestResultProps> = ({
  stats,
  tradeOperations,
  interval,
}) => {
  return (
    <div className="m-5">
      <StatsSection stats={stats} />
      <TradeOperationList
        interval={interval}
        tradeOperations={tradeOperations}
      />
    </div>
  );
};
