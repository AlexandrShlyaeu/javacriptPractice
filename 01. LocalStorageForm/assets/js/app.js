const tweetList = document.querySelector('#tweet-list');
evntListeners();

function evntListeners() {
  //form submissions
  document.querySelector('#form').addEventListener('submit', newTweet);

  // remove item from list
  tweetList.addEventListener('click', removeTweet);

  document.addEventListener('DOMContentLoaded', localStorageOnLOad)
}

function newTweet(e) {
  e.preventDefault();
  // Read from text area
  const tweet = document.querySelector('#tweet').value;

  // create remove button
  const removeButton = document.createElement('a');
  removeButton.classList = 'remove-tweet';
  removeButton.textContent = 'X';

  //Create <li> element
  const li = document.createElement('li');
  li.textContent = tweet;

  // add value to list
  tweetList.appendChild(li);

  //add add remove button to each tweet
  li.appendChild(removeButton);

  // add to localStorage
  addTweetLocalStorage(tweet);
}

function removeTweet(e) {
  if (e.target.classList.contains('remove-tweet')) {
    e.target.parentElement.remove();
  }
  removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addTweetLocalStorage(tweet) {
  let tweets = getTweetsLocalStorage();
  tweets.push(tweet);
  localStorage.setItem('tweets', JSON.stringify(tweets))
}

function getTweetsLocalStorage(tweet) {
  let tweets;
  const tweetsLS = localStorage.getItem('tweets');

  if (tweetsLS === null) {
    tweets = [];

  }
  else {
    tweets = JSON.parse(tweetsLS);
  }
  return tweets
}

function localStorageOnLOad() {
  let tweets = getTweetsLocalStorage();
  tweets.forEach(tweet => {
    // create remove button
    const removeButton = document.createElement('a');
    removeButton.classList = 'remove-tweet';
    removeButton.textContent = 'X';
    //Create <li> element
    const li = document.createElement('li');
    li.textContent = tweet;
    //add add remove button to each tweet
    li.appendChild(removeButton);
    // add value to list
    tweetList.appendChild(li);
  });

}
function removeTweetLocalStorage(tweet) {
  let tweets = getTweetsLocalStorage();
  console.log("​removeTweetLocalStorage -> tweets", tweets)
  const tweetDelete = tweet.substring(0, tweet.length - 1);
  console.log("​removeTweetLocalStorage -> tweetDelete", tweetDelete)

  tweets.forEach(function (tweetLS, index) {
    if (tweetDelete === tweetLS) {
      tweets.splice(index, 1);
    }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets));
}