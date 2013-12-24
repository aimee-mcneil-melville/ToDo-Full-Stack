# Two Truths and a Lie.

## Learning Competencies

Use git and github to work on projects. Be familiar with git workflows. Understand how to communicate with others using github.

## Summary

Let's get to know each other better, using git and github! We'll play an icebreaker called Two Truths and a Lie, but instead of sitting around and chatting in person, we're going to use github to chat about what the lie is.

### Learning Goals

After this challenge you should be able to:
  * Describe a basic git workflow using Github.
  * Demonstrate ability to create a repo, make a pull request from a feature branch, and review and accept others' pull requests.

### Objectives

* Clone a repo and create a branch.
* Create a pull request on github.
* Comment on pull requests and accept another's pull request.

### Steps

#### Step 1: Clone the repo and create a branch

Clone this repo. In your browser find the clone url in the sidebar and copy it. In your terminal, run the following command, replacing CLONE_URL with the url you copied:

``` shell
git clone CLONE_URL
```

Now we're going to create a branch! To do this we use the `git branch` command. `git branch` on its own lists out all local branches, but when you give it an argument it creates a new branch. A new branch is a copy of the current branch with a different name.

In your terminal, run the following command, replacing YOUR_NAME with your name:

``` shell
git branch YOUR_NAME
# creates a branch called YOUR_NAME
git checkout YOUR_NAME
# checks out a branch called YOUR_NAME
```

Create a new file in students based off of [example.md](students/example.md). This file should have your name, and three facts about you. One of these facts should be completely made up.

Add and commit your file to the project with the following commands:

``` shell
git add students/example.md
# Stages the file students/example.md to the repo.
git commit -m "Added facts about Example McExampleson"
# Commits the staged change to the repo with the message above.
```

Now push up your branch to github with

``` shell
git push origin YOUR_NAME
```

## Optimize Your Learning

## Resources
[My git workflow](workflow.md)
