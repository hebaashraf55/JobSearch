import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { OTPType } from "src/common/enum/user.enum";
import { User } from "./user.model";
// import { User } from "./user.model";


@Schema({ timestamps: true })
export class Otp {
    @Prop({
        type: String,
        required: true
    })
    code: string; // hashed code

    @Prop({
        type: String,
        required: true,
        enum: OTPType
    })
    type: OTPType;

    @Prop({
        type: Date,
        required: true
    })
    expiresIn: Date;

    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true
    })
    createdBy: Types.ObjectId;
}


export const otpSchema = SchemaFactory.createForClass(Otp);
// otpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 }); // ttl
// otpSchema.pre(
//   'save',
//   async function (
//     this: OtpDocument & { wasNew: boolean; plainOtp: string },
//     next,
//   ) {
//     this.wasNew = this.isNew;
//     if (this.isModified('code')) {
//       this.plainOtp = this.code;
//       this.code = await hash({ plainText: this.code });
//       await this.populate('createdBy');
//     }
//     next();
//   },
// );


// otpSchema.post('save', async function (doc, next) {
//   const that = this as OtpDocument & { wasNew: boolean; plainOtp: string };

//   if (that.wasNew && that.plainOtp) {
//     await emailEvent.emit('confirmeEmail', {
//       otp: that.plainOtp,
//       userName: (that.createdBy as any).userName,
//       to: (that.createdBy as any).email,
//     });
//   }
// });

export type OTPDocument = HydratedDocument<Otp>;
export const otpModel = MongooseModule.forFeature([
    { name: Otp.name, schema: otpSchema },
]);