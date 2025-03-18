import {defineStore} from "pinia";
import {authService} from "../service/authService.js";

const url = "http://localhost:8080/safes";

export const useMemberStore = defineStore("member", {
    state: () => ({
        members: []
    }),

    actions: {
        async fetchMembers(safeId) {
            try {
                const response = await authService.fetchWithAuth(url + "/" + safeId + "/members");
                this.members = await response.json();
            }catch (error){
                console.log(error);
            }
        },

        async addMember(safeId, username){
            try{
                const response = await authService.fetchWithAuth(url + "/" + safeId + "/members", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username: username})
                });

                const safe = await response.json();
                this.members = safe.members;
            }catch (error) {
                console.log(error);
            }
        },

        async removeMemberFromSafe(safeId, username){
            try {
                const response = await authService.fetchWithAuth(url + "/" + safeId + "/members/" + username, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"}
                });

                const safe = await response.json();
                this.members = safe.members;
            }catch (error){
                console.log(error)
            }
        }
    }
});