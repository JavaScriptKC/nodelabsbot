var irc = require("./lib/irc"),
    twitter = require("./lib/twitter");

twitter.on("tweet", irc.say);