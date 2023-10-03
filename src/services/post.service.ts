import axios from "axios";
import { BASE_URL } from "../common/constants";

const PostService = {
    getPosts: async () => {
        const url = BASE_URL + '/posts';
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
    approvePost: async (id: number) => {
        const url = BASE_URL + "/approve-post/" + id;
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status !== 200) {
                throw Error('Something went wrong.')
            }
            return res;
        })

    },
    getUnpublishedPosts: async () => {
        const url = BASE_URL + '/unpublished-posts';
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
    createPost: async (data: object) => {
        const url = BASE_URL + '/posts';
        const token = JSON.parse(sessionStorage.getItem('token')!);
        return await axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.status !== 201) {
                throw Error('Something went wrong');
            }
            return res;
        })
    },
    getSinglePost: async (id: number) => {
        const url = BASE_URL + '/posts/' + id;
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
    editPost: async (id: number, data: object) => {
        const url = BASE_URL + '/posts/' + id;
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
    deletePost: async (id: number) => {
        const url = BASE_URL + '/posts/' + id;
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

export default PostService;