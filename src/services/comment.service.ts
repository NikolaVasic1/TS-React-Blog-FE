import axios from "axios";
import { BASE_URL } from "../common/constants";


const CommentService = {
    getPostComments: async (id: number) => {
        const url = BASE_URL + '/posts/' + id + '/comments';
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
    getNotApprovedComments: async () => {
        const url = BASE_URL + '/unapproved-comments';
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
    approveComment: async (id: number) => {
        const url = BASE_URL + '/approve-comment/' + id;
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
    addPostComment: async (data: object) => {
        const url = BASE_URL + '/comments';
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status !== 201) {
                throw Error('Something went wrong.')
            }
            return res
        })
    },
    deleteComment: async (id: number) => {
        const url = BASE_URL + '/comments/' + id;
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status !== 200) {
                throw Error('Something went wrong.')
            }
            return res
        })
    }
}

export default CommentService