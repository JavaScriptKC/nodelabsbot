var Twitter = require("ntwitter"),
    events = require("events"),
    twitter = module.exports = new events.EventEmitter(),
    tweetKeyword = "nodelabs",
    options = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    client = new Twitter(options);

var connect = function () {
  client.stream("statuses/filter", { track: tweetKeyword }, onConnect);
};

var onConnect = function (stream) {
  stream.on("data", onTweet);
  stream.on("end", connect);
  stream.on("destroy", connect);
};

var onTweet = function (tweet) {
  twitter.emit("tweet", "@" + tweet.user.screen_name + ": " + tweet.text);
};

connect();