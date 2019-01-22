import {InstanceType, ModelType, plugin, prop, Ref, staticMethod, Typegoose} from "typegoose";
import {Event} from "./event.model";
import {AutoIncrement} from "./index";
import {Order} from "./order.model";

@plugin(AutoIncrement, {inc_field: "ticketId"})
export class Ticket extends Typegoose {
    @staticMethod
    public static async findAllByOrderId(this: ModelType<Ticket> & typeof Ticket, orderId: string) {
        return await this.find({
            orderId,
        });
    }

    @staticMethod
    public static async findAllByUserId(this: ModelType<Ticket> & typeof Ticket, userId: string) {
        return await this.find({
            userId,
        });
    }

    @staticMethod
    public static async findAllByEventId(this: ModelType<Ticket> & typeof Ticket, eventId: string) {
        return await this.find({
            eventId,
        });
    }

    @prop({unique: true}) public ticketId: number;
    @prop({required: true}) public number: number;
    @prop({required: true}) public price: number;
    @prop({required: true}) public name: number;
    @prop({required: true}) public surname: number;

    @prop({required: true, ref: Event}) public eventId: Ref<Event>;
    @prop({required: true, ref: Order}) public orderId: Ref<Order>;
}

const Options = {
    schemaOptions: {
        toJSON: {
            transform: (doc: InstanceType<Ticket>, ret: InstanceType<Ticket>, options: any) => {
                delete ret._id;
                return ret;
            },
            versionKey: false,
            virtuals: true,
        },
        timestamps: true,
    },
};

export default new Ticket().getModelForClass(Ticket, Options);
