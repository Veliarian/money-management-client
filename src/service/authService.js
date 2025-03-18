import router from "../router/index.js";

export const authService = {
    getToken() {
        return localStorage.getItem("token");
    },

    async fetchWithAuth(url, options = {}) {
        const token = this.getToken();
        const headers = {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : ``
        };

        return fetch(url, {...options, headers});
    },

    logout(){
        localStorage.removeItem("token");
        router.push("/login");
    }
}