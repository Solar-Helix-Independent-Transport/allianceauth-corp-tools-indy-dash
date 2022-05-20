import React from "react";
import { Panel, Label } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadDash } from "../apis/Dashboard";
import { PanelLoader } from "./PanelLoader";
import { BaseTable, textColumnFilter, colourStyles, SelectColumnFilter } from "./BaseTable";
import Select from "react-select";

export const Dashboard = () => {
  const { isLoading, error, data, isFetching } = useQuery(["dashboard"], () => loadDash());

  const columns = React.useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
        Filter: SelectColumnFilter,
        filter: "includes"
      },
      {
        Header: "Structure",
        accessor: "name",
        Filter: textColumnFilter,
        filter: "text",
        Cell: (props) => (
          <div style={{ whiteSpace: "nowrap" }}>
            {props.value}
          </div>
        ),

      },
      {
        Header: "Services",
        accessor: "services",
        Filter: ({
          column: { setFilter, filterValue, preFilteredRows, id },
        }) => {
          const options = React.useMemo(() => {
            const options = new Set();
            if (!preFilteredRows) {
              return [];
            }
            preFilteredRows.forEach((row) => {
              if (row.values[id] !== null) {
                row.values[id].forEach((service) => {
                  options.add(service);
                });
              }
            });
            return [...options.values()];
          }, [id, preFilteredRows]);
          return (
            <Select
              key={filterValue}
              title={filterValue}
              onChange={(e) => setFilter(e.value)}
              value={{ label: filterValue || "All" }}
              defaultValue={{ label: "All" }}
              styles={colourStyles}
              options={[{ id: -1, value: "", label: "All" }].concat(
                options.map((o, i) => {
                  return { id: i, value: o, label: o };
                })
              )}
            />
          );
        },
        filter: (rows, ids, filterValue) => {
          return rows.filter((row) => {
            return ids.some((id) => {
              if (!filterValue) {
                return true;
              } else {
                let rowValue = row.values[id].reduce((p, c) => {
                  return p + "  " + c;
                }, "");
                return rowValue
                  ? rowValue.toLowerCase().includes(filterValue.toLowerCase())
                  : false;
              }
            });
          });
        },
        Cell: (props) =>
          props.value ? (
            <div className="text-center">
              {props.value.map((service) => {
                return (
                  <p
                    className="padded-label"
                  >
                    {service}
                  </p>
                );
              })}
            </div>
          ) : (
            <></>
          ),
      },
      {
        Header: "Rigs",
        accessor: "rigs",
        Filter: textColumnFilter,
        filter: (rows, ids, filterValue) => {
          return rows.filter((row) => {
            return ids.some((id) => {
              if (!filterValue) {
                return true;
              } else {
                let rowValue = row.values[id].reduce((p, c) => {
                  return p + "  " + c;
                }, "");
                return rowValue
                  ? rowValue.toLowerCase().includes(filterValue.toLowerCase())
                  : false;
              }
            });
          });
        },
        Cell: (props) => (
          <div>
            {props.value.map(str => <p>{str}</p>)}
          </div>
        ),

      },
    ],
    []
  );

  if (isLoading) return <PanelLoader />;

  if (error) return <div></div>;

  return (
    <Panel.Body>
      <BaseTable {...{ isLoading, data, columns, error, isFetching }} />
    </Panel.Body>
  );
};
