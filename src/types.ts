export interface User {
    id: number;
    username: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface TaskCreate {
    title: string;
    description: string;
}

export interface TaskUpdate {
    title: string;
    description: string;
    completed: boolean;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    owner_id: number;
    created_at: string;
}
