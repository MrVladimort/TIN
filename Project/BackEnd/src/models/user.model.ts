import {Schema, model, Document, Model} from "mongoose";
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
export interface IUserModelDocument extends IUser, Document {
// instance methods here
    hashAndSetPass(pass: string): void

    verifyPassword(passToCheck: string): boolean
}

// main interface of model
export interface IUserModel extends Model<IUserModelDocument> {
// static methods here
    findOneByEmail(email: string): Promise<IUserModelDocument>
}

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        trim: true,
    },
    age: {
        type: Number
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
});

UserSchema.statics.findOneByEmail = (email: string) => this.findOne({email});

const hashPassWithSalt = (pass: string, salt: string): string => crypto.pbkdf2Sync(pass, salt, 64, 128, 'sha512').toString('base64');
const generateSalt = (): string => crypto.randomBytes(8).toString('hex');

UserSchema.methods.hashAndSetPass = (pass: string): void => {
    const passSalt = generateSalt();
    const passHash = hashPassWithSalt(pass, passSalt);

    this.passSalt = passSalt;
    this.passHash = passHash
};

UserSchema.methods.verifyPassword = (passToCheck: string): boolean => {
    const passHash = hashPassWithSalt(passToCheck, this.passSalt); // getting hashPass using pass and salt
    return passHash === this.passHash; // found user with same hash and returned it
};

// call on this.pass = "kek" => do hash on "kek" and apply passSalt and passHash to this
// called on creation || save???
UserSchema.virtual('pass').set(this.hashAndSetPass);

const User: IUserModel = model<IUserModelDocument, IUserModel>("User", UserSchema);
export default User;
