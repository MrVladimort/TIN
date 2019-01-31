import axios from 'axios';
import mainConfig from "../config";

interface ICommentData {
    text?: string;
    grade?: number;
}

export default {
    getAllCommentsByEventId: (eventId: string | number) => axios.get(`${mainConfig.apiHost}/comment/event/${eventId}`).then(res => res.data),
    getAllComments: () => axios.get(`${mainConfig.apiHost}/comment`).then(res => res.data),
    getComment: (commentId: string | number) => axios.get(`${mainConfig.apiHost}/comment/${commentId}`).then(res => res.data),
    createComment: (commentData: { commentData: ICommentData, eventId: number }) => axios.post(`${mainConfig.apiHost}/comment`, commentData).then(res => res.data),
    editComment: (commentId: string | number, eventData: ICommentData) => axios.put(`${mainConfig.apiHost}/comment/${commentId}`, eventData).then(res => res.data),
    deleteComment: (commentId: string | number) => axios.delete(`${mainConfig.apiHost}/comment/${commentId}`).then(res => res.data),
}
