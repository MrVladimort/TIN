import {InstanceType, ModelType, plugin, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {AutoIncrement} from "./index";
import {User} from "./user.model";

enum Status {
    FUTURE = "future",
    PAST = "past",
}

@plugin(AutoIncrement, {inc_field: "orderId"})
export class Order extends Typegoose {
    @staticMethod
    public static async findAllByUserId(this: ModelType<Order> & typeof Order, userId: string) {
        return await this.find({
            userId,
        });
    }

    @prop({unique: true}) public orderId: number;
    @prop({required: true}) public userId: Ref<User>;
    @prop({default: "future", enum: Status}) public status: string;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Order>, ret: InstanceType<Order>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Order().getModelForClass(Order, Options);
