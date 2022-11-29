export interface BacktestParams {
  startTime: Date;
  endTime: Date;
  symbol: string;
  startAmount: number;
  interval: CandleChartInterval;
  stopLossPercent?: number;
  takeProfitPercent?: number;
  leverage: number;
}

export const enum CandleChartInterval {
  ONE_MINUTE = "1m",
  THREE_MINUTES = "3m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  ONE_HOUR = "1h",
  TWO_HOURS = "2h",
  FOUR_HOURS = "4h",
  SIX_HOURS = "6h",
  EIGHT_HOURS = "8h",
  TWELVE_HOURS = "12h",
  ONE_DAY = "1d",
  THREE_DAYS = "3d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1M",
}

export interface TradeOperation {
  type: PositionType;
  status: PositionStatus;
  openDate: string;
  closeDate?: string;
  priceAtOpening: number;
  priceAtClosing?: number;
  symbol: string;
  amountOfMoney: number;
  realizedPnl?: number;
}

export type PositionType = "long" | "short";
export type PositionStatus = "opened" | "closed";

export interface PriceRecord {
  close: number;
  open: number;
  low: number;
  high: number;
  time: number | Date | string;
}

export interface BacktestResult {
  bars: PriceRecord[];
  tradeOperations: TradeOperation[];
  statistic: BacktestStatistic;
}

export interface BacktestStatistic {
  operationMade: number;
  moneyAfterTest: number;
  pnl: number;
  percentagePnl: number;
  numberOfLongs: number;
  longsPnl: number;
  longsPercentagePnl: number;
  numberOfShorts: number;
  shortsPnl: number;
  shortsPercentagePnl: number;
}
