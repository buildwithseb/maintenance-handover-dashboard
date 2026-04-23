import ApiService from "./apiService.js";

export default class AuthService {

    static async postAuth(data, path) {
         return ApiService.postData(data, path);
    }
}
