const roblox = require("noblox.js");

var routes = function(app, db) {
  /*app.get("/", function(req, res) {
    console.log("Received GET");
  });*/

  app.post("/update", function(req, res) {
    if (!req.body.username || !req.body.data) {
      console.log("Received incomplete POST: " + JSON.stringify(req.body));
      return res.send({ status: "error", message: "missing parameter(s)" });
    } else {
      console.log("Received POST: " + JSON.stringify(req.body));
      return res.send(req.body);
    }
  });

  app.get("/checkuser", function(req, res) {
    if (req.query.username){
    var user = req.query.username;
    res.send("i guess so")
    } else {
      res.send("null")
    }
    
});
  
  app.get("/update", function(req, res) {
    console.log(req.query.username);
    console.log("Received GET: " + JSON.stringify(req.body));
    if (!req.query.username) {
      return res.send({ errormessage: "cannot find user" });
    } else if (req.query.data === "plus") {
      var getUser = db.collection("users").doc(req.query.username);
      getUser.get().then(function(doc) {
        if (doc.exists) {
          return res.send({ veroStatus: doc.data().veroPlus });
        } else if (req.query.data === "lite") {
          return res.send({ errormessage: "cannot locate lite" });
        } else {
          return res.send({ errormessage: "cannot find data" });
        }
      });
    }
  });
};

module.exports = routes;
