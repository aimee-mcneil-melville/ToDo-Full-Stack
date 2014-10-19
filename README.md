# Two Truths and a Lie.

## Learning Competencies

* Use git and github to work on projects.
* Use a standard git workflow, including branching and pull requests
* Communicate with others using github.

## Summary

Let's get to know each other better, using git and github! We'll play an icebreaker called Two Truths and a Lie, but instead of sitting around and chatting in person, we're going to use github to chat about what the lie is.

## Releases

### Release 0 : Clone the repo and create a branch

For Rubies you'll first need to enter the following terminal / iterm command. Sharpies simply open up githubshell. 

```shell
# For Rubyist only!

weare YOUR_GIT_USER_NAME and YOUR_PAIRS_GIT_HUB_USER_NAME
```

Clone this repo. In your browser find the clone url in the sidebar and copy it. In your terminal, run the following command, replacing CLONE_URL with the url you copied:

```shell
git clone CLONE_URL
```

Now we're going to create a branch! To do this we use the `git branch` command. `git branch` on its own lists out all local branches, but when you give it an argument it creates a new branch. A new branch is a copy of the current branch with a different name.

In your terminal, run the following command, replacing YOUR_NAME with your name:

```shell
git branch YOUR_NAME_YOUR_PAIRS_NAME 
# creates a branch called YOUR_NAME_YOUR_PAIRS_NAME 

git checkout YOUR_NAME_YOUR_PAIRS_NAME 
# checks out a branch called YOUR_NAME_YOUR_PAIRS_NAME 

# You can also do this in one step as:
git checkout -b YOUR_NAME_YOUR_PAIRS_NAME 
```

Modify the file two_truths.md so that for each of you it contains your name, and three facts about you. One of these facts should be completely made up.

Add and commit your file to the project with the following commands:

```shell
git add source/Ruby OR CS/two_truths.md
# Stages the file two_truths.md to the repo.

git commit -m "Added facts about Example McExampleson"
# Commits the staged change to the repo with the message above.

```

Now push up your branch to github with

``` shell
git push origin YOUR_NAME_YOUR_PAIRS_NAME 
```

**DO NOT MERGE YOUR PULL REQUEST IN MASTER!!**

* Why not? What would happen if everyone merged their branches into master?

### Release 1 : Find The Lie
Samson will guide you to find the cohort-mates who you are going totry to find their lie. Ask Samson who you're busting!

1. Pull your cohort-mates branch from github into your local repository.

```shell
git pull origin THEIR_BRANCH
```

2. Checkout this branch.

```shell 
git checkout THEIR_BRANCH
```

4. Open the two_truths.md and add the word **LIE** to the line you think is a lie.

5. Add the changed file to your git staging and commit it.

```shell
git add two_truths.md
git commit -m "Found the lie"
```

6. Push this branch to github

```shell
git push origin THEIR_BRANCH
```

7. Submit a pull request on github of your changes.

### Release 2: Come Clean

Now it's time to come clean (or not).

Once someone has submitted a LIE pull request on your branch you can comment on the pull request with:

* "Yep you got it" or
* "Nope but perhaps you really meant to choose #1" or (if your devious)
* "Nope, keep guessing".

In any case, close the pull request and
** DO NOT MERGE TO MASTER!! (EVER)**

## Optimize Your Learning

* Draw a diagram of the git workflows you used in Release 0 and Release 1.
* Describe the workflow using your picture and words (ie not code) to your pair or a teacher.
* Make sure you understand all parts COMPLETELY.  You will be using this workfow extensively in the next 9 weeks. Ask questions if anything is still unclear!

## Resources

- [The wiki](../../../phase-1-guide/wiki) has further info on this  workflow
- [My git workflow](workflow.md)
- [GitHub Help](https://help.github.com/)
- [Learn Git Branching](http://pcottle.github.io/learnGitBranching/)
- [GitHub Cheatsheet](http://byte.kde.org/~zrusin/git/git-cheat-sheet-medium.png)
