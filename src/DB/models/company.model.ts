import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { numberOfEmployeesEnum } from "src/common/enum/company.enum";


@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
})

export class Company {
    @Prop({
        type: String,
        required: true,
        trim: true,
        unique: true,
    })
    companyName: string;

    @Prop({
        type: String,
        required: true,
        minLength: 2,
        maxLength: 1000,
    })
    description: string;


    @Prop({
        type: String,
        required: true,
    })
    industry: string;

    @Prop({
        type: String,
        required: true,
    })
    address: string;

    @Prop({
        type: Number,
        enum: numberOfEmployeesEnum,
        default: numberOfEmployeesEnum["1-10"],
        required: true,
    })
    numberOfEmployees: number;

    @Prop({
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid company email format"],
    })
    companyEmail: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    })
    createdBy: string;

    @Prop({
        secure_url: String,
        public_id: String,
    })
    logo: string;  // {secure_url,public_id}

    @Prop({
        secure_url: String,
        public_id: String,
    })
    coverPic: string;  // {secure_url,public_id}

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    })
    HRs: Types.ObjectId[];


    @Prop({
        type: Date,
    })
    deletedAt: Date;

    @Prop({
        type: Date,
    })
    bannedAt: Date;

    @Prop({
        secure_url: String,
        public_id: String,
    })
    legalAttachment: string;

    @Prop({
        type: Boolean,
        default: false,
    })
    approvedByAdmin: boolean;
}

export const companySchema = SchemaFactory.createForClass(Company);


export type CompanyDocument = HydratedDocument<Company>;
export const CompanyModel = MongooseModule.forFeature([
    { name: Company.name, schema: companySchema },
]);