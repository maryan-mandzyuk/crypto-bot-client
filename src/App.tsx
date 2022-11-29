import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChartPage } from "./pages/ChartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App ">
        <ChartPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
