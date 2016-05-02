# Meowtown

We're going to play with a fun project called [meowtown](http://meowtown.herokuapp.com/cats) that was written by [Eugene.](https://github.com/data-doge)

Unfortunately Eugene's version of meowtown is written in rails. That's oldschool so we're going to improve things and rewrite it using node.


## Release 1
Install nodemon. This will watch for changes to our files and restart the server. ```npm i -g nodemon```

Clone down the repo, run ```npm i``` and then run ```npm start```. Visit [http://localhost:3000](http://localhost:3000)

Notice that when you run npm start it doesn't exit. The server has to stay running to listen for requests from your browser.

Visit [http://localhost:3000/](http://localhost:3000/)

What happens? Can you go to app.js and work out what you are seeing and why you are seeing it? Talk it through with your pair and compare ideas.

## Release 2

Visit [http://localhost:3000/cats/1](http://localhost:3000/cats/1) and check the console.

You should see the id printed in the console. Yay! Now we can find the cat the user is looking for and render just that cat out to the user. Get the correct cat from the cats variable and pass it as the second argument to the render function.

Fill out the catsShow.hbs template so that you can see the name of the cat. (hint, look at how '/cats' passes the cats object to the view if you are stuck with passing the individual cat to the catShow view)

## Release 3

Go study meowtown and add some more properties to the cats variables. Now update the catsIndex and catsShow templates.

## Release 4

Write a new route that listens for requests to /cats/new. Render out the catsNew form. Check it out!

## Release 5

What happens when you submit your form? You should see some stuff in logged in the console. Take that data, make a new cat object and add it to your cats variable.

## Release 6

Copy the contents of the new cat form and add some handlebars expressions {{}} so that we can fill in the form with the cats existing data.
Write a new route that listens for requests to cats/edit/:id. Go get the cat by id. Pass it to the render function.

## Release 7

Add a route that listens for POST requests to /cat/id. Use what you've learned to update the cat in the cats array.

## More

Work out how to store the cats variable in a json file. You might want to make some functions that can load and save cats.

Add the help page.

Implement the rule that removes lives from the cat when it's viewed. Delete a cat when it's got zero lives.

Sort cats by when they were last viewed by a user.

Appropriate Eugene's css file and add it to your server.


## Resources

Number | Name
-------|------
1 | [REST](http://guides.rubyonrails.org/routing.html)
2 | [Express](http://expressjs.com/)
3 | [Handlebars](http://handlebarsjs.com/)
4 | Eugene

