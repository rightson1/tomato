import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const TomatoSchema = new Schema({
    diseases: str,
    symptoms: {
        type: String,
        default: "",
    },
    causes: {
        type: String,
        default: "",
    },
    comments: {
        type: String,
        default: "",
    },
    management: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default models.Tomato || model("Tomato", TomatoSchema);