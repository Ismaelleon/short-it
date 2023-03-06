import { Schema, model } from 'mongoose';

interface IURL {
	url: string;
	slug: string;
}

const urlSchema = new Schema<IURL>({
	url: { type: String, required: true },
	slug: { type: String, required: true },
});

const URL = model<IURL>('url', urlSchema);

export default URL;
