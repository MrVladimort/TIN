import {InstanceType, ModelType, plugin, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {Event} from "./event.model";
import {AutoIncrement} from "./index";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "commentId"})
export class Comment extends Typegoose {
    @staticMethod
    public static async findAllByEventId(this: ModelType<Comment> & typeof Comment, eventId: string) {
        return await this.find({
            eventId,
        });
    }

    @staticMethod
    public static async findAllByUser(this: ModelType<Comment> & typeof Comment, userId: string) {
        return await this.find({
            userId,
        });
    }

    @prop({unique: true}) public commentId: number;
    @prop({required: true, ref: User}) public userId: Ref<User>;
    @prop({required: true, ref: Event}) public eventId: Ref<Event>;
    @prop({required: true}) public text: string;
    @prop({required: true}) public grade: number;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Comment>, ret: InstanceType<Comment>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Comment().getModelForClass(Comment, Options);
