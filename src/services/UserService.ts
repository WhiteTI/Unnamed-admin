import api from "@/http/index.ts";

export default class UserService {
    static async fetchUsers() {
        return api.get('/api/users');
    }

    static async updateUser(id: string, newLogin?: string, newUsername?: string) {
        return api.patch(`/api/users/${id}`, {newLogin, newUsername})
    }

    static async updateUserPassword(id: string, password: string, newPassword: string) {
        return api.patch(`/api/users/${id}`, {password, newPassword})
    }

    static async updateUserImage(id: string, newImage?: File,) {
        return api.patch(`/api/users/${id}`, {newImage})
    }
}