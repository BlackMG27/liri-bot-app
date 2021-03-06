//get the variables
require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
//get the user input
var liriCommand = process.argv[2];
var liriChoice = process
    .argv
    .slice(3)
    .join(" ");

//switch statement for liriCommands
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
    //checks to see if the user entered something
    if (!liriChoice) {
        //sets liriChoice to default
        liriChoice = 'The Sign';
    }
    console.log(liriChoice);
    //searches spotify
    spotify.search({
        type: 'track',
        query: liriChoice,
        limit: 9
    }, function (err, data) {
        //catches the error
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // gets the specific artist and album data as it iterates through the
        // data.tracks.items array
        for (song in data.tracks.items) {
            console.log('----------------------------------------------------------');
            console.log(`Artist Name: ${data.tracks.items[song].album.artists[0].name}`);
            console.log(`Album Name: ${data.tracks.items[song].album.name}`);
            console.log(`Song Name: ${data.tracks.items[song].name}`);
            console.log(`Album Release Date: ${moment(data.tracks.items[song].album.release_date).format('MM/DD/YYYY')}`);
            console.log(`Song Preview: ${data.tracks.items[song].preview_url}`);
            console.log('----------------------------------------------------------');
        }


    });
}

function movieThis() {
    if (!liriChoice) {
        liriChoice = `Mr. Nobody`;
    }
    //formats liriChoice
    liriChoice = liriChoice.replace(/ /g, '+');
    //puts liriChoice in the movie URL
    var movieURL = `https://www.omdbapi.com/?t=${liriChoice}&y=&plot=short&apikey=trilogy`;
    //calls axios to get the api data
    axios
        .get(movieURL)
        .then(function (response) {
            //gets the movie info
            console.log('----------------------------------------------------------');
            console.log(`Movie Title: ${response.data.Title}`);
            console.log(`Year Released: ${response.data.Year}`);
            console.log(`Movie Director(s): ${response.data.Director}`)
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Movie Language(s): ${response.data.Language}`);
            console.log(`Movie Actor(s): ${response.data.Actors}`);
            console.log(`Movie Genre(s): ${response.data.Genre}`);
            console.log(`Movie Plot: ${response.data.Plot}`);
            console.log('----------------------------------------------------------');
        })
        .catch(function (error) {
            console.log(`An error occurred: ${error}`);
        });
}

function concertThis() {
    //console.log(liriChoice); gets rid of the white spaces
    liriChoice = liriChoice.replace(/ /g, '%20');
    //sets up the api call
    var concertURL = `https://rest.bandsintown.com/artists/${liriChoice}/events?app_id=e0fa108c-68a4-472d-90fc-7da6bc210785`;
    //console.log(concertURL); gets the ajax calls
    axios.get(concertURL)
        //smacks the api and spits out the information
        .then(function (response) {
            //iterates through the information
            for (art in response.data) {
                console.log('----------------------------------------------------');
                console.log(`Venue Name: ${response.data[art].venue.name}`);
                console.log(`Venue Date: ${moment(response.data[art].datetime).format('MM/DD/YYYY')}`);
                console.log(`Venue Location: ${response.data[art].venue.city}, ${response.data[art].venue.region}, ${response.data[art].venue.country}`);
                console.log('----------------------------------------------------');
            }
        })
        //catches the error
        .catch(function (error) {
            console.log(`An error occurred: ${error}`);
        });
}

function doWhatItSays() {

    fs
        .readFile('./random.txt', 'utf8', function (error, data) {
            //if there's an error
            if (error) {
                console.log(`An error has occurred: ${error}`);
            } else {
                //splits the data into an array
                var whatSays = data.split(', ');
                console.log(whatSays);
                //sets the liriCommand
                liriCommand = whatSays[0];
                //sets the liriChoice
                liriChoice = whatSays
                    .slice(1)
                    .join(' ');
                //gets rid of the quotations
                liriChoice = liriChoice.replace(/"/g, / /);
                //commands based on the liriCommand
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
                }

            }
        })
}