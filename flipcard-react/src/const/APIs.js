// Mess Menu APIs
import {BASE_URL} from "./const";

export const UserAPIs = {
    register: `${BASE_URL}/user/create`,
    signIn: `${BASE_URL}/loginUser`,
    update: `${BASE_URL}/user/update`,
}

export const BoxAPIs = {
    getAll: `${BASE_URL}/box/getAll`,
    create: `${BASE_URL}/box/create`,
    findById: `${BASE_URL}/box/findById/`,
    deleteById: `${BASE_URL}/box/delete/`,
    update: `${BASE_URL}/box/update`,
    findByUserId: `${BASE_URL}/box/getByuserId`,
}
export const CardAPIs = {
    getAll: `${BASE_URL}/card/getAll`,
    create: `${BASE_URL}/card/create`,
    deleteById: `${BASE_URL}/card/delete/`,
    update: `${BASE_URL}/card/update`,
}

export const CommentAPIs = {
    findByBoxId: `${BASE_URL}/comment/getCommentsByBoxId/`,
    create: `${BASE_URL}/comment/create/`,
}
