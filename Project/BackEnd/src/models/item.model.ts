import {prop, Typegoose} from "typegoose";

class Item extends Typegoose {
    @prop({required: true})
    public name: string;
    @prop({required: true})
    public price: number;
    @prop({required: true})
    public exist: boolean;
}

export default new Item().getModelForClass(Item);
