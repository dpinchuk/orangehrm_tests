import * as dotenv from "dotenv";

export function loadEnv(): void {
    dotenv.config();
}

export function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Missing env: ${name}`);
    return value;
}
