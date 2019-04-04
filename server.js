const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const yelp = require('yelp-fusion');
const yelpSearch = yelp.client(process.env.API_KEY_YELP);

// app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
	let response = "korean bbq app";
	res.send(response);
})

app.get('/yelp', async (req, res)=> {
	let latitude = req.query.lat
	let longitude = req.query.lon
	try{
		const yelpResult = await yelpSearch.search({
	          term: "koreanbbq",
	          latitude,
	          longitude,
	          categories: "korean",
	          open_now: true
	        })     
		if (yelpResult.statusCode === 400) {
			res.status(400).send(yelpResult.message)
		} else if (yelpResult.statusCode === 200) {
			res.status(200).send(yelpResult.jsonBody.businesses)
		}
	}catch(e){
		res.status(400).send("Server Error")
	}
})
 
app.listen(process.env.PORT || 3001, () => {
	console.log(`starting on port ${process.env.PORT || 3001}`);
})
