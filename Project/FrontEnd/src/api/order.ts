import axios from 'axios';
import mainConfig from "../config";

export default {
    getOrder: (orderId: string | number) => axios.get(`${mainConfig.apiHost}/order/${orderId}`).then(res => res.data),
    getAllOrders: () => axios.get(`${mainConfig.apiHost}/order`).then(res => res.data),
    createOrder: (orderData: any) => axios.post(`${mainConfig.apiHost}/order`, orderData).then(res => res.data),
    deleteOrder: (orderId: string | number) => axios.delete(`${mainConfig.apiHost}/order/${orderId}`).then(res => res.data),
}
