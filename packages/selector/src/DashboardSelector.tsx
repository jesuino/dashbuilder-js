import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { DashbuilderService } from '@dashbuilder-js/api'

export interface Props {
    url: string;
    user: string;
    password: string;
    onDashboardSelected: (arg1: string, arg2: string) => void;
}

export function DashboardSelector(props: Props) {

    const service = useMemo(() => new DashbuilderService({
        url: props.url,
        user: props.user,
        password: props.password
    }), [props.url, props.user, props.password]);

    const { dashboardList, setDashboardList } = useState([]);
    const { selectedDashboard, setSelectedDashboard } = useState("");
    const { pageList, setPageList } = useState([]);
    const { selectedPage, setSelectedPage } = useState("");

    const onDashboardSelected = React.useCallback(() =>
        props.onDashboardSelected(selectedDashboard, selectedPage)
        , [selectedDashboard, selectedPage]);

    useEffect(() => {
        service.listDashboards().then(response => {
            const dashboards = response.availableModels();
            setDashboardList(dashboards)
            setSelectedDashboard(dashboards[0]);
        });
    }, dashboardList);

    useEffect(() => {
        service.listPages(selectedDashboard).then(response => {
            setPageList(response.pages);
            setSelectedPage(response.pages[0]);
        });
    }, selectedDashboard);



    return (
        <div>
            <select value={selectedDashboard} onChange={() => onDashboardSelected()}>
                {dashboardList.forEach(ds => <option value={ds}>{ds}</option>)}
            </select>
            <select value={selectedPage} onChange={() => onDashboardSelected()}>
                {pageList.forEach(page => <option value={page}>{page}</option>)}
            </select>
        </div>
    )
}