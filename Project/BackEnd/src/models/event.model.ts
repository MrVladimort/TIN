import {InstanceType, ModelType, plugin, prop, staticMethod, Typegoose} from "typegoose";
import {AutoIncrement} from "./index";

@plugin(AutoIncrement, {inc_field: "eventId"})
export class Event extends Typegoose {
    @staticMethod
    public static async findAllByDate(this: ModelType<Event> & typeof Event, date: Date) {
        return await this.find({
            date,
        });
    }

    @staticMethod
    public static async findAllByLocation(this: ModelType<Event> & typeof Event, location: string) {
        return await this.find({
            location,
        });
    }

    @staticMethod
    public static async findOneByName(this: ModelType<Event> & typeof Event, name: string) {
        return await this.findOne({
            name,
        });
    }

    @prop({unique: true}) public eventId: number;
    @prop({required: true}) public location: string;
    @prop({required: true, unique: true}) public name: string;
    @prop({required: true}) public date: Date;
    @prop({required: true}) public freePlacesCount: number;
    @prop({default: 0}) public bookedPlacesCount?: number;

    @prop()
    get placesCount(this: InstanceType<Event>) {
        return this.freePlacesCount + this.bookedPlacesCount;
    }
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Event>, ret: InstanceType<Event>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Event().getModelForClass(Event, Options);
