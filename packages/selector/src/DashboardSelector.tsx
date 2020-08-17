import * as React from "react";
import { useCallback, useState, useEffect, useMemo } from "react";
import { DashbuilderService } from "@dashbuilder-js/api";

export interface Props {
  url: string;
  user: string;
  password: string;
  onDashboardSelected: (arg1: string, arg2: string) => void;
}

export function DashboardSelector(props: Props) {
  const service = useMemo(
    () =>
      new DashbuilderService({
        url: props.url,
        user: props.user,
        password: props.password
      }),
    [props.url, props.user, props.password]
  );

  const [dashboardList, setDashboardList] = useState<string[]>([]);
  const [selectedDashboard, setSelectedDashboard] = useState("");
  const [pageList, setPageList] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    if (selectedPage && selectedPage !== "") {
      props.onDashboardSelected(selectedDashboard, selectedPage);
    }
  }, [selectedDashboard, selectedPage]);

  useEffect(() => {
    service.listDashboards().then(response => {
      const dashboards = response.availableModels;
      setDashboardList(dashboards);
      setSelectedDashboard(dashboards[0]);
    });
  }, []);

  const newDashboardSelected = (dashboard: string) => {
    setSelectedDashboard(dashboard);
    setSelectedPage("");
  };

  useEffect(() => {
    service.listPages(selectedDashboard).then(response => {
      setPageList(response.pages);
      setSelectedPage(response.pages[0]);
    });
  }, [selectedDashboard]);

  return (
    <div>
      <select value={selectedDashboard} onChange={e => newDashboardSelected(e.target.value)}>
        {dashboardList.map(ds => (
          <option key={ds} value={ds}>
            {ds}
          </option>
        ))}
      </select>
      <select value={selectedPage} onChange={e => setSelectedPage(e.target.value)}>
        {pageList.map(page => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
}
