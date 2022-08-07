import axios from "axios";
import {CardAPIs, UserAPIs} from "./APIs";


export const UpdateUser = async (data) => {
    await axios.put(UserAPIs.update, data).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export const GetAllCards = async () => {
    await axios.get(CardAPIs.getAll).then(res => {
        return res
    }).catch(err => {
        return err
    })
}
export const CreateCard = async (data) => {
    await axios.post(CardAPIs.create).then(res => {
        return res
    }).catch(err => {
        return err
    })
}
export const DeleteCardById = async (id) => {
    await axios.delete(CardAPIs.deleteById + `${id}`).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export const UpdateCard = async (data) => {
    await axios.put(CardAPIs.update + `${id}`).then(res => {
        return res
    }).catch(err => {
        return err
    })
}
export const CreateBOX = async (data) => {
    await axios.put(BoxAPIs.create,data).then(res => {
        return res
    }).catch(err => {
        return err
    })
}
export const DeleteBox = async (id) => {
    await axios.delete(BoxAPIs.deleteById+`${id}`).then(res => {
        return res
    }).catch(err => {
        return err
    })
}