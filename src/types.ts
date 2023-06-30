export interface Ip {
    ip: string;
    created_at: number;
    update_at: number;
    deleted_at: number | null;
    lat: string;
    lon: string;
}

export interface Logs {
    ip_id: number;
    created_at: number;
    update_at: number;
    deleted_at: number | null;
    path: string;
    method: string;
    status: number;
    latency: number;
}

export enum TABLES {
    ip = 'ip',
    logs = 'logs',
}

type Structure = {
    [key in TABLES]: {
        columns: string[];
    };
};

export const dbStructure: Structure = {
    ip: {
        columns: ['ip', 'created_at', 'update_at', 'deleted_at', 'lat', 'lon'],
    },
    logs: {
        columns: ['ip_id', 'created_at', 'update_at', 'deleted_at', 'path', 'method', 'status', 'latency'],
    }
};