import React, { FC } from "react";
import { BacktestStatistic } from "../../../services/types";
import { StatsItem } from "./statsItems/StatsItem";
import { StatsItemWithArrow } from "./statsItems/StatsItemWithArrow";

interface StatsSectionProps {
  stats: BacktestStatistic;
}

export const StatsSection: FC<StatsSectionProps> = ({ stats }) => {
  const {
    pnl,
    percentagePnl,
    longsPnl,
    longsPercentagePnl,
    shortsPnl,
    shortsPercentagePnl,
    operationMade,
    numberOfShorts,
    numberOfLongs,
  } = stats;

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full ">
      <StatsItem value={operationMade} title="Total trades" />
      <StatsItem value={numberOfLongs} title="Long trades" />
      <StatsItem value={numberOfShorts} title="Short trades" />

      <StatsItemWithArrow
        title="Realized PNL"
        value={pnl}
        valueInPercent={percentagePnl}
      />
      <StatsItemWithArrow
        title="Longs PNL"
        value={longsPnl}
        valueInPercent={longsPercentagePnl}
      />
      <StatsItemWithArrow
        title="Shorts PNL"
        value={shortsPnl}
        valueInPercent={shortsPercentagePnl}
      />
    </div>
  );
};
