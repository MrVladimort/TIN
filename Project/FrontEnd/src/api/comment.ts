import axios from 'axios';
import mainConfig from "../config";

export default {
    getAllCommentsByEventId: (eventId: string) => axios.get(`${mainConfig.apiHost}/comment/${eventId}`).then(res => res.data),
    getAllComments: () => axios.get(`${mainConfig.apiHost}/comment`).then(res => res.data),
    createComment: (eventData: any) => axios.post(`${mainConfig.apiHost}/comment`, eventData).then(res => res.data),
    deleteComment: (id: string) => axios.delete(`${mainConfig.apiHost}/comment/${id}`).then(res => res.data),
}
