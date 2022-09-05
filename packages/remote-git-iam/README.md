# Using git-iam remotely

This is a set of instructions for configuring git-iam into your local computer. There's no need to install git-iam if you are studying on campus. This is specifically for those doing their study online. 

The purpose of git-iam is for students to post commits under their own name, even during pairing sessions. This allows for more accuracy on who is making changes under specific commits.

## Installation

```sh
npm install git-iam --global
```

OR

```sh
yarn global add git-iam
```

## Configuration

**Important Note for the Teaching Team:** Replace the link after the `--init` with a shareable link to the private git gist with the JSON object containing student github information. In order to create a quick JSON file of all the students, run the second part of this [script](https://github.com/dev-academy-programme/teaching-guide/tree/main/resources/scripts/add-people-to-github-org). Remember to add `/raw/` at the end of the git gist link. Delete this note after forking and editing the link.

After installation:

```sh
git-iam --init https://example.url
```

This command

* saves the cohort github information to the global Git config `users.url`
* adds the `iam` alias to the global Git config `alias.iam`

## Pairing using git-iam

During pairing sessions, you should be switching between driver/navigator frequently. Before you make commits, run 

```sh
git iam jane
```
**Replace jane with your or your pair's name.**
This command temporarily changes the git configurations to recognise `Jane` as the developer. 

Stage, commit and push as normal. Before you switch roles with your pair, make sure to commit your changes and run `git iam` again with your partner's name to change the developer.

**Important:** git-iam resets when you move into different repos. Before committing, make sure to run `git iam <your-name>` again. If you've accidentally committed without setting the git iam or if the commit is still under your partner's name, then you can run

```sh
git iam <your-name>
```

then run

```sh
git commit --amend --reset-author
```

## Checking who is the commiting developer

If you want to check which developer the commits will be under, you can run

```sh
git config --list
```

Check the `user.name` and `user.email` to find out which GitHub user the commits will be under.

## Uninstallation

At the end of the course, you will no longer have any use for git-iam, and you can uninstall it. 
But first make sure you've switched back to your own identity with `git iam <your-name>`! 

To uninstall the package, run

```sh
npm uninstall git-iam --global
```

OR

```sh
yarn global remove git-iam
```

If after doing this you find that Git has forgotten your name and email address, you can re-supply them when prompted. "Your Name" should be your nicely-formatted name, not your GitHub username.
```sh
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
```

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=remote-git-iam)
