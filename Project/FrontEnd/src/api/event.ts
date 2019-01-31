import axios from 'axios';
import mainConfig from "../config";

interface IEventData {
    name?: string;
    location?: string;
    date?: string;
    placesCount?: number;
    price?: number;
}

export default {
    getEvent: (eventId: string | number) => axios.get(`${mainConfig.apiHost}/event/${eventId}`).then(res => res.data),
    getAllEvents: () => axios.get(`${mainConfig.apiHost}/event`).then(res => res.data),
    createEvent: (eventData: IEventData, artistsIds: number[]) => axios.post(`${mainConfig.apiHost}/event`, {eventData, artistsIds}).then(res => res.data),
    editEvent: (eventId: string | number, eventData: IEventData) => axios.put(`${mainConfig.apiHost}/event/${eventId}`, eventData).then(res => res.data),
    deleteEvent: (eventId: string | number) => axios.delete(`${mainConfig.apiHost}/event/${eventId}`).then(res => res.data),
}
