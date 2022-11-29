import axios from "axios";
import { BacktestParams, BacktestResult } from "./types";

const API_URL = "http://localhost:3333/api";

export const runBacktest = async (params: BacktestParams) => {
  const res = await axios.get<BacktestResult>(`${API_URL}/backtest`, {
    params,
  });

  return res.data;
};
