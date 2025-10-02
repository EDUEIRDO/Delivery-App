import { Credentials, User } from "../types/auth";

const API_URL = "http://192.168.0.104:8080";

export async function login(credentials: Credentials): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error("Invalid credentials");

    return response.json();
}
