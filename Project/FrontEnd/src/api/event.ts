import axios from 'axios';
import mainConfig from "../config";

export default {
    getEvent: (id: string) => axios.get(`${mainConfig.apiHost}/event/${id}`).then(res => res.data),
    getAllEvents: () => axios.get(`${mainConfig.apiHost}/event`).then(res => res.data),
    createEvent: (eventData: any) => axios.post(`${mainConfig.apiHost}/event`, eventData).then(res => res.data),
    deleteEvent: (id: string) => axios.delete(`${mainConfig.apiHost}/event/${id}`).then(res => res.data),
}
