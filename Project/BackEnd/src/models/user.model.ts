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

import {instanceMethod, InstanceType, ModelType, prop, staticMethod, Typegoose} from 'typegoose';
import crypto from "crypto";
import {createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken} from "../helpers/jwt.helper";

const hashPassWithSalt = (pass: string, salt: string): string => crypto.pbkdf2Sync(pass, salt, 64, 128, 'sha512').toString('base64');
const generateSalt = (): string => crypto.randomBytes(8).toString('hex');

export interface IAuthTokens {
    accessToken: string,
    refreshToken?: string,
}

export class User extends Typegoose {
    @prop({required: true})
    name?: string;

    @prop({required: true})
    surname?: string;

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
        return await this.findOne({email});
    }

    @staticMethod
    static async findOneWithAccessToken(this: ModelType<User> & typeof User, token: string) {
        const email = verifyAccessToken(token);
        return this.findOneByEmail(email);
    }

    @instanceMethod
    hashAndSetPass(this: InstanceType<User>, pass: string): void {
        const passSalt = generateSalt();
        const passHash = hashPassWithSalt(pass, passSalt);

        this.passSalt = passSalt;
        this.passHash = passHash;
    }

    @instanceMethod
    verifyPassword(this: InstanceType<User>, passToCheck: string): boolean {
        const passHash = hashPassWithSalt(passToCheck, this.passSalt); // getting hashPass using pass and salt
        return this.passHash === passHash // found user with same hash and returned it
    }

    @instanceMethod
    verifyRefreshToken(this: InstanceType<User>, token: string): boolean {
        const email = verifyRefreshToken(token);
        return this.email === email;
    }

    @instanceMethod
    generateJWT(this: InstanceType<User>): IAuthTokens {
        const accessToken = createAccessToken(this.email);
        const refreshToken = createRefreshToken(this.email);

        return {
            accessToken,
            refreshToken
        };
    }
}

const DefaultTransform = {
    schemaOptions: {
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (doc: InstanceType<User>, ret: InstanceType<User>, options: any) => {
                delete ret._id;
                delete ret.passHash;
                delete ret.passSalt;
                delete ret.verified;
                return ret;
            }
        }
    }
};

export default new User().getModelForClass(User, DefaultTransform);
