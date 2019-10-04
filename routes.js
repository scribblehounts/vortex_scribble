


var routes = function(app, db) {
  
    app.get("/", function(req, res) {
    res.send("vero authentication bot {stay away or i will hunt u down - scribble}");
    console.log("Received GET");
  });
  
  
  
    app.post("/update", function(req, res) {
    if(!req.body.username || !req.body.data) {
      console.log("Received incomplete POST: "+JSON.stringify(req.body));
      return res.send({"status": "error", "message": "missing parameter(s)"});
    } else {
      console.log("Received POST: "+JSON.stringify(req.body));
      return res.send(req.body);
    }
  });
  
  
  
  
    app.get("/update", function(req, res) {
      console.log(req.query.username)
    console.log("Received GET: "+JSON.stringify(req.body));
    if(!req.query.username) {
      return res.send({"status": "error", "message": "no username"});
    } else if(!req.query.data) {
      return res.send({"status": "error", "message": "no data"});
    } else if(req.query.username) {
      db.collection('users').doc("test").set({'RBLX' : `${req.query.username}`}, {merge: true});
      
      
      return res.send({"status": "error", "message": (req.query.username)});
    } else {
    }
  });  
  
  
};

module.exports = routes;