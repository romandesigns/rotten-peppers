import Head from "next/head";
import Image from "next/image";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTable } from "react-table";
import Pusher from "pusher-js";

export default function Home() {
	const [rating, setRating] = useState(0);
	const [description, setDescription] = useState("");
	const [newData, setNewData] = useState([
		{
			col1: "1",
			col2: "Great movie",
		},
		{
			col1: "2",
			col2: "I love it",
		},
	]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			col1: rating,
			col2: description,
		};
		const { data } = await axios.post("/api/movie-review", body, { "content-type": "text/json" });
		console.log(data);
	};

	const foo = useCallback(() => {
		const pusher = new Pusher("8ff7fa3c88124600cbf5", {
			cluster: "us2",
		});
		const channel = pusher.subscribe("movie-review");
		channel.bind("new-review", function (data) {
			setNewData([...newData, data.data]);
		});
	}, [newData]);

	useEffect(() => {
		foo();
	}, [foo]);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="content_wrapper">
				<header>
					<h1>ROTTEN PEPPERS</h1>
				</header>

				<main>
					<div className="movie_cover">
						<h2>SINGULARITY</h2>
						<Image src="/wallpaperflare.com_wallpaper.jpg" width={640} height={420} alt="Mobie Cover" />
					</div>

					<div>
						<form className="review-form" onSubmit={handleSubmit}>
							<div className="label-group">
								<label htmlFor="rating">
									<p>Rating:</p>
									<input type="number" name="rating" id="rating" min={-5} max={5} onChange={(e) => setRating(e.target.value)} />
								</label>
								<label htmlFor="description">
									<p>Description:</p>
									<textarea type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} />
								</label>
							</div>
							<input type="submit" value="Add" className="submit-review-btn" />
						</form>
						<table className="table">
							<thead>
								<tr>
									<th>Rating</th>
									<th>Reviews</th>
								</tr>
							</thead>
							<tbody>
								{newData.map((coldata) => (
									<tr key={coldata.col1}>
										<td>{coldata.col1}</td>
										<td>{coldata.col2}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</main>

				<footer>
					<h5>ROTTEN PEPPERS!</h5>
					<p>Submit your movie rating</p>
				</footer>
			</div>
		</>
	);
}
