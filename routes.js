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
    if (req.query.id){
    var user = req.query.id;
      var docRef = db.collection("users").doc(user);
docRef.get().then(function(doc) {
    if (doc.exists) {
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
}
});
  
    app.get("/addproduct", function(req, res) {
    if (req.query.id){
    var user = req.query.id;
      var docRef = db.collection("users").doc(user);
      if (req.query.data === "ife") {
docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('users').doc(`${req.query.id}`).set({ife: "owned"},{merge: true});
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
      }
}
});
  
  app.get("/update", function(req, res) {
    console.log(req.query.id);
    console.log("Received GET: " + JSON.stringify(req.body));
    if (!req.query.id) {
      return res.send({ errormessage: "cannot find user" });
    } else if (req.query.data === "ife") {
      var getUser = db.collection("users").doc(req.query.id);
      getUser.get().then(function(doc) {
        if (doc.exists) {
          return res.send({ success: doc.data().ife });
        } else {
          return res.send({ errormessage: "cannot find data" });
        }
      });
    }
  });
};

module.exports = routes;
