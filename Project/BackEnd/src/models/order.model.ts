import {ModelType, prop, staticMethod, Typegoose} from "typegoose";

class Order extends Typegoose {
    @prop()
    adminId: string;
    @prop()
    clientId: string;
    @prop()
    name: string;

    @staticMethod
    static async findOneByClientId(this: ModelType<Order> & typeof Order, clientId: string) {
        return await this.findOne({clientId});
    }
}

export default new Order().getModelForClass(Order);