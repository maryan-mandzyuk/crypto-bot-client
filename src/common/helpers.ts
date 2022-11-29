import { CandlestickData, SeriesMarker, Time } from "lightweight-charts";
import {
  CandleChartInterval,
  PriceRecord,
  TradeOperation,
} from "../services/types";

export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const formatBarsTime = (bars: PriceRecord[]): CandlestickData[] => {
  return bars.map((p) => ({
    ...p,
    time: ((p.time as number) / 1000) as Time, // need to divide by 1000 because lightweight-charts multiples by 1000 by default
  }));
};

export const tradeOperationsToMarkers = (
  tradeOperations: TradeOperation[]
): SeriesMarker<Time>[] => {
  const markers: SeriesMarker<Time>[] = tradeOperations.reduce((acc, op) => {
    const newMarkers: SeriesMarker<Time>[] = [
      {
        color: "green",
        position: op.type === "long" ? "belowBar" : "aboveBar",
        shape: op.type === "long" ? "arrowUp" : "arrowDown",
        time: (Date.parse(op.openDate.toString()) / 1000) as Time,
        text: `Opened ${op.type} position`,
      },
    ];

    if (op.status === "closed" && op.closeDate) {
      newMarkers.push({
        color: "red",
        position: op.type === "long" ? "belowBar" : "aboveBar",
        shape: op.type === "long" ? "arrowUp" : "arrowDown",
        time: (Date.parse(op.closeDate.toString()) / 1000) as Time,
        text: `Closed ${op.type} position`,
      });
    }

    return [...acc, ...newMarkers];
  }, [] as SeriesMarker<Time>[]);

  return markers;
};

export const percentOf = (firstNum: number, fullNumber: number) => {
  return (firstNum / fullNumber) * 100;
};

export const intervalToMinutes = (interval: CandleChartInterval) => {
  switch (interval) {
    case "1m":
      return 1;
    case "3m":
      return 3;
    case "5m":
      return 5;
    case "15m":
      return 15;
    case "30m":
      return 30;
    case "1h":
      return 60;
    case "2h":
      return 120;
    case "4h":
      return 240;
    case "6h":
      return 360;
    case "8h":
      return 480;
    case "12h":
      return 720;
    case "1d":
      return 1440;
    case "3d":
      return 4320;
    case "1w":
      return 10080;
    case "1M":
      return 43800;
    default:
      return 15;
  }
};
