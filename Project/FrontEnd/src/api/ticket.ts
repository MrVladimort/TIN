import axios from 'axios';
import mainConfig from "../config";

interface ITicketData {
    name?: string;
    surname?: string;
}

export default {
    getTicket: (ticketId: string | number) => axios.get(`${mainConfig.apiHost}/ticket/${ticketId}`).then(res => res.data),
    getAllTickets: () => axios.get(`${mainConfig.apiHost}/ticket`).then(res => res.data),
    deleteTicket: (ticketId: string | number) => axios.delete(`${mainConfig.apiHost}/ticket/${ticketId}`).then(res => res.data),
    editTicket: (ticketId: string | number, ticketData: ITicketData) => axios.put(`${mainConfig.apiHost}/ticket/${ticketId}`, ticketData).then(res => res.data),
}
