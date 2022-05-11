export enum ACTION_TYPES {
    HELP = "help",
    MAP = 'map',
    NEW = 'new',
    OPEN = "open"
}

export interface FetchMapSuccess {
    map: string;
}

export interface FetchMapFailure {
    error: string;
}

export interface FetchPointRequest{
    
}