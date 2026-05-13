import ApiService from "./apiService.js";
import LocalStorageService from "./localStorageService.js";

export default class EquipmentService {

    static baseUrl = process.env.API_BASE_URL || "http://localhost:3000";
    static MUTATION_MODE = process.env.MUTATION_MODE;
    static CSRF_TOKEN;

    // -------------GET DATA--------------\\

    static async getCsrf() {
        const res = await fetch(`${this.baseUrl}/csrf-token`, {
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error("Failed to get CSRF token");
        }

        const { csrfToken } = await res.json();

        this.CSRF_TOKEN = csrfToken;
    }

    static async postAuth(data, path) {
        return await ApiService.postData(data, path, this.CSRF_TOKEN);
    }

    static async fetchLists() {

        //  await new Promise(resolve => setTimeout(resolve, 4000));
        const [machineryRes, telehutRes, remoteLevelRes, generalNoteRes] = await Promise.all(
            [
                fetch(`${this.baseUrl}/machinery`, { credentials: "include" }),
                fetch(`${this.baseUrl}/telehut`, { credentials: "include" }),
                fetch(`${this.baseUrl}/remote-level`, { credentials: "include" }),
                fetch(`${this.baseUrl}/general-note`, { credentials: "include" })
            ]
        )

        if (!machineryRes.ok || !telehutRes.ok || !remoteLevelRes.ok || !generalNoteRes.ok) {
            throw new Error("Failed to fetch one or more resources from backend");
        }

        const [machineryList, telehutList, remoteLevelList, generalNoteList] = await Promise.all([
            machineryRes.json(),
            telehutRes.json(),
            remoteLevelRes.json(),
            generalNoteRes.json()
        ])

        LocalStorageService.set("machinery", machineryList);
        LocalStorageService.set("telehut", telehutList);
        LocalStorageService.set("remote-level", remoteLevelList);
        LocalStorageService.set("general-note", generalNoteList);

        return {
            machineryList,
            telehutList,
            remoteLevelList,
            generalNoteList
        }
    }


    static async getAllCache() {
        const generalNoteList = LocalStorageService.get("general-note") || [];
        const machineryList = LocalStorageService.get("machinery") || [];
        const telehutList = LocalStorageService.get("telehut") || [];
        const remoteLevelList = LocalStorageService.get("remote-level") || [];

        return {
            generalNoteList,
            machineryList,
            telehutList,
            remoteLevelList
        };
    }


    // -------------GENERAL NOTE--------------\\

    static async updateGeneralNote(data, id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.updateGeneralNote(data, id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.update(data, "general-note");
        }
    }

    static async addGeneralNote(data, path) {
        if (this.MUTATION_MODE === "API") {
            console.log(this.MUTATION_MODE)
            return ApiService.postData(data, path, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.add(data, "general-note");
        }
    }

    static async deleteGeneralNote(id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.deleteGeneralNote(id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.delete(id, "general-note");
        }
    }


    // -------------MACHINERY--------------\\

    static async updateMachinery(data, id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.updateMachinery(data, id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.update(data, "machinery");
        }
    }

    static async addMachinery(data, path) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.postData(data, path, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.add(data, "machinery");
        }
    }

    static async deleteMachinery(id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.deleteMachinery(id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.delete(id, "machinery");
        }
    }

    // -------------TELEHUT--------------\\

    static async updateTelehut(data, id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.updateTelehut(data, id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.update(data, "telehut");
        }
    }

    static async addTelehut(data, path) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.postData(data, path, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.add(data, "telehut");
        }
    }

    static async deleteTelehut(id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.deleteTelehut(id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.delete(id, "telehut");
        }
    }

    // -------------REMOTE LEVEL--------------\\

    static async updateRemoteLevel(data, id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.updateRemoteLevel(data, id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.update(data, "remote-level");
        }
    }

    static async addRemoteLevel(data, path) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.postData(data, path, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.add(data, "remote-level");
        }
    }

    static async deleteRemoteLevel(id) {
        if (this.MUTATION_MODE === "API") {
            return await ApiService.deleteRemoteLevel(id, this.CSRF_TOKEN);
        } else {
            return LocalStorageService.delete(id, "remote-level");
        }
    }

}



