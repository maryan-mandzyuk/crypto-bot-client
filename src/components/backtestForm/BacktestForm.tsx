import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { DEFAULT_INTERVAL } from "../../common/constants";
import { runBacktest } from "../../services/backtest";
import {
  BacktestStatistic,
  CandleChartInterval,
  PriceRecord,
  TradeOperation,
} from "../../services/types";
import { ConfirmButton } from "../buttons/ConfirmButton";
import { DatePicker } from "../datePicker/DatePicker";
import { TextInput } from "./TextInput";

interface BacktestFormProps {
  setBars: (p: PriceRecord[]) => void;
  setTradeOperations: (op: TradeOperation[]) => void;
  setStats: (s: BacktestStatistic) => void;
  passInterval: (i: CandleChartInterval) => void;
}

export const BacktestForm: FC<BacktestFormProps> = ({
  setBars,
  setTradeOperations,
  setStats,
  passInterval,
}) => {
  const [startTime, setStartTime] = useState<Date>(new Date("2022 09 01"));
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [interval, setInterval] = useState(DEFAULT_INTERVAL);
  const [startAmount, setStartAmount] = useState(100);
  const [symbol, setSymbol] = useState("SOLUSDT");
  const [takeProfit, setTakeProfit] = useState<string | number>(3);
  const [stopLoss, setStopLoss] = useState<string | number>(1.5);
  const [leverage, setLeverage] = useState<string | number>(5);

  const { data, refetch, isFetching } = useQuery(
    ["repoData"],
    () =>
      runBacktest({
        startTime,
        endTime,
        interval,
        startAmount,
        symbol,
        takeProfitPercent: +takeProfit,
        stopLossPercent: +stopLoss,
        leverage: +leverage,
      }),
    { enabled: false, retry: false }
  );

  useEffect(() => {
    if (data) {
      setBars(data.bars);
      setTradeOperations(data.tradeOperations);
      setStats(data.statistic);
    }
  }, [data, setBars, setTradeOperations, setStats]);

  const onSymbolChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value);
  };

  const onIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInterval(e.target.value as CandleChartInterval);
    passInterval(e.target.value as CandleChartInterval);
  };

  const onStartAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartAmount(+e.target.value);
  };

  return (
    <div className="m-8">
      <div>
        <DatePicker
          startDate={startTime}
          endDate={endTime}
          setEndDate={(d) => setEndTime(d)}
          setStartDate={(d) => setStartTime(d)}
        />
      </div>
      <div className="flex flex-col">
        <TextInput
          onChange={(e) => onSymbolChange(e)}
          value={symbol}
          placeHolder="Symbol"
        />
        <TextInput
          onChange={(e) => onIntervalChange(e)}
          value={interval}
          placeHolder="Interval"
        />
        <TextInput
          onChange={(e) => onStartAmountChange(e)}
          value={startAmount.toString()}
          placeHolder="Start amount"
        />
        <TextInput
          onChange={(e) => setLeverage(e.target.value)}
          value={leverage.toString()}
          placeHolder="Leverage"
        />
        <div className="flex justify-around">
          <div className="flex items-center">
            <div>Take profit: </div>
            <TextInput
              onChange={(e) => setTakeProfit(e.target.value)}
              value={takeProfit.toString()}
              placeHolder="Start amount"
            />
          </div>

          <div className="flex items-center">
            <div>Stop loss: </div>
            <TextInput
              onChange={(e) => setStopLoss(e.target.value)}
              value={stopLoss.toString()}
              placeHolder="Start amount"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <ConfirmButton
          disabled={isFetching}
          onClick={() => refetch()}
          title="Run Tets"
        />
      </div>
    </div>
  );
};
