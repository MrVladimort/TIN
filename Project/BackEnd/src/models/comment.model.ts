import {InstanceType, ModelType, plugin, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {Event} from "./event.model";
import {AutoIncrement} from "./index";
import {User} from "./user.model";

@plugin(AutoIncrement, {inc_field: "commentId"})
export class Comment extends Typegoose {
    @staticMethod
    public static async findAll(this: ModelType<Comment> & typeof Comment) {
        return await this.find().populate("User").populate("Event");
    }

    @staticMethod
    public static async findOneByCommentId(this: ModelType<Comment> & typeof Comment, commentId: number) {
        return await this.findOne({
            commentId,
        }).populate("User").populate("Event");
    }

    @staticMethod
    public static async findAllByEvent(this: ModelType<Comment> & typeof Comment, Event: string) {
        return await this.find({
            Event,
        }).populate("User").populate("Event");
    }

    @staticMethod
    public static async findAllByUser(this: ModelType<Comment> & typeof Comment, User: string) {
        return await this.find({
            User,
        }).populate("User").populate("Event");
    }

    @prop({unique: true}) public commentId: number;
    @prop({required: true, ref: User}) public User: Ref<User>;
    @prop({required: true, ref: Event}) public Event: Ref<Event>;
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
