const roblox = require('noblox.js')
const fs = require("fs")
const editJsonFile = require('edit-json-file')
const express = require('express')
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
    res.status(403).json({
        error: "You do not have permission to use this."
    })
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

  app.get("/products", (req,res) => {
    let file = editJsonFile('./products.json').read()
    res.send(file)
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

app.get("/getproducts", function(req, res) {
  if (!getAuthorized(req,res) === true){return}
  if (req.query.id){
    
    db.collection("users").doc(req.query.id).get().then(querySnapShot => {
      if (querySnapShot.empty){
        return;
      }

        var data = querySnapShot.data();

delete data['discord']
delete data['SPECIAL']
  var products = []

             for (var i in data) {
              let file = editJsonFile('./products.json')
              var item = file.get(i)
               products.push(item.name)
}
return res.send(products)
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
app.get("/addproduct", function(req, res) {
    if (!getAuthorized(req,res) === true){return}
    if (req.query.id){
      var data = req.query.data
    var user = req.query.id;
      var docRef = db.collection("users").doc(user);
      if (data) {
docRef.get().then(function(doc) {
    if (doc.exists) {

      let file = editJsonFile('./products.json')
      var item = file.get(req.query.data)
      console.log("1?")
      console.log("the product is called " + item.name + " its price is " + item.price)

        discord.users.cache.get(doc.data().discord).send({embed: {
          title:("Purchase Received!"),
          description: ("Thank you for purchasing the " + item.name + " you have automatically been roled to " + item.role),
          
          fields:[{
            name: "Model:",
            value: `You can get the Model by clicking on this [link](${item.model}) Make sure to read the README inside it and if you have any questions, create a support ticket in #commands by doing, !support [ reason ]`,
          }]
        }});

        if (item.setup){
          discord.users.cache.get(doc.data().discord).send({embed: {
           fields: [{
             name: "Setup Video:",
             value: `There is a setup video available for this product! To watch it press this [link](${item.setup})`
           }]
          }});
        }
    let myGuild = discord.guilds.cache.get('670903593737519104');
    let member = myGuild.members.cache.get(doc.data().discord)
    member.roles.add(myGuild.roles.cache.find(role => role.name === item.role));
    var obj = {}
    obj[item.id] = "owned"
            db.collection('users').doc(`${req.query.id}`).set(obj,{merge: true});

            res.send({ success: "true" })

      
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
          value: "Product: " + item.name
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
    
      })
      
      };
      
}
});

  app.get("/generatedevproduct",(req,res) => {
      if (!getAuthorized(req,res) === true){return}

      const universeId = parseInt(req.body.universeId)
      const name = req.body.name
      const price = parseInt(req.body.price)

      const args = {
        universeId: universeId,
        name: name,
        priceInRobux: price
      }

      roblox.addDeveloperProduct(args).then(function(productDetails) {
        productId = productDetails.productId
        console.log("["+universeId+"] Created product "+name+" for "+price+" Robux.")

        return res.status(200).json({
          message: "["+universeId+"] Created product "+name+" for "+price+" Robux.",
          productId: parseInt(productId)
        })
      }).catch(function(err) {
        console.log("["+universeId+"] Failed to create product "+name+" for "+price+" Robux: "+err.message)
        
        return res.status(400).json({
          error: err.message
        })
      })
  })  



app.use(function (err, req, res, next) {
  console.error(err.stack)
})

var settings = require('./settings.json')
function login () {
  return roblox.cookieLogin(settings.cookie)
  //return roblox.cookieLogin("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_82DE2BC3EDD3E944A845279D3C2F248AD64C2BF785C263F4E5E7399455BD5AEC30824FBA7B0244C50DEB46080D64EE0DCFDB07E5C83BE0FF60A68A87463196A9CEAE512614E54003C98EFEFE7C97D3A81E3BC1A026AEA7EE2A29AADCC76E238DA0C03848055C1C36137F47057DE56F04124AA0ECEF4C941791ED7DBC4F012170389727E4A2DA9F7156F7335C12D3B2436A36C9C21C588A914167C0E922FFD42A0EA21D530592871C6E0F78A94B8C645211041000700BACF16B2450A36C41C28EA9C77C3ACE4DE4DA9BE4AD5FA295890288974999314D4AA3ED705159A75EFD946928C288278EECB0B2999ADBA3E032553C108FA16B297E7A3E0A66900EDF253D1BA57D6EC533F071EA098B8AE555DCE14032291B7D14653520033EA3987D820505C8353A19CEFE062DE75EF04814FB871977D84A")
}
login().then(function () {
  app.listen(port, function () {
    console.log('Listening on port ' + port)
  })
})
};


module.exports = routes;
