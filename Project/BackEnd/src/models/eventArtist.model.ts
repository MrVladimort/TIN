import {InstanceType, ModelType, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {Artist} from "./artist.model";
import {Event} from "./event.model";

export class EventArtist extends Typegoose {
    @staticMethod
    public static async findAllByEventId(this: ModelType<EventArtist> & typeof EventArtist, eventId: string) {
        return await this.find({
            eventId,
        });
    }

    @staticMethod
    public static async findAllByArtistId(this: ModelType<EventArtist> & typeof EventArtist, artistId: string) {
        return await this.find({
            artistId,
        });
    }

    @prop({required: true}) public eventId: Ref<Event>;
    @prop({required: true}) public artistId: Ref<Artist>;
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
