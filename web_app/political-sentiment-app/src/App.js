import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    const response = await axios.get('http://localhost:5000/tweets');
    setTweets(response.data.data);
  };

  return (
    <div>
      <h1>Political Sentiment Analysis</h1>
      <button onClick={fetchTweets}>Fetch Tweets</button>
      <ul>
  {tweets.map(tweet => (
    <li key={tweet.id}>
      {tweet.text} - Sentiment: {tweet.sentiment.score}
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
