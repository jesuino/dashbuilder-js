
export type RuntimeMode = "MULTIPLE_IMPORT" | "SINGLE" | "STATIC";

export interface ApiResponse {
    mode: RuntimeMode;
    availableModels: string[];
    acceptingNewImports: boolean;
}

export interface DashboardResponse {
    runtimeModelId: string;
    pages: string[];
}

export interface RequestInfo {
    url: string;
    user: string;
    password: string;
}

export function embeddedRuntimeUrl(url: string,
    page: string,
    dashboardId?: string) {

    let embeddedUrl = `${url}?standalone&perspective=${page}`;
    if (dashboardId) {
        embeddedUrl = `${embeddedUrl}&import=${dashboardId}`;
    }
    return embeddedUrl;
}

export class DashbuilderService {

    private requestInfo: RequestInfo;
    private authToken: string;

    constructor(requestInfo: RequestInfo) {
        this.requestInfo = requestInfo;
        this.authToken = btoa(requestInfo.user + ":" + requestInfo.password);
    }

    public listDashboards(): Promise<ApiResponse> {
        const url = `${this.requestInfo.url}/rest/api`;
        return this.request(url).then(obj => JSON.parse(obj) as ApiResponse);
    }

    public listPages(id: string): Promise<DashboardResponse> {
        const url = `${this.requestInfo.url}/rest/api/dashboard/${id}`;
        return this.request(url).then(obj => JSON.parse(obj) as DashboardResponse);
    }

    private request(url: string): Promise<string> {
        const headers = new Headers();
        headers.set("Authorization", `Basic ${this.authToken}`);
        return fetch(url, {
            headers: headers
        }).then(r => r.json());
    }

}