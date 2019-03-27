# liri-bot-app
This is a node command line application that utilizes the Spotify, OMDB, and Bands in Town APIs.

## How This Works
When you open file in the terminal...
* type node liri.js and the command that you want the file to run:
  - spotify this song 
  - concert-this
  - movie-this
  - do-what-it-says
* the commands in detail
  - spotify-this-song < song title >
    - gives you the:
      * Artist(s) Name
      * Album Name 
      * Song Name
      * Album Release Date
      * Song Preview
  - movie-this < movie title >
    - gives you the:
      * Movie Title
      * Year Released 
      * Movie Director(s)
      * IMDB Rating
      * Rotten Tomatoes Rating
      * Movie Language(s)
      * Movie Actor(s)
      * Movie Genre(s)
      * Movie Plot
  - concert-this < artist name >
    - gives you the:
      * Venue Name
      * Venue Date
      * Venue Location
  - do-what-it-says
    - reads the file, random.txt
    - does what the text says
    - gives you the value in the console
  
 ### Remember to install the necessary packages in the packages.json file before trying out the commands
