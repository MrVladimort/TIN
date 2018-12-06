import {ModelType, prop, staticMethod, Typegoose} from "typegoose";

class ItemOrder extends Typegoose {
    @prop({required: true})
    orderId: string;
    @prop({required: true})
    itemId: string;
    @prop({required: true})
    numberOfItem: number;

    @staticMethod
    static async findAllByItemId (this: ModelType<ItemOrder> & typeof ItemOrder, clientId: string) {
        return await this.find({clientId});
    }

    @staticMethod
    static async findAllByOrderId (this: ModelType<ItemOrder> & typeof ItemOrder, orderId: string) {
        return await this.find({orderId});
    }
}

export default new ItemOrder().getModelForClass(ItemOrder);
