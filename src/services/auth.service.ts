import axios from "axios";
import { BASE_URL } from "../common/constants";


const auth = {
    login: async (user: object) => {
        const url = BASE_URL + '/login';
        return await axios.post(url, user, {
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
        }).then((res) => {
            if (res.status !== 200) {
                throw Error("Something went wrong");
            }
            return res;
        })
    },
    logout: async (token: string) => {
        const url = BASE_URL + '/logout';
        return await axios.post(url, {}, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" }
        }).then(res => {
            if (res.status !== 200) {
                throw Error("Something went wrong");
            }
            return res;
        })
    }
}

export default auth;