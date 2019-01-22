import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import ArtistModel from "../models/artist.model";
import EventModel from "../models/event.model";
import EventArtistModel from "../models/eventArtist.model";

export async function getEvent(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.id;
    const event = await EventModel.findOne({eventId});
    res.json({event, success: true, status: 200});
}

export async function getAllEvents(req: Request, res: Response, next: NextFunction) {
    const events = await EventModel.find();
    res.json({events, success: true, status: 200});
}

export async function createEvent(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const {eventData, artistsIds} = req.body;
    const event = new EventModel(eventData);
    await event.save();

    await Promise.all(artistsIds.map(async (id: number): Promise<any> => {
        const artist = await ArtistModel.findOne({artistId: id});

        const eventArtist = new EventArtistModel({
            eventId: event.id,
            artistId: artist.id,
        });

        return await eventArtist.save();
    }));

    res.json({event, success: true, status: 200});
}

export async function deleteEvent(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.id;
    const event = await EventModel.findOneAndDelete({eventId});
    await EventArtistModel.deleteMany({eventId: event.id});
    res.json({success: true, status: 200});
}
