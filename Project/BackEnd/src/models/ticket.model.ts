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
    public static async findAllByOrder(this: ModelType<Ticket> & typeof Ticket, Order: string) {
        return await this.find({
            Order,
        });
    }

    @staticMethod
    public static async findAllByEvent(this: ModelType<Ticket> & typeof Ticket, Event: string) {
        return await this.find({
            Event,
        });
    }

    @prop({unique: true}) public ticketId: number;
    @prop({required: true}) public number: number;
    @prop({required: true}) public price: number;
    @prop({required: true}) public name: string;
    @prop({required: true}) public surname: string;

    @prop({required: true, ref: Event}) public Event: Ref<Event>;
    @prop({required: true, ref: Order}) public Order: Ref<Order>;
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
