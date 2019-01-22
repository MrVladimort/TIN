import axios from 'axios';
import mainConfig from "../config";

export default {
    getArtist: (id: string) => axios.get(`${mainConfig.apiHost}/artist/${id}`).then(res => res.data),
    getAllArtists: () => axios.get(`${mainConfig.apiHost}/artist`).then(res => res.data),
    createArtist: (artistData: any) => axios.post(`${mainConfig.apiHost}/artist`, artistData).then(res => res.data),
    deleteArtist: (id: string) => axios.delete(`${mainConfig.apiHost}/artist/${id}`).then(res => res.data),
}
