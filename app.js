const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app=express();
// app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res) {
  res.sendFile(__dirname+"/index.html")
  app.post("/", function(req, res){
   const query = req.body.cityName
   const apikey="b26e42c08b36f8cfdb1a78f5142d3f30"
   const unit="metric"
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apikey +"&units="+unit
  https.get(url,function(response) {
     console.log(response);
     response.on("data", function(data) {
     const weatherdata=JSON.parse(data);
     const temp = weatherdata.main.temp;
     const description = weatherdata.weather[0].description
     const icon = weatherdata.weather[0].icon
     const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
     res.set("Content-type", "text/html");
     res.write("<h3>The temp in "+ query+ " is " + temp + " degrees</h3> ");
     res.write("<h4> Weather currently in "+ query +" is " + description + "</h4>");
     res.write("<img src=" + imageURL + ">");



   })


     res.send();

   })
 })

});

  // })

app.listen(3000,function() {
  console.log("Server started at port 3000");
});
