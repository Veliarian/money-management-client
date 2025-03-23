import {defineStore} from "pinia";
import {authService} from "../service/authService.js";
import serverUrlService from "../service/urlService.js";

const url = serverUrlService.getApplicationServerUrl() + "/user";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            username: "",
            role: ""
        }
    }),

    actions: {
        async fetchUser(safeId) {
            try {
                const response = await authService.fetchWithAuth(url);
                this.user = await response.json();
            }catch (error){
                console.log(error);
            }
        },
    }
});