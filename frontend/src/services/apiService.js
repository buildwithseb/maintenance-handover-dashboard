export default class ApiService {

    static baseUrl = process.env.API_BASE_URL || "http://localhost:3000";

    // -------------GET DATA--------------\\

    static async checkAuthStatus(path) {

        const res = await fetch(`${this.baseUrl}/${path}`, {
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error("Failed to get data");
        }

        return await res.json();


    }

    // -------------POST DATA--------------\\

    static async postData(data, path, csrfToken) {

        const res = await fetch(`${this.baseUrl}/${path}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error("Failed to add data");
        };

        const datas = await res.json();

        return datas;

    }

    // -------------UPDATE DATA--------------\\

    static async updateGeneralNote(data, id, csrfToken) {

        const res = await fetch(`${this.baseUrl}/general-note/${id}`, {
            credentials: 'include',
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }

    static async updateMachinery(data, id, csrfToken) {

        const res = await fetch(`${this.baseUrl}/machinery/${id}`, {
            credentials: 'include',
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }

    static async updateTelehut(data, id, csrfToken) {

        const res = await fetch(`${this.baseUrl}/telehut/${id}`, {
            credentials: 'include',
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }

    static async updateRemoteLevel(data, id, csrfToken) {
        const res = await fetch(`${this.baseUrl}/remote-level/${id}`, {
            credentials: 'include',
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        };

        return await res.json();
    }


    // -------------DELETE DATA--------------\\


    static async deleteGeneralNote(id, csrfToken) {
        const res = await fetch(`${this.baseUrl}/general-note/${id}`, {
            credentials: 'include',
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            }
        })

        if (!res.ok) {
            throw new Error("Failed to delete data");
        }
        return await res.json();
    }

    static async deleteMachinery(id, csrfToken) {
        const res = await fetch(`${this.baseUrl}/machinery/${id}`, {
            credentials: 'include',
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            }
        })
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }
        return await res.json();
    }

    static async deleteTelehut(id, csrfToken) {
        const res = await fetch(`${this.baseUrl}/telehut/${id}`, {
            credentials: 'include',
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            }
        })
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }

        return await res.json();
    }

    static async deleteRemoteLevel(id, csrfToken) {
        const res = await fetch(`${this.baseUrl}/remote-level/${id}`, {
            credentials: 'include',
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken
            }
        })

        if (!res.ok) {
            throw new Error("Failed to delete data");
        }

        return await res.json();
    }
}