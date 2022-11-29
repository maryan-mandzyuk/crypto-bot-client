import React, { FC } from "react";
import {
  capitalize,
  intervalToMinutes,
  percentOf,
} from "../../../common/helpers";
import {
  CandleChartInterval,
  PositionType,
  TradeOperation,
} from "../../../services/types";
import { format, differenceInMinutes } from "date-fns";
import { ArrowElement } from "../stats/statsItems/ArrowElement";

interface TradeOperationItemProps {
  tradeOperation: TradeOperation;
  interval: CandleChartInterval;
}

export const TradeOperationItem: FC<TradeOperationItemProps> = ({
  tradeOperation,
  interval,
}) => {
  const {
    type,
    realizedPnl,
    priceAtOpening,
    priceAtClosing,
    openDate,
    closeDate,
  } = tradeOperation;
  return (
    <div className="grid grid-cols-4 font-medium justify-items-center items-center py-4 border-b">
      <TradeOperationTypeCell type={type} />
      <TradeOperationArrowCell value={realizedPnl} />
      <TradeOperationPriceCell
        atOpening={priceAtOpening}
        atClosing={priceAtClosing}
      />
      <TradeOperationTimeCell
        interval={interval}
        openDateString={openDate}
        closeDateString={closeDate}
      />
    </div>
  );
};

const TradeOperationTypeCell: FC<{ type: PositionType }> = ({ type }) => {
  const color = type === "long" ? "green" : "red";
  return (
    <div
      className={`flex justify-self-center px-2 h-fit w-fit text-center rounded-lg bg-${color}-200`}
    >
      {capitalize(type)}
    </div>
  );
};

const TradeOperationArrowCell: FC<{ value?: number }> = ({ value }) => {
  const direction = value && value > 0 ? "up" : "down";
  const color = value && value > 0 ? "green" : "red";
  return (
    <div>
      {value && (
        <div className={`text-left pl-6 flex text-${color}-700`}>
          {value?.toFixed(2)}$ <ArrowElement size={6} direction={direction} />
        </div>
      )}
    </div>
  );
};

const TradeOperationPriceCell: FC<{
  atOpening: number;
  atClosing?: number;
}> = ({ atOpening, atClosing }) => {
  const priceChange = atOpening - (atClosing || 0);
  const priceChangePercent = percentOf(priceChange, atOpening);
  return (
    <div className="text-left pl-6">
      <div>
        {atOpening}$ {"->"} {atClosing}$
      </div>
      <div className="text-gray-500 text-center">
        {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
      </div>
    </div>
  );
};

const TradeOperationTimeCell: FC<{
  openDateString: string;
  interval: CandleChartInterval;
  closeDateString?: string;
}> = ({ openDateString, closeDateString, interval }) => {
  const openDate = new Date(openDateString);
  const closeDate = closeDateString ? new Date(closeDateString) : null;
  const diff = closeDate ? differenceInMinutes(closeDate, openDate) : null;
  const candles = diff ? diff / intervalToMinutes(interval) : null;

  return (
    <div className="text-center pl-6 ">
      <div>
        {diff} min. ({candles} candles)
      </div>

      <div className="text-gray-500">
        {format(new Date(openDate), "d/M/yy k:m")} {"->"}{" "}
        {closeDate ? format(new Date(closeDate), "d/M/yy k:m") : "N/A"}
      </div>
    </div>
  );
};
