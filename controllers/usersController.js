/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

function renderLandingPage (req, res) {
  res.render('./pages/landing_page', {user: req.user});
}

function getAPI(req, res){
  res.json({
    message: "This is the API for Netflix and Chill",
    documentation_url: "https://github.com/takshingli810/NetlfixAndChill",
    base_url: "http://netflixandchill.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

//SHOW ALL LIKES OF ALL USERS
function getUsersAPI (req, res){
  User.find(function(err, users){
    if(err){
      console.log("ERROR: ", err);
    }

    res.json({users: users});
  });
}

// //Click on '+' and add movie to 'Users' 'movies' attribute in API
function addMoviesToUsersAPI(req, res) {
  var imdbID = req.body.imdbID;
  var userID = req.body.userID;

  User.findOne({_id: userID}, function(err, user){
      if(err){
        console.log("ERROR WITH FIND ADD MOVIES", err);
      }
      else{
        console.log("HITTING FIND ONE IN ADD MOVIES ");
        //FIND IF USER IS ALREADY ON ARRAY
        if (user.movies.indexOf(imdbID)=== -1 ){
          console.log("IMDBID: ", imdbID);
          //pushes user onto Like users array
          user.movies.push(imdbID);
          user.save( function(err){
            if(err){
              console.log("ERROR WITH SAVE: ", err);
            }
            else{
              res.status(201);
            }
          });
        };

        console.log("USER ID: ", userID);
      }

    });
      console.log("ohno");
};


function showUserAPI(req, res){
  User.findOne({_id: req.params.id}, function(err, user){
    if(err){
      console.log("Show users route not working", err);
    }
    res.json(user);
  })
}

function showUserMoviesAPI(req, res){
  User.findOne({_id: req.params.id}, function(err, user){
    if(err){
      console.log("Show user movies route not working", err);
    }
    else{
      res.json(user.movies);
    }
  })
}

module.exports = {
	renderLandingPage: renderLandingPage,
	getAPI: getAPI,
	getUsersAPI: getUsersAPI,
  addMoviesToUsersAPI: addMoviesToUsersAPI,
  showUserAPI: showUserAPI,
  showUserMoviesAPI: showUserMoviesAPI
};
