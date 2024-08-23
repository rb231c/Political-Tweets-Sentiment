const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Sentiment Analysis API is running');
});
const axios = require('axios');

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

app.get('/tweets', async (req, res) => {
  try {
    const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      },
      params: {
        'query': '#YourHashtagHere',
        'tweet.fields': 'created_at,author_id'
      }
    });

    const tweetsWithSentiment = response.data.data.map(tweet => {
      const sentimentScore = sentiment.analyze(tweet.text);
      return { ...tweet, sentiment: sentimentScore };
    });

    res.json(tweetsWithSentiment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tweets');
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
