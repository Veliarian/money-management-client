import {defineStore} from "pinia";
import {authService} from "../service/authService.js";
import serverUrlService from "../service/urlService.js";

const url = serverUrlService.getApplicationServerUrl() + "/safes";

export const useSafeStore = defineStore("safe", {
    state: () => ({
        safes: []
    }),

    actions: {
        async fetchSafes() {
            try {
                const response = await authService.fetchWithAuth(url);
                this.safes = await response.json();
            }catch (error){
                console.log(error);
            }
        },

        async addSafe(name){
            try{
                const response = await authService.fetchWithAuth(url, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({name: name})
                });
                const safe = await response.json();
                this.safes = [...this.safes, safe];
            }catch (error){
                console.log(error);
            }
        },

        async updateSafeName(name, safeId){
            try{
                const response = await authService.fetchWithAuth(url + "/" + safeId, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({name: name})
                });
                const safe = await response.json();
                const index = this.safes.findIndex(s => s.id === safeId);
                this.safes[index] = safe;
            }catch (error){
                console.log(error);
            }
        },

        async getSafeInfo(safeId){
            try{
                const response = await authService.fetchWithAuth(url + "/" + safeId);
                const safe = await response.json();

                const index = this.safes.findIndex(s => s.id === safeId);
                this.safes[index] = safe;
            }catch (error){
                console.log(error);
            }
        },

        async deleteSafe(safeId){
            try {
                const response = await authService.fetchWithAuth(url + "/" + safeId, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                });

                if(response.ok){
                    this.safes = [...this.safes.filter(safe => safe.id !== safeId)];
                }
            }catch (error){
                console.log(error);
            }
        }
    }
});