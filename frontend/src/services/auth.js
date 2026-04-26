import ApiService from "./apiService.js";

export default class AuthService {

    static async postAuth(data, path) {
         return await ApiService.postData(data, path);
    }
}
