import * as React from 'react';
import { DashbuilderService } from '@dashbuilder-js/api'

const service = new DashbuilderService();

const DashboardSelector: React.FunctionComponent = () => {
    // TODO: get imports from Service
    return (
        <iframe src="http://localhost:8280/?import=Mortgage&perspective=Mortages%20Process%20Overview&standalone"
            width="800" height="600" />
    )
}