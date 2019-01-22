import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import ArtistModel, {Artist} from "../models/artist.model";

export async function getArtist(req: Request, res: Response, next: NextFunction) {
    const artistId = req.params.id;
    const artist = await ArtistModel.findOne({artistId});
    res.json({artist, success: true, status: 200});
}

export async function getAllArtists(req: Request, res: Response, next: NextFunction) {
    const artists = await ArtistModel.find();
    res.json({artists, success: true, status: 200});
}

export async function createArtist(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const artistData: Artist = req.body;
    const artist = new ArtistModel(artistData);
    await artist.save();

    res.json({artist, success: true, status: 200});
}

export async function deleteArtist(req: Request, res: Response, next: NextFunction) {
    const artistId = req.params.id;
    await ArtistModel.deleteOne({artistId});
    res.json({success: true, status: 200});
}
