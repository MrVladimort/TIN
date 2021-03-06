import {InstanceType, ModelType, plugin, prop, staticMethod, Typegoose} from "typegoose";
import {AutoIncrement} from "./index";

@plugin(AutoIncrement, {inc_field: "artistId"})
export class Artist extends Typegoose {
    @staticMethod
    public static async findAllByStyle(this: ModelType<Artist> & typeof Artist, style: string) {
        return await this.find({
            style,
        });
    }

    @staticMethod
    public static async findOneByName(this: ModelType<Artist> & typeof Artist, name: string) {
        return await this.findOne({
            name,
        });
    }

    @prop({unique: true}) public artistId: number;
    @prop({required: true, unique: true}) public name: string;
    @prop({required: true}) public style: string;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Artist>, ret: InstanceType<Artist>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Artist().getModelForClass(Artist, Options);
