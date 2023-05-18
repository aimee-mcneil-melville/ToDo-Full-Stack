# Testing

## Description

We write tests to help ensure functionality works the way we think it works and that it continues to work when updates are made to the code. Having a thoroughly tested application means having higher confidence that you are shipping it in working condition. Because of this, many teams feel very strongly that a high-quality piece of software will have a good level of test coverage.

Possible testing measures you might implement...

Covered in our curriculum:
* write passing unit tests to thoroughly cover a single (data-modifying) user interaction across every layer of the full tech stack
  * component tests
  * testing of front-end state updates (if applicable)
  * client API tests
  * route tests
  * db query tests

Additional to our standard curriculum:
* write passing end-to-end tests for a single (data-modifying) user interaction with a tool such as [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/), or [Selenium](https://www.selenium.dev/documentation/webdriver/)
* cover at least two components with visual regression tests using a tool such as [BackstopJS](https://github.com/garris/BackstopJS)
* other testing measure of your choosing, as agreed with your facilitator

### Tips

* For this quality measure, your tests need to pass!
* For the "single (data-modifying) user interaction" choose a feature that starts with a user action in the browser and adds, deletes, or modifies something in the database, before showing the user the results of their change. In other words, this must be a "full-stack" feature in a full-stack app
* Unit tests must include at least component tests, client API tests, route tests and db function tests. If the tested feature also includes state in the front end, be sure to test that, too

## Learning objective(s)

2. Demonstrate an understanding of quality practices for software development, such as automated testing, performance, and security

## Required
Choose and implement two [software quality measures](../software-quality/) to complete CP02.

## Requirements

* I have selected and implemented any **one** testing option, either from the list above or of my own choosing
* I have included a comment in my CP02 submission to tell the facilitator which testing measure I have selected and implemented
* **Check:** My application runs and I have implemented at least one of the above testing measures, and I have included a comment on CP02 to explain which testing measure I have selected and implemented
* **Submit:** I have checked what I am submitting does the above, and I have posted a link to my branch or commit(s) that displays the criteria
