var irc = require("./lib/irc"),
    twitter = require("./lib/twitter"),
    port = process.env.PORT || 0,
    http = require("http"),
    server = http.createServer();

twitter.on("tweet", irc.say);
server.listen(port);
