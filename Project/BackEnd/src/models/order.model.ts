import {instanceMethod, InstanceType, ModelType, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {User} from "./user.model";

export class Order extends Typegoose {
    @staticMethod
    public static async findAllByUserId(this: ModelType<Order> & typeof Order, userId: string) {
        return await this.find({
            userId,
        });
    }

    @prop({required: true}) public userId: Ref<User>;
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
