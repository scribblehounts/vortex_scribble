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
      return res.send("invalid username");
    } else if(req.query.data === "plus") {
      var getUser = db.collection('users').doc(req.query.username)
      getUser.get().then(function(doc){
        if (doc.exists) {
          return res.send({"veroStatus" : doc.data().veroPlus});
        } else if(req.query.data === "lite") {
          return res.send("unable to locate lite");
        } else {
          return res.send("invalid data")
        }
          
      })
      
      
    }
  });  
  
  
};

module.exports = routes;