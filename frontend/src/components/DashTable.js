import React from "react";
import { Panel } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadDash } from "../apis/Dashboard";
import { PanelLoader } from "./PanelLoader";
import { BaseTable, textColumnFilter } from "./BaseTable";

export const Dashboard = () => {
  const { isLoading, error, data } = useQuery(["dashboard"], () => loadDash());

  const columns = React.useMemo(
    () => [
      {
        Header: "Structure",
        accessor: "name",
        Filter: textColumnFilter,
        filter: "text",
      },
      {
        Header: "Services",
        accessor: "services",
        Filter: textColumnFilter,
        filter: "text",
      },
      {
        Header: "Rigs",
        accessor: "rigs",
        Filter: textColumnFilter,
        filter: "text",
      },
    ],
    []
  );

  if (isLoading) return <PanelLoader />;

  if (error) return <div></div>;

  return (
    <Panel.Body>
      <BaseTable {...{ isLoading, data, columns, error }} />
    </Panel.Body>
  );
};
