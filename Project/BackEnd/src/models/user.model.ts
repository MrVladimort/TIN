/*import { Schema, model, Document, Model } from "mongoose";
import crypto from "crypto";

export interface IUser {
    email: string,
    verified: boolean,
    name?: string,
    age?: number,
    phone?: string,
    passHash: string,
    passSalt: string,
}

// interface for documents in the model
export interface IUserDocument extends IUser, Document {
    createdAt: Date,
    updatedAt: Date,
    pass: string
// instance methods here
    hashAndSetPass ( pass: string ): void

    verifyPassword ( passToCheck: string ): boolean
}

// main interface of model
export interface IUserModel extends Model<IUserDocument> {
// static methods here
    findOneByEmail ( email: string ): Promise<IUserDocument>
}

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
        trim: true,
    },
    passHash: {
        type: String,
        trim: true,
    },
    passSalt: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

UserSchema.static('findOneByEmail', function ( email: string ) {
    return this.findOne({ email });
});

const hashPassWithSalt = ( pass: string, salt: string ): string => crypto.pbkdf2Sync(pass, salt, 64, 128, 'sha512').toString('base64');
const generateSalt = (): string => crypto.randomBytes(8).toString('hex');

UserSchema.method('hashAndSetPass', function ( pass: string ): void {
    const user: IUserDocument = this;

    const passSalt = generateSalt();
    const passHash = hashPassWithSalt(pass, passSalt);

    user.passSalt = passSalt;
    user.passHash = passHash
});

UserSchema.method('verifyPassword', function ( passToCheck: string ): boolean {
    const user: IUserDocument = this;
    const passHash = hashPassWithSalt(passToCheck, user.passSalt); // getting hashPass using pass and salt
    return passHash === user.passHash; // found user with same hash and returned it
});

// call on this.pass = "kek" => do hash on "kek" and apply passSalt and passHash to this
// called on creation || save??? ya hui znayet esli chestno
UserSchema.virtual('pass').set(function ( pass: string ) {
    const user: IUserDocument = this;
    user.hashAndSetPass(pass);
});

UserSchema.virtual('pass').get(function () {
    const user: IUserDocument = this;
    return user.passHash;
});

const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
export default User;
*/

import crypto from "crypto";
import {instanceMethod, InstanceType, ModelType, prop, staticMethod, Typegoose} from 'typegoose';

const hashPassWithSalt = (pass: string, salt: string): string => crypto.pbkdf2Sync(pass, salt, 64, 128, 'sha512').toString('base64');
const generateSalt = (): string => crypto.randomBytes(8).toString('hex');

export class User extends Typegoose {
    @prop({required: true})
    name?: string;

    @prop({required: true})
    surname?: string;

    @prop()
    age?: number;

    @prop({required: true, unique: true})
    email: string;

    @prop()
    passHash: string;

    @prop()
    passSalt: string;

    @prop({default: false})
    verified: boolean;

    @prop()
    set pass(this: InstanceType<User>, pass: string) {
        const user = this;
        user.hashAndSetPass(pass);
    };

    @staticMethod
    static async findOneByEmail(this: ModelType<User> & typeof User, email: string) {
        return await this.findOne({email}); //... on dumayet shto eto instance method glupyshka
    }

    @instanceMethod
    hashAndSetPass(this: InstanceType<User>, pass: string) {
        console.log("HasAndSetPass function");
        const user = this;

        const passSalt = generateSalt();
        const passHash = hashPassWithSalt(pass, passSalt);

        user.passSalt = passSalt;
        user.passHash = passHash;

        console.log(user);
    }
}

export default new User().getModelForClass(User);
