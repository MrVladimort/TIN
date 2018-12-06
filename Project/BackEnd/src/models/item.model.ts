import {prop, Typegoose} from "typegoose";

class Item extends Typegoose {
    @prop({required: true})
    name: string;
    @prop({required: true})
    price: number;
    @prop({required: true})
    exist: boolean;
}

export default new Item().getModelForClass(Item);