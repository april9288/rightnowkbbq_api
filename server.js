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

app.post('/yelp', async (req, res)=> {
	console.log("looking up")
	const yelpResult = await yelpSearch.search({
          term: "koreanbbq",
          latitude: 34,
          longitude: -118,
          categories: "korean",
          open_now: true
        })      
    res.send(yelpResult.jsonBody.businesses)
    console.log("Done")
})
 
app.listen(process.env.PORT || 3001, () => {
	console.log(`starting on port ${process.env.PORT || 3001}`);
})
