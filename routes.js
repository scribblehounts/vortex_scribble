const roblox = require("noblox.js");

var randomString = function (len, bits)
{
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toLowerCase();
};

var getAuthorized = function(req){
      if (req.headers.secretcode === "eec1e4cf51aed0f3ced58e73cfe9a63a5b7bc479e6b9ac6de067e385242eb4c5"){
        console.log("authorized access http;")
      return true
    } else {
       console.log("unauthorized access http;")
      return false
    }
}

var routes = function(app, db, discord) {
  /*app.get("/", function(req, res) {
    console.log("Received GET");
  });*/
  
  var checkBlacklisted = function(x){
      var docRef = db.collection("users").doc(x);
docRef.get().then(function(doc) {
    if (doc.data().blacklisted) {
      console.log("blacklisted")
    return true
    } else {
      console.log("not blacklisted")
    return false
    }
})
}

  app.get("/", (req,res) => {
  res.sendStatus(200);
});
  
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
    if (!getAuthorized(req) === true){return}
    if (req.query.id){
    var user = req.query.id;
      if (checkBlacklisted(user) == true){return}
      var docRef = db.collection("users").doc(user);
docRef.get().then(function(doc) {
    if (doc.data().ife) {
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
}
});
  
    app.get("/checkverified", function(req, res) {
      if (!getAuthorized(req) === true){return}
    if (req.query.id){
    var user = req.query.id;
      var docRef = db.collection("users").doc(user);
docRef.get().then(function(doc) {
if (doc.exists){
    return res.send({ success: "true" })
} else {
    return res.send({ errormessage: "yes" })
}
      })
}
});
  
  app.get("/checkimmigration", function(req, res) {
    if (!getAuthorized(req) === true){return}
    if (req.query.id){
    var user = req.query.id;
      if (checkBlacklisted(user) == true){return}
      var docRef = db.collection("users").doc(user);
docRef.get().then(function(doc) {
    if (doc.data().immigration) {
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
}
});
  
    app.get("/checkstaffpanel", function(req, res) {
      if (!getAuthorized(req) === true){return}
    if (req.query.id){
    var user = req.query.id;
      if (checkBlacklisted(user) == true){return}
      var docRef = db.collection("users").doc(user);
docRef.get().then(function(doc) {
    if (doc.data().staffpanel) {
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
}
});
  
      app.get("/verify", function(req, res) {
        if (!getAuthorized(req) === true){return}
    if (req.query.id){
    var user = req.query.id;
      var docRef = db.collection("verification").doc(user);
docRef.get().then(function(doc) {
    if (doc.exists) {
    return res.send({ code: `${doc.get("Code")}` })
    } else {
      var code = randomString(4)
      db.collection('verification').doc(user).set({
        RBLX: user,
        Code: code
      })
      .then(function(){
        console.log("created")
        res.send({code: code})
      });
      setTimeout(function(){
        db.collection('verification').doc(user).delete()
      },900000);
    }
      })
}
});
  
  
  
  app.get("/check", function(req, res) {
        var user = req.query.id;
    if (req.query.id){

      db.collection('users').where('RBLX','==',user).get().then(exist => {
        if (exist.empty){
          console.log("empty")
return res.send({ errormessage: "yes" });
        } else {
          console.log("true")
          return res.send({ success: "true" })
        }
      })

          
}
});
  
    app.get("/addproduct", function(req, res) {
      if (!getAuthorized(req) === true){return}
    if (req.query.id){
    var user = req.query.id;
      var rating = req.query.rating;
      var docRef = db.collection("users").doc(user);
      if (req.query.data === "ife") {
docRef.get().then(function(doc) {
    if (doc.exists) {
        discord.users.get(doc.data().discord).send("Thank you for purchasing the IFE! Please do the command, !retrieve in the Vortex server to be Ranked to your role");      
            db.collection('users').doc(`${req.query.id}`).set({ife: "owned"},{merge: true});
      roblox.getUsernameFromId(user).then(a => {
        roblox.getPlayerInfo(user).then(function(info) {
      discord.channels.get("693274563961815060").send({embed: {
        color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Purchase Received",
          value: "Product: IFE"
        }
      ],
        timestamp: new Date(),
        footer: {
          text: "Vortex Purchasing"
        }
      }})
                          discord.channels.get("674502197769404427").send({embed: {
                color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Ratings",
          value: rating + " out of 100"
        }

      ],
        timestamp: new Date(),
        footer: {
          text: "Vortex Purchasing"
        }
      }})
        })
      })
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
      };
      
            if (req.query.data === "immigration") {
docRef.get().then(function(doc) {
    if (doc.exists) {
        discord.users.get(doc.data().discord).send("Thank you for purchasing the Immigration! Please do the command, !retrieve in the Vortex server to be Ranked to your role");         
      db.collection('users').doc(`${req.query.id}`).set({immigration: "owned"},{merge: true});
            roblox.getUsernameFromId(user).then(a => {
        roblox.getPlayerInfo(user).then(function(info) {
      discord.channels.get("693274563961815060").send({embed: {
        color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Purchase Received",
          value: "Product: Immigration"
        }
      ],

    
        timestamp: new Date(),
        footer: {
          text: "Vortex Purchasing"
        }
      }})
                          discord.channels.get("674502197769404427").send({embed: {
                color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Ratings",
          value: rating + " out of 100"
        }

      ],
        timestamp: new Date(),
        footer: {
          text: "Vortex Purchasing"
        }
      }})
        })
      })
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
      };
      
            if (req.query.data === "staffpanel") {
docRef.get().then(function(doc) {
    if (doc.exists) {
        discord.users.get(doc.data().discord).send("Thank you for purchasing the Staff Panel! Please do the command, !retrieve in the Vortex server to be Ranked to your role");      
            db.collection('users').doc(`${req.query.id}`).set({staffpanel: "owned"},{merge: true});
      roblox.getUsernameFromId(user).then(a => {
        roblox.getPlayerInfo(user).then(function(info) {
      discord.channels.get("693274563961815060").send({embed: {
        color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Purchase Received",
          value: "Product: Staff Panel"
        }

      ],
        timestamp: new Date(),
        footer: {
          text: "Vortex Purchasing"
        }
      }})
                discord.channels.get("674502197769404427").send({embed: {
                color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Ratings",
          value: rating + " out of 100"
        }

      ],
        timestamp: new Date(),
        footer: {
          text: "Vortex Purchasing"
        }
      }})
        })
      })

    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
      };
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
