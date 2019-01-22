import axios from 'axios';
import mainConfig from "../config";

export default {
    getOrder: (id: string) => axios.get(`${mainConfig.apiHost}/order/${id}`).then(res => res.data),
    getAllOrders: () => axios.get(`${mainConfig.apiHost}/order`).then(res => res.data),

    getAllUserOrders: (email: string) => axios.post(`${mainConfig.apiHost}/order/user`, {email}).then(res => res.data),

    createOrder: (orderData: any) => axios.post(`${mainConfig.apiHost}/order`, orderData).then(res => res.data),
    deleteOrder: (id: string) => axios.delete(`${mainConfig.apiHost}/order/${id}`).then(res => res.data),
}
