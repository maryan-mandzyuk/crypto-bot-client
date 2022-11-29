import React, { FC, useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { PriceRecord, TradeOperation } from "../../services/types";
import { formatBarsTime, tradeOperationsToMarkers } from "../../common/helpers";

interface CandleStickChartProps {
  bars: PriceRecord[];
  tradeOperations: TradeOperation[];
}
export const CandleStickChart: FC<CandleStickChartProps> = ({
  bars,
  tradeOperations,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef && chartContainerRef.current) {
      const handleResize = () => {
        if (chartContainerRef && chartContainerRef.current) {
          newChart.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      const newChart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        layout: {
          background: {},
        },
        grid: {
          horzLines: { color: "#787B86" },
          vertLines: { color: "#787B86" },
        },
      });
      const candleSeries = newChart.addCandlestickSeries();
      const formattedBars = formatBarsTime(bars);
      candleSeries.setData(formattedBars);

      const markers = tradeOperationsToMarkers(tradeOperations);
      candleSeries.setMarkers(markers);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        newChart.remove();
      };
    }
  }, [bars, tradeOperations]);

  return (
    <div className="mt-10 bg-white shadow-md rounded " ref={chartContainerRef}>
      <div className="text-left">Text</div>
    </div>
  );
};
