import {ModelType, prop, staticMethod, Typegoose} from "typegoose";

class ItemOrder extends Typegoose {

    @staticMethod
    public static async findAllByItemId(this: ModelType<ItemOrder> & typeof ItemOrder, clientId: string) {
        return await this.find({clientId});
    }

    @staticMethod
    public static async findAllByOrderId(this: ModelType<ItemOrder> & typeof ItemOrder, orderId: string) {
        return await this.find({orderId});
    }
    @prop({required: true})
    public orderId: string;
    @prop({required: true})
    public itemId: string;
    @prop({required: true})
    public numberOfItem: number;
}

export default new ItemOrder().getModelForClass(ItemOrder);
