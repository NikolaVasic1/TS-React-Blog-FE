import axios from "axios";
import { BASE_URL } from "../common/constants";

const UserService = {
    getUsers: async () => {
        const url = BASE_URL + '/users';
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status !== 200) {
                throw Error('Something went wrong.')
            }
            return res
        })
    },
    registerUser: async (data: object) => {
        const url = BASE_URL + "/register";
        return await axios.post(url, data, {
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
        }).then((res) => {
            if (res.status !== 201) {
                throw Error("Something went wrong");
            }
            return res;
        })
    },
    editUser: async (id: number, data: object) => {
        const url = BASE_URL + '/users/' + id;
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.patch(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.status !== 200) {
                throw Error('Something went wrong');
            }
            return res;
        })
    },
    changePassword: async (id: number, data: object) => {
        const url = BASE_URL + '/users/' + id + '/update-password';
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.status !== 200) {
                throw Error('Something went wrong');
            }

            return res;
        })
    },
    deleteUser: async (id: number) => {
        const url = 'http://127.0.0.1:8000/api/users/' + id;
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.status !== 204) {
                throw Error("Something went wrong");
            }
            return res;
        })
    }
}

export default UserService;