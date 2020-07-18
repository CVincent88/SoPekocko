const bouncer = require ('express-bouncer')(1800000, 43200000, 5); // Protection against bruteforce attacks. The user will have to wait between 30 minutes and 12 hours after 5 wrong attempts.

bouncer.blocked = function (req, res, next, remaining)
{   
    console.log("Hello i'm here");
    res.send (429, "Too many requests have been made, " +
        "please wait " + remaining / 1000 + " seconds");
};

module.exports = bouncer;