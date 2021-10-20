# Using git-iam remotely

This is a set on instructions for configuring git-iam into your local computer. There's no need to install git-iam if you are studying on campus. This is specifically for those doing their study online. 

The purpose of git-iam is for students to post commits under their own name, even during pairing sessions. This allows for more accuracy on who is making changes under specific commits.

## Installation

```sh
yarn global add git-iam
# or
npm install git-iam --global
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

Stage, Commit and Push as normal. Before you switch roles with your pair, make sure to commit your changes and run `git iam` again with your partners name to change the developer.

## Checking who is the commiting developer

If you want to check which developer the commits will be under, you can run

```sh
git config --list
```

Check the user.name and user.email in order to find out which github user the commits will be under.

## Uninstallation

Add the end of the course, you will no longer have any use for git-iam. In order to uninstall the package, run

```sh
yarn global remove git-iam
# or
npm uninstall git-iam --global
```
