# React Forms Kata

## Setup

```sh
# clone the repo
cd kata-react-forms
npm install
npm test
```

## Instructions

There are components in `client/components/` that export components which contain a form. Here's an example:

```tsx
export default function TextInputForm() {
  // State for our list of items
  const [list, setList] = useState<string[]>([])
  //                               ^? this generic tells useState that state will only be an array of strings

  // State for our new item input
  const [newItem, setNewItem] = useState('')

  return (
    <>
      {/* Our input (currently uncontrolled) is inside a form, with a submit button */}
      <form>
        <label htmlFor="newItem">New Item:</label>
        <input type="text" name="newItem" id="newItem" />
        <button>Submit</button>
      </form>

      {/* List where our list items will be rendered */}
      <h2>List: </h2>
      <ul>
        {list.map((listItem, index) => (
          <li key={index}>{listItem}</li>
        ))}
      </ul>
    </>
  )
}
```
The forms will have between 1-3 inputs of varying types (e.g., text, checkbox, select). They will start as unctontrolled inputs. Your job will be to turn them into [controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

There are a set of tests in [`client/__tests__`](./client/__tests__). They are all currently skipped, and if you uncomment them, they _mostly_ fail.

Un-skip each test one-by-one and try to make it pass! 🥳 Start from `0-Text.tsx` and make your way through to the holy grail: `4-AddingAndRemoving.tsx`

## Stretch

- Add a new form that uses a `<input type="date" />`, test that a user can select a date
- Add a new form that uses a `<input type="file" />`, test that a user can add a file (like an image)
  - Extra: Display that image on the screen using the `FileReader` API


