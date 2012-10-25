var nodeIrc = require("irc"),
    events = require("events"),
    irc = module.exports = new events.EventEmitter(),
    server = process.env.IRC_SERVER || "morgan.freenode.net",
    username = "nodelabs",
    channel = "#nodelabs",
    topic = "Welcome to NodeLabs! Post your questions here or tweet them " +
    "@nodelabs and we’ll try to get them answered as quickly as possible. " +
    "Tweets mentioning NodeLabs will be streamed here to keep you in the loop.";

var client = new nodeIrc.Client(server, "nodelabs", {
  userName: username,
  realName: "Tweet @nodelabs to join the conversation!",
  channels: [ channel ],
  debug: true
});

irc.say = function (message) {
  client.say(channel, message);
};

client.on("join#nodelabs", function (user) {
  if (user === username) {
    client.send("TOPIC", channel, topic);
  }
});

client.on("error", function (error) {
  console.error(error);
});