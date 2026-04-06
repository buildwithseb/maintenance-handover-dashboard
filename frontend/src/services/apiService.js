export default class ApiService {

     static baseUrl = process.env.API_BASE_URL || "http://localhost:3000";
     
    // -------------POST DATA--------------\\

    static async postData(data, path) {

        const res = await fetch(`${this.baseUrl}/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error("Failed to add data");
        };

        const datas = await res.json();

        return datas;

    }

    // -------------UPDATE DATA--------------\\

    static async updateGeneralNote(data, id) {

        const res = await fetch(`${this.baseUrl}/general-note/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }

    static async updateMachinery(data, id) {

        const res = await fetch(`${this.baseUrl}/machinery/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }

    static async updateTelehut(data, id) {
        const res = await fetch(`${this.baseUrl}/telehut/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }

    static async updateRemoteLevel(data, id) {
        const res = await fetch(`${this.baseUrl}/remote-level/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }


    // -------------DELETE DATA--------------\\


    static async deleteGeneralNote(id) {
        const res = await fetch(`${this.baseUrl}/general-note/${id}`, {
            method: "DELETE",
        })
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }
        return await res.json();
    }

    static async deleteMachinery(id) {
        const res = await fetch(`${this.baseUrl}/machinery/${id}`, {
            method: "DELETE",
        })
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }
        return await res.json();
    }

    static async deleteTelehut(id) {
        const res = await fetch(`${this.baseUrl}/telehut/${id}`, {
            method: "DELETE",
        })
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }

        return await res.json();
    }

    static async deleteRemoteLevel(id) {
        const res = await fetch(`${this.baseUrl}/remote-level/${id}`, {
            method: "DELETE",
        })
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }

        return await res.json();
    }
}