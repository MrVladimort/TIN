import {InstanceType, ModelType, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {Event} from "./event.model";
import {Order} from "./order.model";
import {User} from "./user.model";

export class Bilet extends Typegoose {
    @staticMethod
    public static async findAllByOrderId(this: ModelType<Bilet> & typeof Bilet, orderId: string) {
        return await this.find({
            orderId,
        });
    }

    @staticMethod
    public static async findAllByUserId(this: ModelType<Bilet> & typeof Bilet, userId: string) {
        return await this.find({
            userId,
        });
    }

    @staticMethod
    public static async findAllByEventId(this: ModelType<Bilet> & typeof Bilet, eventId: string) {
        return await this.find({
            eventId,
        });
    }

    @prop({required: true}) public number: number;
    @prop({required: true}) public price: number;

    @prop({required: true, ref: Event}) public eventId: Ref<Event>;
    @prop({required: true, ref: Order}) public orderId: Ref<Order>;
    @prop({required: true, ref: User}) public userId: Ref<User>;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Bilet>, ret: InstanceType<Bilet>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Bilet().getModelForClass(Bilet, Options);
