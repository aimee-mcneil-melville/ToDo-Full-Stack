# Contribution Workflow

## When beginning a ticket

  *  Assign yourself to the ticket. All people in the pair should do this.
  *  Read the whole ticket
  *  Ensure you've had an elaboration with a dev lead.
  *  When you feel you have all the information needed to commence development, move the ticket to In Progress.
  *  Add a black estimate label to the ticket for how long you think it will take to complete (1-8).
  *  `git pull origin dev`
  *  Create a new branch with the following naming: [issue-number]-[brief-title-in-kebab-case] (e.g: `5-create-garden-component`)

## When finishing a ticket

  * Check that your work is fully tested. You didn't forget to write tests, did you?
  * git pull origin dev into your branch.
  * Handle any merge conflicts, check all tests are passing and then push your branch to GitHub.
  * Get a review done by one of the lead developers
      - Sit alongside a lead developer to review your code and merge changes or (if a dev lead asks you to create a PR),
      - Create a Pull Request (the branches selected by default should be correct) of your current branch into dev.
          * Add "Closes #[issue-number]" to the PR comments as well as any other comments the reviewer will need to know about.
          * Select all of your lead developers as a reviewer, and make yourself an assignee. The lead developer that reviews your PR will also assign themselves as an assignee - so you know who to talk to about requested changes.
          * Let your dev lead know that you've created a pull request. Please bear with them as they may already have several waiting in the queue!
  * Take a look at other Open and unassigned tickets in preparation for what you might work on next. Ask your lead developers whether to begin on a new ticket, or if you're lucky - they will be finished with your PR.

## If your PR has Changes Requested

  * Make the changes requested by the reviewer (feel free to approach them to talk about the changes!) and make sure to click "resolve conversation" once those changes have been made.
  * `git pull origin dev` into your branch. Handle any merge conflicts, then push your branch to GitHub.
  * Let your Reviewer know that you have made the requested changes.

## When your PR has been Approved

  * Add a white actual tag to the ticket to indicate how long it took to complete.
  * You can now click the magic green Merge button! Merge your code into dev 😁.
  * Delete your branch.
  * Celebrate! But not for too long, there's more work to do yet! 😉
