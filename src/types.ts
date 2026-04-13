interface User {
    id: number;
    username: string;
}

interface TokenResponse {
    access_token: string;
    token_type: string;
}

interface TaskCreate {
    title: string;
    description: string;
}

interface TaskUpdate {
    title: string;
    description: string;
    completed: boolean;
}

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    owner_id: number;
    created_at: string;
}
