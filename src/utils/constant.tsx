export const BACKEND_URL: string = 'http://localhost:3000';

export const HEADER_OBJ: RequestInit = {
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
            },
    body: JSON.stringify({})
}