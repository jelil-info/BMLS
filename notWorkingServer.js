
var express = require('express');
var app = express();
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

//app.use(express.static('public'));
const ejs = require('ejs');
app.set('view engine', 'ejs');

/*app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('/index');
});*/


//CODES FOR DOWNLOADING FROM SERVER 

var http = require('http').Server(app);

//This will add button to link to your download page
//res.sendfile(link of html file in your pc)

app.get('/',function(req,res){ 
  res.sendFile('C:/Users/Oyekanmi Jelil/jelil-info1/views/index');
});
app.get('/download',function(req,res){
    res.download(__dirname +'/upload_folder/cv.pdf','cv.pdf');
});

app.get('/Thanks',function(req,res){
    res.sendFile('C:/Users/Oyekanmi Jelil/jelil-info1/views/thanksForDownloading.html')//Full path of thankyou.html file
    });


    //CODES FOR LINKS
    app.get('/home', (req, res) => {

      res.render('C:/Users/Oyekanmi Jelil/jelil-info1/views/home.html');
      
      });
    
      app.get('/myResume', (req, res) => {
    
        res.render('myResume');
        
        });
    //COdes for message to display after downloading
        app.get('/Thanks', (req, res) => {
    
          res.render('thanksForDownloading.html');
          
          });

      /*app.listen(port, function() {
            console.log('Our app is running on http://localhost:' + port);
        });*/


        
        
        
        
       var express = require('express');
        var path = require('path');
        var bodyParser = require('body-parser');
        var mongodb = require('mongodb');
        var fs = require('fs');
        var path = require('path');
        require('dotenv/config');
        
        var dbAtlas = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8chyx.mongodb.net/FormData?retryWrites=true&w=majority`;
        
        var dbConn = mongodb.MongoClient.connect(dbAtlas,{ useNewUrlParser: true , useUnifiedTopology : true});
        
        var app = express();
        
        
        app.use(bodyParser.urlencoded({ extended: false }));
       //app.use(express.static(path.resolve(__dirname, 'views')));





      app.use(express.static(path.resolve(__dirname, 'views')));
       app.get('/', function (req,res,next) {res.render('index.ejs')});

        
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));



        var mongoose = require("mongoose");
        mongoose.Promise = global.Promise;
        //mongoose.connect(dbAtlas);
        
        mongoose.connect(dbAtlas, { useNewUrlParser: true, useUnifiedTopology: true })
            
        
        var nameSchema = new mongoose.Schema({
            email: String,
            name: String,
            text: String
            
        });
        
        
        var User = mongoose.model("User", nameSchema);
        
        app.post("/addname", (req, res) => {
            var myData = new User(req.body);
            myData.save()
                .then(item => {
                    res.send("Name saved to database");
                })
                .catch(err => {
                    res.status(400).send("Unable to save to database");
                });
        });
        
        
        
        app.get('/view-feedbacks',  function(req, res) {
            dbConn.then(function(db) {
                db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
                    res.status(200).json(feedbacks);
                });
            });
        });


        app.listen(3000, () => {
            console.log("Server is running...");
          });
           
    

       // app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
        
        
        
          
        