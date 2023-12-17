# Art rover

This challenge asks us to add a feature to a website, which will enable us to practise joins.

Art rover is a website that provides:
1. a list of artworks
2. a list of galleries

We want you to add some new features that let the users track which
artworks are being displayed in which galleries.
---

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```sh
    npm i
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```

    This will create and populate the database with the existing migrations and seeds, and start the server with `nodemon`.
  </details>
- [ ] Visit the [list of artworks](http://localhost:5173/artworks) and the [list of galleries](http://localhost:5173) and click through to see the individual pages for an artwork and a gallery 
----
### 1. Add a relationship to the schema
- [ ] create a new migration which adds new column called `gallery_id`
  <details>
    <summary>Adding a new column</summary>
    To update an existing table in a migration we're going to use: `knex.schema.alterTable('artworks', (table) => { ... })`

    This column should be explicitly related to the gallery table, using `table.integer('gallery_id').references('galleries.id')`

    To add a strategy for what we should do when the gallery that an artwork references is deleted, we can use a trigger on the constraint. In this case a good idea is to set the gallery id to `NULL` with `.onDelete('SET NULL')`

    Don't forget to use `table.dropColumn` for the `down` function in your migration

    Read the [knex docs](https://knexjs.org/guide/schema-builder.html#foreign) for more details.
  </details>
- [ ] update your seeds to have the relationship
  <details>
    <summary>Updating seeds</summary>

    In our existing seeds, none of the artworks have a `gallery_id`, so add a value to some or all of them.

    They should be a number between 1 and 6 to match up to the IDs of the galleries.
  </details>

### 2. Add details to the `GET /api/v1/artworks/:id` route
- [ ] Update our type definitions
 
  We're going to define a new interface in [artwork](./models/artwork.ts) called `ArtworkDetails`

  ```typescript
  export interface ArtworkDetails extends Artwork {
    gallery_id: number
    gallery_name: string
    gallery_description: string
  }
  ```
  
- [ ] Rewrite the query for `artworks.byId`
  Open the [db/artworks module](./server/db/artworks.ts) and rewrite the `byId` query to return an `ArtworkDetails` instead of an `Artwork`.

  You'll want to `join` to the `galleries` table

  <details>
    <summary>writing a join</summary>


    We want to include the details for the related gallery in the results of our query for a specific artwork.

    We _also_ want to always include the data for this artwork, even if there is no matching gallery (i.e. if `gallery_id` is `NULL`)

    This means we're going to start with a left join:
    ```js
    connection('artworks').leftJoin('galleries', 'artworks.gallery_id', 'galleries.id')
    ```
    We want our results to include all the columns from `artworks` as is, and then we want the columns from `galleries` with a prefix of `gallery_`, we can write that in the select method.
    ```js
    .select(
      'artworks.*',
      'galleries.name as gallery_name',
      // and so forth
    )
    ```

    We'll filter to the one artwork using the id parameter
    ```js
    .where('artworks.id', id)
    ```

    We only expect zero or one result, so this is a good use for `.first()`

    Finally, we need to make sure that the return type of this function is `Promise<ArtworkDetails>`, you can give the function a return annotation or cast the final result like this:
    ```ts
    return result as ArtworkDetails
    ```

    Either in the browser, thunderclient or insomnia `GET http://localhost:5173/api/v1/artworks/3` and check that you're getting the output you expect. 
  </details>
- [ ] Update the server tests for `byId`

  We have tests for the database function and the route that we've changed.

  Now that the behaviour has changed, these tests will be failing. Run them to see:
  ```sh
  npm test
  ```

  Make sure that these tests are up to date with the new ArtworkDetails type and passing before moving on. 

  <details>
    <summary>Updating our tests</summary>
    The database test will be failing because the snapshot no longer matches. In the vitest runner (i.e. in your terminal while running npm test) you can see the new "actual" snapshot as compared to the expected snapshot and press `u` to accept it.

    This will rerun the changed test, which should be passing now.

    The route test will need to be updated too, in it we mock out the `byId` function, having it return an object matching the old type definition. Update the mock-implementation to match our new type definition.

    This will cause the test to fail, after visually confirming the new result, press `u` in the test runner to accept this snapshot too.

    Now all your tests should be passing. This is a good time to commit. 
  </details>

### 3. Update the artwork details page
- [ ] Update the return type of our data hook
  
  In [hooks/api](./client/hooks/api.ts) we define the queries we use to load data from the API into our components.

  The only change we really need to make here is to change the cast in `useArtworkDetails` so that it returns an `ArtworkDetails` instead of an `Artwork`

- [ ] Add a link to the Artwork details page
  
  Update [`<ArtworkDetails />`](./client/components/ArtworkDetails.tsx) to include a link to the gallery details using `<Link />` component from `react-router-dom`.

- [ ] Update our tests for the artwork details page

  Our existing tests should still be passing. Run `npm test` to confirm.

  Add a new test in [View Artwork Detail](./client/test/ViewArtworkDetail.test.tsx) to confirm that the link is rendering correctly.

  <details>
    <summary>Testing our gallery link</summary>
    You'll need to update the `nock` call to respond with a full `ArtworkDetails` object

    Since the link will not render until our data is loaded, the easiest way to wait for it is to `await` one of the `find...` methods, e.g. you can get a link by the aria-role `link`.

    ```js
    const galleryLink = await screen.findByRole('link', { name: 'My favourite gallery' })
    ```
  </details>

### 4. Add details to the `GET /api/v1/galleries/:id` route
- [ ] Update our type definitions
 
  We're going to define a new interface in [gallery](./models/gallery.ts) called `GalleryDetails`

  ```typescript
  import { Artwork } from './artwork.ts'

  export interface GalleryDetails extends Gallery {
    artworks: Artwork[]
  }
  ```
- [ ] Rewrite the query for `galleries.byId`

  Similar to the query we wrote for `artworks.byId` we're going to
  do a left-join but this time from `galleries` to `artworks`.

  Then we can iterate over our resulting rows to build the `GalleryDetails` object.

  <details>
    <summary>Writing the join</summary>

    We'll use select to keep `galleries.*` and then prefix all the columns from `artworks`.

    We can take all the gallery properties from the first row in our result set (since they'll be the same in each row).

    We'll build an `Artwork` object from each row in the result set and push it into an array called `artworks`.

    If there are no related artworks, the first row will have an `artwork_id` of `null`. So we can skip any rows like that when building up our array
  </details>
- [ ] Updating the server tests

  Run `npm test`, make sure the tests related to `galleries.byId` are
  up-to-date and passing.

### 5. Update the gallery details page
- [ ] Update the return type of `useGalleryDetails`
- [ ] Add a list of artworks to the Gallery Details page
  
  Each list item should link to the artwork detail page

- [ ] Update our tests for the Gallery Details page

  Confirm that the relevant artworks are listed and that they link to the correct place

  <details>
    <summary>Testing the gallery details</summary>
    You can find the with the roles `link` or `listitem`, narrow it down by name.

    Click on the links to confirm they show you the right artwork

    ```js
    // find the link
    const link = await screen.findByRole('link', { name: 'Pancake Paradise' })

    // click on it
    await user.click(link)

    // now we should be on the artwork details page
    const heading = await screen.findByRole('heading', { name: 'Pancake Paradise' })
    expect(heading).toBeVisible()
    ```
  </details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=art-rover)
