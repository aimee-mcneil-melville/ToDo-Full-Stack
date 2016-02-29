# Meowtown

## Concepts

Number | Name
-------|------
1 | REST
2 | Express
3 | Handlebars
4 | Eugene


We're going to play with a fun project called [meowtown](http://meowtown.herokuapp.com/cats) that was written by [Eugene.](https://github.com/data-doge)


Eugene is an EDA grad, taught some of the course and is some kind of blend of coder + artist + musician. He also has a very cool [website](http://fuckafucka.com) but it's down at the moment.

Unfortunately Eugene's version of meowtown is written in rails. That's oldschool so we're going to improve things and rewrite it using node.


## Release 1

Clone down the repo, run ```npm i``` and then run ```npm start```. Visit [http://localhost:3000](http://localhost:3000)

Notice that when you run npm start it doesn't exit. The server has to stay running to listen for requests from your browser.

## Release 2
Visit [http://localhost:3000/cats/1](http://localhost:3000/cats/1)
You should see the id printed in the console. Yay! Now we can find the cat the user is looking for and render just that cat out to the user. Get the correct cat from the cats variable and pass it as the second argument to the render function.

Now fill out the catsShow.hbs template so that you can see the name of the cat. 

## Release 3
Go study meowtown and add some more properties to the cats variables. Now update the catsIndex and catsShow templates.
