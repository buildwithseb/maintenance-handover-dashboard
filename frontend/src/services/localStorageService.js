export default class LocalStorageService {

    static get(key) {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        try {
            return JSON.parse(cached);
        } catch (error) {
            console.error("Failed to parse cache:", error);
            localStorage.removeItem(key);
            return null;
        }
    }

    static set(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    static add(item, key) {
        const dataList = this.get(key) || [];
        dataList.push(item)
        this.set(key, dataList);
        return item;
    }

    static update(item, key) {

        const dataList = (this.get(key) || []).map(data =>
            data.id === item.id ? item : data
        );
        this.set(key, dataList);
        return item;

    }

    static delete(itemId, key) {
        const dataList = (this.get(key) || []).filter(data => data.id !== itemId);
        this.set(key, dataList);
        return itemId;
    }
}