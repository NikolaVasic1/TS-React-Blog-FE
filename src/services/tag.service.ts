import axios from "axios";
import { BASE_URL } from "../common/constants";
import { Tag } from "../common/Tag";

const TagService = {
    createTag: async (data: Tag) => {
        const url = BASE_URL + "/tags";
        const token = JSON.parse(sessionStorage.getItem('token')!);

        return await axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status !== 200) {
                throw Error('Something went wrong.')
            }
            return res
        })
    },
    getTags: async () => {
        const url = BASE_URL + "/tags";
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status !== 200) {
                throw Error('Something went wrong.')
            }
            return res
        })
    }

    
}

export default TagService;