import {ModelType, prop, staticMethod, Typegoose} from "typegoose";

class Order extends Typegoose {

    @staticMethod
    public static async findOneByClientId(this: ModelType<Order> & typeof Order, clientId: string) {
        return await this.findOne({clientId});
    }
    @prop()
    public adminId: string;
    @prop()
    public clientId: string;
    @prop()
    public name: string;
}

export default new Order().getModelForClass(Order);
