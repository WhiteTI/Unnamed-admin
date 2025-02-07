import api from "@/http/index.ts";

export default class UserService {
    static async fetchUsers() {
        return api.get('/users');
    }
}