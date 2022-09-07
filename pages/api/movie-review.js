// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Pusher from "pusher";

export default function handler(req, res) {
	const pusher = new Pusher({
		appId: process.env.APPID,
		key: process.env.KEY,
		secret: process.env.SECRET,
		cluster: process.env.CLUSTER,
		useTLS: true,
	});

	console.log();
	pusher.trigger("movie-review", "new-review", {
		data: {
			col1: req.body.col1,
			col2: req.body.col2,
		},
	});

	return res.json({ message: "Review Added" }); // Process a POST request
}
