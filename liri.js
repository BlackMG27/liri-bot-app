//[dotenv]
require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');



//var spotify = new Spotify(keys,spotify)

//User command choice
//process argv or inquirer
// var liriCommmand = process.argv;
// li
var liriCommand = process.argv[2];
// node liri.js spotify-this-song All The Small Things
var liriChoice = process.argv.slice(3).join(" ");
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

function spotifyThisSong() {
    spotify.search({
        type: 'track',
        query: liriChoice
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

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
}

//cond(concert-this)
//function concert
//cond(movie-this)
//function movie
//cond(spotify-this-song)
//function spotifySong
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