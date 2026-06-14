import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * Registers a new user.
 * * @param {Object} credentials - The user's registration details.
 * @param {string} credentials.username - The chosen username.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The chosen password.
 * @returns {Promise<Object>} The server response data.
 * @throws {Object|Error} The error response data or the error object.
 */
export async function register({ username, email, password }) {
    try {
        const response = await api.post("/api/auth/register", { username, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

/**
 * Authenticates an existing user.
 * * @param {Object} credentials - The user's login details.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The server response data.
 * @throws {Object|Error} The error response data or the error object.
 */
export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

/**
 * Logs out the currently authenticated user.
 * * @returns {Promise<Object>} The server response data.
 * @throws {Object|Error} The error response data or the error object.
 */
export async function logout() {
    try {
        const response = await api.post("/api/auth/logout", {});
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

/**
 * Retrieves the currently authenticated user's profile data.
 * * @returns {Promise<Object>} The server response data containing user info.
 * @throws {Object|Error} The error response data or the error object.
 */
export async function getMe() {
    try {
        const response = await api.post("/api/auth/me", {});
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}