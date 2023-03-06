import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import URL from '../models/url';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/short-it');

const router = Router();

async function generateSlug () {
	try {
		const slug: string = crypto.randomBytes(3).toString('hex');
		const matchingSlugURLs = await URL.find({ slug });

		if (matchingSlugURLs.length > 0) {
			generateSlug();
		} else {
			return slug;
		}
	} catch (err) {
		console.log(err);
	}
}

router.get('/:slug', async (req: Request, res: Response) => {
	try {
		const url = await URL.findOne({ slug: req.params.slug });

		if (url !== null) {
			res.redirect(url.url);
		} else {

		}
	} catch (err) {
		console.log(err);
	}
});

router.post('/shorten-url', async (req: Request, res: Response) => {
	try {
		const { url } = req.body;

		const matchingURL = await URL.findOne({ url });

		if (matchingURL === null) {
			if (url.slice(0, 7) === 'http://' || url.slice(0, 8) === 'https://') {
				const slug = await generateSlug();

				const newURL = new URL({
					url,
					slug,
				});

				newURL.save();

				const host = req.headers.host;
				res.json({ result: `https://${host}/${slug}` });
			} else {
				res.sendStatus(422);
			}
		} else {
			const host = req.headers.host;
			res.json({ result: `https://${host}/${matchingURL.slug}` });
		}

		res.end();
	} catch (err) {
		console.log(err);
	}
});

export default router;

