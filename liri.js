//[dotenv]
//get the variables 
require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
//get the user input 
var liriCommand = process.argv[2];
var liriChoice = process.argv.slice(3).join(" ");


//var spotify = new Spotify(keys,spotify)

//User command choice
//process argv or inquirer
// var liriCommmand = process.argv;
// li

// node liri.js spotify-this-song All The Small Things
//store in userChoice
//chekc for user command 
//if or switch
switch (liriCommand) {
    case 'spotify-this-song':
        spotifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'concert-this':
        concertThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}
//spotify function
function spotifyThisSong() {
    //searches spotify 
    spotify.search({
        type: 'track',
        query: liriChoice
    }, function (err, data) {
        //catches the error
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //gets the specific data 
        console.log(data);
        console.log('--------------------------------')
        console.log(data.tracks.items[0]);
        console.log('--------------------------------')
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name);
        //console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].album.preview_url);
    });
}

function movieThis() {
    console.log(liriChoice);
    liriChoice = liriChoice.replace(/ /g, '+');
    console.log(liriChoice);
    var movieURL = `https://www.omdbapi.com/?t=${liriChoice}&y=&plot=short&apikey=trilogy`;
    //console.log(movieURL);
    axios.get(movieURL)
        .then(function (response) {
            /*
             * Title of the movie.
             *Year the movie came out.
             *Movie Director
             *IMDB Rating of the movie.
             *Rotten Tomatoes Rating of the movie.
             *Country where the movie was produced.
             *Language of the movie.
             *Plot of the movie.
             *Actors in the movie.
             */
            console.log(`Movie Title: ${response.data.Title}`);
            console.log(`Year Released: ${response.data.Year}`);
            console.log(`Movie Director(s): ${response.data.Director}`)
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Movie Language: ${response.data.Language}`);
            console.log(`Movie Actor(s): ${response.data.Actors}`);
            console.log(`Movie Plot: ${response.data.Plot}`);
        })
        .catch(function (error) {
            console.log(`An error occurred: ${error}`);
        });
}

function concertThis() {
    console.log(liriChoice);
    liriChoice = liriChoice.replace(/ /g, '%20');
    var concertURL = `https://rest.bandsintown.com/artists/${liriChoice}/events?app_id=e0fa108c-68a4-472d-90fc-7da6bc210785`;
    console.log(concertURL);
    axios.get(concertURL)
        .then(function (response) {
            console.log(response.data);
            console.log('--------------------------------');
            console.log(response.data[0].venue.name);
            console.log(moment(response.data[0].datetime).format('MM/DD/YYYY'));
            console.log(`${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country}`);
        })
        .catch(function (error) {
            console.log(error);
        });
}

//cond(concert-this)
//function concert
//cond(movie-this)
//function movieThis
//cond(spotify-this-song)
//function spotifyThisSong
//cond(do-what-this-says)
//function doWhatThisSays

//function concert(userChoice)
//have to use axios
//store in concertURL
//store results in result
//print the venue name, location and date (use moment.js ("MM/DD/YYYY"))

//function doWhatItSays()
//fs.readFile 
//split the string
//data.split()
//get the second value 
//data[1]
//check for the first command
//data[0]
//run the appropriate function

//function spotify()
//