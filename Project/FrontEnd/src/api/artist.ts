import axios from 'axios';
import mainConfig from "../config";

interface IArtistData {
    name?: string;
    style?: string;
}

export default {
    getArtist: (artistsId: number | string) => axios.get(`${mainConfig.apiHost}/artist/${artistsId}`).then(res => res.data),
    getAllArtists: () => axios.get(`${mainConfig.apiHost}/artist`).then(res => res.data),
    createArtist: (artistData: IArtistData) => axios.post(`${mainConfig.apiHost}/artist`, artistData).then(res => res.data),
    editArtist: (artistsId: number | string, artistData: IArtistData) => axios.put(`${mainConfig.apiHost}/artist/${artistsId}`, artistData).then(res => res.data),
    deleteArtist: (artistsId: number | string) => axios.delete(`${mainConfig.apiHost}/artist/${artistsId}`).then(res => res.data),
}
