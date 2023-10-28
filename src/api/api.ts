import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": '95828b39-ca1b-43bb-b89e-db3b0c2ce183'
    }
})

export const todolistApi = {
    getTodolists: () => {
        instance.get('todo-lists')
    }
}