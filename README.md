# startup

# **Elevator Pitch**

Imagine a game with multiple possibilities. You and your friends play the same game, but end up with completely different results. My application is a choose your own adventure game, in the wilds of the Amazon Jungle. "Jungle Mania" is a game where your choices determine your destiny. A prompt will appear, with two choices you can take. You login, play the game, and can compare your results with friends.

# **Rough Sketch**
![image](https://user-images.githubusercontent.com/123395871/215238309-f233773a-ca9d-4d43-a107-2fd84d5763cb.png)

# Amazon web services
My IP Address is **http://52.14.201.106**

The command to remote shell is ➜  ssh -i [key pair file] ubuntu@[ip address]
*example*: ➜  ssh -i ~/keys/production.pem ubuntu@53.104.2.123

## What I have learned from my Simon html:
I learned more in-depth about paragraphs, divisions, body and headers, and the href argument to include hyperlinks to other html files. This is all completely new to me since I have never worked in html before. I also thought the table sections all starting with t were really interesting, and helpful in organizing the different information stored.

To deploy files from terminal into my website, do 
./deployFiles.sh -k "C:\Users\haile\CS260\happy.pem" -h startup.haileyjohnson.click -s startup

## Simon CSS Assignment:
To deploy files for Simon:
./deployFiles.sh -k "C:\Users\haile\CS260\happy.pem" -h simon.haileyjohnson.click -s simon
 Honestly, playing the simon game looked super complex. I didn't realize it was really just a division with organized buttons within it. The CSS made it super clearer to understand. This also helped me understand the difference betwene padding, borders, and margins.

## Bootstrap Helpful link: https://www.w3schools.com/bootstrap/bootstrap_tables.asp
The link provided helped me a lot in understanding different bootstrap classes!

CSS what I have learned:
It becomes super easy to adjust the fonts and colors in your application by clarifying font sizes and colros in a CSS ID or class you have defined. Same thing with backgrounds. I also realized the differences between padding, borders, and margins once I started manipulating out all the different components in CSS.

HTML what I have learned:
I learned a lot of skills implementing forms, tables, and manipulating buttons and inputs with bootstrap in HTML. It took me a while to realize the head of the HTML file doesn't actually appear on the page, and the main and footer were fun to manipulate. 

## Things I learned from Simon Javascript:
There are actually tons of techniques I've learned about, and more I will learn as I implement them into my startup and practice... Queryselector is a powerful fucntion, but use queryselectALL when wanting to select every element in an HTML...
CreateElement is also another valuable function the Simon JavaScript files implement to manipulate the DOM and insert new scores in after a player has a score.

## Things I have learned from my startup JavaScript:
I learned a ton practicing storing items in the local storage of the server, and using maps just like I would use an array in C++. It took me a while to figure out how to output the personal outcome of a player to the screen after a player has finished the game, but I realized querySelector and creating element with a text content was powerful in outputting strings as follows:
    const section = document.querySelector('#result');
    const resultEl = document.createElement('p');
    
    resultEl.textContent = lastResult.ending;
    section.appendChild(resultEl);
    
I also spent a lot of time learning how to reset the scores, cause it would take up so much space and stop after 10 and then you couldn't put any new scores in... The following code was really helpfuyl in resetting the object in the local storage so I could do that:
function resetScores() {
  const blank = [];
  localStorage.setItem('allResults', JSON.stringify(blank));
}

## Simon Service Assignment
This assignment helped me understand the differences between the front end, and hosting endpoint for the back end applications. I also remember to reinstall the express module using **npm install express**.

It finally clicked when I was working through the video and setting up my service for my startup that express,static('public') will look into my public file and serve up my index.html file along with all my other ones!

When I applied this to my startup, it was super cool to see how i could run node index.js in my console and serve up my service through the JavaScript interpretor.

## Simon Database Assignment
I learned a ton about applying mongoDB. Resetting my environment variables amd actually setting up my database took a bit of time to understand. 
The .insertOne() function is very simple and easy to inset a json object into the mongo database. 

## Simon Login Assignment
This function  uses a secure cookie to store the authorization token for an authenticated user. 
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
  
  When a user is logged in, the cookie is added. When a user makes a secure request, the cookie is checked. When the user logs out, the cookie is removed.
  
  .findOne() is looking for a key in the mongo database... whileinsert.One() puts values into the mongo database.
  bcrypt.hash(password, 10); -> This function is used to HASH our password we create...
}


## Simon WebSocket
Websocket is how two clinets can interact with each other... force the browser to do something based on your backend... It's pinging the server to see if it has anything to say.
1. Need to load in the webSocket package with const{ WebSocketServer } = require('ws')
2. const wss = new WebSocketServer({ noServer: true }); this uses http, or the existing communication set up, to upgrade and create a new connection from that. Say you are going to create your own server.
Simon uses WebSocket with peerproxy.js!  Simply just shows who is all playing and scoring at the same time... Prof. Jensen designed a class called PeerProxy which sets up the websocket, then makes and pushes connections with connectuons.push()... then bring in peer proxy into index.js and starts new PeerProxy(httpService);
REMEMBER there are things in play.js to manipulate to broadcast a player's new score!

## Startup Service
Super important to set up environment variables locally with your password and username and direction to mongo database!
MongoDB will build data collections for you when you do const userCollection = client.db('startup').collection('user');

Main packages needed to install:
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');

Using broadcastEvent() with websocket is what will update events to the entire server and any users on it.
Using POST method is uploading data to my mongoDB collection, Fetch is getting information from my collection...
const app = express();

 const options = { 
    limit: 10,
    sort: {date: -1},
  };
  The code above allows me to sort my results from the most recent to the oldest
  
  
  ## Startup React
  React essentially is using one html, and one "root" id to dynamically insert new pages for the user.
  
  The "routes" lines directs the page to different pages and options:
  <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
          exact
        />
        <Route path='/play' element={<Play userName={userName} />} />
        <Route path='/scores' element={<Scores />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
   The code: <NavLink className='nav-link' to='play'>
                  Play
                </NavLink> 
   allows you to toggle through different navigations and change the main body of the page you are on.
