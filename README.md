# Regular expressions

Test the following regular expressions:

```js
// This looks for the first match of "def" in a row
// It is case-sensitive
R.match(/def/, 'abcdefghi')     // ["def", index: 3, input: "abcdefghi"]
R.match(/def/, 'ABCDEFGHI')     // ["DEF", index: 3, input: "ABCDEFGHI"]

// The g makes this keep looking and return all matches
// (but with less detail). Still case sensitive.
R.match(/def/g, 'abcdefghi')    // ["def"]
R.match(/def/g, 'ABCDEFGHI')    // []

// Adding the i makes the match(es) case-insensitive
R.match(/def/ig, 'abcdefghi')   // ["def"]
R.match(/def/ig, 'ABCDEFGHI')   // ["DEF"]

// Removing the g takes us back to first match only
// with more detail
R.match(/def/i, 'abcdefghi')    // ["def", index: 3, input: "abcdefghi"]
R.match(/def/i, 'ABCDEFGHI')    // ["DEF", index: 3, input: "ABCDEFGHI"]

// The [] mean match ANY of the enclosed characters
R.match(/[def]/ig, 'abcdefghi') // ["d", "e", "f"]
R.match(/[df]/ig, 'ABCDEFGHI')  // ["D", "F"]
R.match(/[df]/ig, 'DEFGdefg')   // ["D", "F", "d", "f"]

// The ? means match zero or one instance (we call this "arity")
R.match(/[df]?/ig, 'bcdedcb')   // ["", "", "d", "", "d", "", "", ""]
R.match(/[df]?/ig, 'bcdDdcb')   // ["", "", "d", "D", "d", "", "", ""]
R.match(/[df]?/ig, 'ccceeeg')   // ["", "", "", "", "", "", "", ""]

// The + means match one or more instances
R.match(/[df]+/ig, 'bcdedcb')   // ["d", "d"]
R.match(/[df]+/ig, 'bcdDdcb')   // ["dDd"]
R.match(/[df]+/ig, 'ccceeeg')   // []

// The * means match zero or more instances
R.match(/[df]*/ig, 'bcdedcb')   // ["", "", "d", "", "d", "", "", ""]
R.match(/[df]*/ig, 'bcdDdcb')   // ["", "", "dDd", "", "", ""]
R.match(/[df]*/ig, 'ccceeeg')   // ["", "", "", "", "", "", "", ""]

// The . means match any character
R.match(/./, 'rfa4ef#$')        // ["r", index: 0, input: "rfa4ef#$"]
R.match(/.?/, 'rfa4ef#$')       // ["r", index: 0, input: "rfa4ef#$"]
R.match(/.+/, 'rfa4ef#$')       // ["rfa4ef#$", index: 0, input: "rfa4ef#$"]
R.match(/.*/, 'rfa4ef#$')       // ["rfa4ef#$", index: 0, input: "rfa4ef#$"]
R.match(/.?/g, 'rfa4ef#$')      // ["r", "f", "a", "4", "e", "f", "#", "$", ""]
R.match(/.+/g, 'rfa4ef#$')      // ["rfa4ef#$"]
R.match(/.*/g, 'rfa4ef#$')      // ["rfa4ef#$", ""]
```

> NOTE: We can also use the simpler `R.test` which returns true or false, depending on whether it found a match.

```js
R.test(/[df]+/ig, 'bcdedcb')   // true
R.test(/[df]+/ig, 'bcdDdcb')   // true
R.test(/[df]+/ig, 'ccceeeg')   // false
```

> NOTE: If you want to find a character that is reserved for regular expression use&mdash;for example, the `. + ? - *` and other reserved characters&mdash;simply "escape" that character by preceding it with a `\`. For example, if you want to find a *real* `.` and not "any character", then use `\.` instead of `.` (and if you want to get a real `\`, use `\\`).

There's much, much more. Play with these, [do some more looking around online](http://www.w3schools.com/jsref/jsref_obj_regexp.asp), and then try the challenges below:

## PROVE vs. IMPROVE

There are two common approaches to education. In one, students try to **prove** to the instructor, themselves, and others that they can get the "right" answer. It's not about learning. It's about competing.

The second approach is one in which the student seeks to **improve**. She is not trying to prove anything to anyone. She just wants to get better at it. The joy is in the learning, not the "winning".

As you might guess, we at EDA prefer the second approach.

With regard to these challenges, you can easily find workable answers by Googling for them. But where's the fun in that? And how will you learn?

When the chips are down and you've got to get that software out the door by midnight, then by all means Google away! But for today's challenge, how far you get through these is not important. How much you learn is.

## Challenges

We've imported a `data` array containing hundreds of strings with various properties. Your task is to write regular expressions you can use to map through these strings using `R.filter` and returning only those strings that meet the criteria.

If you'll check the `app/main.js` file, you'll see that we've already created a `findMatches` function. Now all you have to do is create a regular expression (pattern), and pass it into `findMatches`. You'll see the output in the console.

> Note: There are two ways to run these challenges. The first is against an array of lines. Each match should be agains the entire line. To do this, put a `^` at the start of your regular expression (this means, "from the beginning of the string) and a `$` at the end (this means, "to the end of the string"). For example, this would match a string of precisely 7 digits: `/^\d\d\d\d\d\d\d$/`.

> The second challenge is to use the `text` data. This combines the same strings into a big string. So you're going to search through the string for matches. It's a bit different. For one thing, you need to remove the `^` and `$` or you'll be trying to match the entire string of data! For another, you'll want to add the `g` global flag so that it doesn't stop at the first match. For example, to find seven-digit patterns in the data, you might use this: `/\d\d\d\d\d\d\d/g`.

1. **Find all 57 strings matching a possible four-digit postcode.**

    Note: In addition to the `?`, `+`, and `*` options, you can also specify a precise number of characters like this: `{3}`. Or a range like this: `{3,5}`. Or up to 5 like this: `{,5}`. Or at least 3 like this: `{3,}`. And you can match digits like this: `[0-9]` or like this `\d`. So this would match 3-5 'e' characters in a row: `/[e]{3,5}/`.

2. **Find all 27 credit card numbers.** The patter is always 4 groups of 4 digits separated by hypens: 1111-2222-3333-4444.

3. **Find all 31 strings that match an IPv4 address pattern** (called a "dotted quad"). This is four numbers **between 0 and 255** separated by periods (dots). For example: 192.168.0.72.

    Note: The simplest answer to this is `/\d?\d?\d\.\d?\d?\d\.\d?\d?\d\.\d?\d?\d\/`. We've coded this up as an example. Run the Python server in the `regularity` folder with `python -m SimpleHTTPServer 3000` and check the output in the console. You should see 31 matching rows. But if you look, you'll see 33. Hmmm.

    Unfortunately, our regular expression is too generous. If you look at the last two IPv4 addresses in the console, you'll see that one is `999.999.999.999` and another is `256.156.256.256`. Oops. So try to change your pattern to rule out these bad matches (but don't spend all day on it -- this is harder than it looks).

    You can also provide options by using the pipe | separator. For example, `/yes|no/` matches "yes" or "no".

4. **Find all 51 phone numbers.** These numbers may be in one of several patterns (all U.S.-centric, sadly). Below are the possibilities. Note: the extension (x1234) can be 3-5 digits long.

    - 333-333-3333
    - (333) 333-3333
    - 1-333-333-3333
    - 333.333.3333
    - 333-333-3333
    - 333-333-3333 x3333
    - (333) 333-3333 x3333
    - 1-333-333-3333 x3333
    - 333.333.3333 x3333

5. **Find all 62 comma-separated-value lines.** These lines include 4 terms each, separated by commas. The terms only include word characters, hyphens, and spaces (but not all whitespace characters).

6. **Find all 14 names.** These are names of people, such as "Wiley Pouros" and "Helmer Kassulke DVM". There may be periods or hyphens. Each word begins with a capital letter.

7. **Find all 21 street addresses.** They have the format `1231 Enola Hill`, each beginning with a number between 3 and 5 digits long, followed by one or more words.

8. **Find all 44 email addresses.** (Keep this simple and don't worry about getting it perfect. Anything that *can* be a possible email address, without regard to wether the top level domain exists or not, is OK.)

9. **Find all 18 URLs.** (Hint: they all start with "http://".)

10. **Find all 9 dates.** They are all in the format `2010-01-22` and all in the Third Millennium CE.

11. **Find all 42 times.** The times are in this format: `2015-11-15 04:30:11 +1300` and all in the Third Millennium CE.
