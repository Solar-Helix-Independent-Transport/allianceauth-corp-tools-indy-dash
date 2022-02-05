import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Dashboard }  from "./components/DashTable";
import "./index.css";

TimeAgo.addDefaultLocale(en);

const queryClient = new QueryClient();

const InvoicesView = () => {    
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

const appDiv = document.getElementById("root");
render(<InvoicesView />, appDiv);
