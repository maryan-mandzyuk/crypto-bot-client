import React, { useState } from "react";
import { DEFAULT_INTERVAL } from "../common/constants";
import { BacktestForm } from "../components/backtestForm/BacktestForm";
import { BacktestResult } from "../components/backtestResult/BacktestResult";
import { CandleStickChart } from "../components/candleStickChart/CandleStickChart";
import {
  BacktestStatistic,
  CandleChartInterval,
  PriceRecord,
  TradeOperation,
} from "../services/types";

export const ChartPage = () => {
  const [bars, setBars] = useState<PriceRecord[]>([]);
  const [tradeOperations, setTradeOperations] = useState<TradeOperation[]>([]);
  const [stats, setStats] = useState<BacktestStatistic>();
  const [interval, setInterval] =
    useState<CandleChartInterval>(DEFAULT_INTERVAL);

  return (
    <div className="m-10">
      <CandleStickChart bars={bars} tradeOperations={tradeOperations} />
      <div>
        <BacktestForm
          setBars={setBars}
          setTradeOperations={setTradeOperations}
          setStats={setStats}
          passInterval={setInterval}
        />
        {stats && (
          <BacktestResult
            interval={interval}
            stats={stats}
            tradeOperations={tradeOperations}
          />
        )}
      </div>
    </div>
  );
};
