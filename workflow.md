I try not to work on master. When I start working on a project I’m either cloning or initializing like:

``` shell
git clone git@github.com:strand/dude.git
# Clones the remote repository from github.
```

OR

``` shell
git init
# Initializes the repo
git add .
# adds everything in the current directory (aka `.`)
git commit -m "First commit!!! WHooOoo0!"
# Commits changes with a message.
```

I try not to work on master ever. Instead, I checkout new branches for any work that I want to start with:

``` shell
git checkout -b new_branch
# creates and checks out a branch called new_branch
```

This is essentially an alias for these two commands:

``` shell
git branch new_branch
# creates a branch called new_branch
git checkout new_branch
# checks out a branch called new_branch
```

Then I go ahead and do some awesome work. Every time I make substantial progress, even if it’s just a few lines of code, I tend to make a commit. It’s easier to get rid of too many commits in the future than to break up too few commits well.

Usually I add files like this:

``` shell
git add app/controllers/giraffes_controller.rb
# Adds the giraffe controller.
```

OR

``` shell
git add -p
# Progressively add chunks of code from the changed files in the project.
```

And then I’ll double check that I’ve staged my changes with:

``` shell
git status
# Gives me the current staged status, which I use to verify that I have the files I want ready for committing.
```

Sometimes I make mistakes, and I might have added a file I don’t want in the current commit to the staging area, when this happens I run:

``` shell
git reset config/twitter.yml
# Unstages the file, keeping it on the file system, but preventing the changes from being commited.
```

When things are looking good, I commit with:

``` shell
git commit -m "Add create action to giraffe controller."
```

and then I push up with

``` shell
git push origin new_branch
```

I repeat this process for several commits, until I think my feature is complete. Then I go to github and submit a pull request to master. A team member reviews my code, and if it doesn’t complete the feature, they comment and may close the PR or let me know what I can do to complete the feature. Once the feature is completed, the PR is merged into master. On my local machine I pull down the remote master with:

``` shell
git checkout master
git pull origin master
```

And then I start the cycle again with:

``` shell
git checkout -b new_new_branch
```
