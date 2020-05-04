const roblox = require("noblox.js");
const fs = require('fs')
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

var getAuthorized = function(req,res){
      if (req.headers.secretcode === "eec1e4cf51aed0f3ced58e73cfe9a63a5b7bc479e6b9ac6de067e385242eb4c5"){
        console.log("authorized access http;")
      return true
    } else {
       console.log("unauthorized access http;")
      res.send('HTTP/1.1 401 Unauthorized')
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

  app.get("/test", (req,res) => {
    res.status(200)
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

    app.get("/checkproduct", function(req, res) {
    if (!getAuthorized(req,res) === true){return}
    if (req.query.id && req.query.product){
    var user = req.query.id;
      if (checkBlacklisted(user) == true){return}
      var docRef = db.collection("users").doc(user);
docRef.get().then(function(doc) {
    if (doc.data()[req.query.product]) {
    return res.send({ success: "true" })
    } else {
    return res.send({ errormessage: "yes" })
    }
      })
}
});
  
  app.get("/checkuser", function(req, res) {
    if (!getAuthorized(req,res) === true){return}
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
      if (!getAuthorized(req,res) === true){return}
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
  
      app.get("/checkpromo", function(req, res) {
     if (!getAuthorized(req,res) === true){return}
    if (req.query.id){
    var user = req.query.id;
      var docRef = db.collection("promocodes").doc(user);
docRef.get().then(function(doc) {
if (doc.exists){
    return res.send({ success: doc.data()})
} else {
    return res.send({ errormessage: "no promo code found" })
}
      })
}
});

app.get("/checkperms", function(req,res){
  if (req.query.plr){
      var doc = db.collection("users").doc(req.query.plr);
      doc.get().then(function(doc){
        if (doc.data().SPECIAL){
        return res.send({ success: doc.data().SPECIAL})
        } else {
          return res.send({ success: "indiviual"})
        }
      })
  }
})
  
  app.get("/checkimmigration", function(req, res) {
    if (!getAuthorized(req,res) === true){return}
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

app.get("/checkbagdrop", function(req, res) {
  if (!getAuthorized(req,res) === true){return}
  if (req.query.id){
  var user = req.query.id;
    if (checkBlacklisted(user) == true){return}
    var docRef = db.collection("users").doc(user);
docRef.get().then(function(doc) {
  if (doc.data().bagdrop) {
  return res.send({ success: "true" })
  } else {
  return res.send({ errormessage: "yes" })
  }
    })
}
});
  
    app.get("/checkstaffpanel", function(req, res) {
      if (!getAuthorized(req,res) === true){return}
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
        if (!getAuthorized(req,res) === true){return}
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
  
app.get("/rating", function(req, res) {
  //if (!getAuthorized(req,res) === true){return}
  if (req.query.rating){
    var user = req.query.user
    res.send({ success: "true" })
    roblox.getUsernameFromId(user).then(a => {
      roblox.getPlayerInfo(user).then(function(info) {
    discord.channels.cache.get("674502197769404427").send({embed: {
      color: 3447003,
author: {
name: info.username,
icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
},
title: user,

fields: [{
name: "Ratings",
value: req.query.rating + " out of 100"
}

],
timestamp: new Date(),
footer: {
text: "Vortex Purchasing"
}
}})
      })
    })
  }
  
});
var product
app.get("/addproduct", function(req, res) {
    if (!getAuthorized(req,res) === true){return}
    if (req.query.id){
      var data = req.query.data
    var user = req.query.id;
      var docRef = db.collection("users").doc(user);
      if (req.query.data) {
docRef.get().then(function(doc) {
    if (doc.exists) {
        
  fs.readFile('products.json','utf8',function(err,data){
    if (err) throw err;
    var setup = true
    var products = JSON.parse(data)
    
    products.forEach(function(item){
      if (item.id === data){
        product = item
      }
    })
  })

  if (product.setup == null){
    setup = false
  }
        discord.users.cache.get(doc.data().discord).send({embed: {
          title:("Purchase Received!"),
          description: ("Thank you for purchasing the " + product.name + " you have automatically been roled to " + product.role + ` You can get the Model by clicking on this link(${product.model}) Make sure to read the README inside it and if you have any questions, create a support ticket in #commands by doing, !support [ reason ]`)}});      
                
    let myGuild = discord.guilds.cache.get('670903593737519104');
    let member = myGuild.members.cache.get(doc.data().discord)
    member.roles.add(myGuild.roles.cache.find(role => role.name === product.role));
            db.collection('users').doc(`${req.query.id}`).set({product: "owned"},{merge: true});
      

      
      roblox.getUsernameFromId(user).then(a => {
        roblox.getPlayerInfo(user).then(function(info) {
      discord.channels.cache.get("693274563961815060").send({embed: {
        color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Purchase Received",
          value: "Product: " + product.name
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
