import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "src/common/enum/user.enum";
// import { Otp, OtpSchema } from "./otp.model";



@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
})

export class User {
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true,
    })
    firstName: string;

    @Prop({
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true,
    })
    lastName: string;

    @Virtual({
        get: function () {
            return `${this.firstName} ${this.lastName}`
        },
        set: function (value) {
            const { firstName, lastName } = value.split(" ") || []
            this.set({ firstName, lastName })
        }
    })
    userName: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    })
    email: string;

    @Prop({
        type: String,
        required: function () {
            return this.provider === ProviderEnum.SYSTEM;
        }
    })
    password: string;

    @Prop({
        type: String,
        enum: {
            values: Object.values(ProviderEnum),
            message: `{values} is not valid provider`,
        },
        default: ProviderEnum.SYSTEM
    })
    providor: string;

    @Prop({
        type: String,
        enum: {
            values: Object.values(GenderEnum),
            message: `{values} is not valid gender`
        },
        default: GenderEnum.MALE
    })
    gender: string;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    DOB: Date;

    @Prop({
        type: String,

    })
    mobileNumber: string;

    @Prop({
        type: String,
        enum: {
            values: Object.values(RoleEnum),
            message: `{values} is not valid Role`
        },
        default: RoleEnum.USER
    })
    role: string;

    // @Prop({
    //     type: Boolean,
    //     default: false,
    // })
    // isConfirmed: boolean;

    @Prop({
        type: Date,
    })
    deletedAt: Date;

    @Prop({
        type: Date,
    })
    bannedAt: Date;

    // @Prop({
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'User',
    //     default: null,
    // })
    // updatedBy : Types.ObjectId;

    // @Prop({
    //     type : Date,
    // })
    // changeCredentialTime : Date;

    // @Prop({
    // type: {
    //   secure_url: { type: String },
    //   public_id: { type: String },
    //     },
    //     default: null,
    // })
    // profilePic?: { secure_url?: string; public_id?: string } | null;


    //   @Prop({
    // type: {
    //   secure_url: { type: String },
    //     public_id: { type: String },
    //     },
    //     default: null,
    // })
    // coverPic?: { secure_url?: string; public_id?: string } | null;

    // @Prop({
    //     type: [OtpSchema],
    //     default: [],
    // })
    // OTP: Otp[];

}

export const userSchema = SchemaFactory.createForClass(User);


export type UserDocument = HydratedDocument<User>;
export const UserModel = MongooseModule.forFeature([
    { name: User.name, schema: userSchema },
]);