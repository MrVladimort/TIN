import {InstanceType, ModelType, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {Artist} from "./artist.model";
import {Event} from "./event.model";

interface IEventData {
    event: Event;
    artists: Artist[];
}

export class EventArtist extends Typegoose {
    @staticMethod
    public static async findAllByEventId(this: ModelType<EventArtist> & typeof EventArtist, eventId: number) {
        const eventAndArtist = await this.find({
            eventId,
        }).populate("Event").populate("Artist");

        return eventAndArtist.reduce((accum, cur) => {
            if (!accum.event) {
                accum.event = cur.Event;
            }
            accum.artists.push(cur.Artist);
            return accum;
        }, {
            event: null,
            artists: [],
        });
    }

    @staticMethod
    public static async findAll(this: ModelType<EventArtist> & typeof EventArtist) {
        const eventAndArtist = await this.find().populate("Event").populate("Artist");

        return eventAndArtist.reduce((accum: any[], cur: any) => {
            const index = accum.findIndex((eventData: IEventData) => eventData.event.eventId === cur.Event.eventId);

            if (index === -1) {
                accum.push({
                    event: cur.Event,
                    artists: [cur.Artist],
                });
            } else {
                accum[index].artists.push(cur.Artist);
            }

            return accum;
        }, []);
    }

    @staticMethod
    public static async findAllByEvent(this: ModelType<EventArtist> & typeof EventArtist, event: string) {
        return await this.find({
            Event: event,
        });
    }

    @staticMethod
    public static async findAllByArtist(this: ModelType<EventArtist> & typeof EventArtist, artist: string) {
        return await this.find({
            Artist: artist,
        });
    }

    @prop({required: true, ref: Event}) public Event: Ref<Event>;
    @prop({required: true}) public eventId: number;
    @prop({required: true, ref: Artist}) public Artist: Ref<Artist>;
    @prop({required: true}) public artistId: number;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<EventArtist>, ret: InstanceType<EventArtist>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new EventArtist().getModelForClass(EventArtist, Options);
