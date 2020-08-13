
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
    host: string;
    user: string;
    password: string;
}

export class DashbuiderService {

    private requestInfo: RequestInfo;
    private authToken: string;

    public DashbuiderService(requestInfo: RequestInfo) {
        this.requestInfo = requestInfo;
        this.authToken = btoa(requestInfo.user + ":" + requestInfo.password);
    }

    public listDashboards(): Promise<ApiResponse> {
        const url = `${this.requestInfo.host}/rest/api`;
        return this.request(url).then(obj => JSON.parse(obj) as ApiResponse);
    }

    public listPages(id: string): Promise<DashboardResponse> {
        const url = `${this.requestInfo.host}/rest/api/dashboard/${id}`;
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