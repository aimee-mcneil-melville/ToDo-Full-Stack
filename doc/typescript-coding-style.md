# Typescript Code Style

**This is the temporary home for this document**

## `type` or `interface`

The rule of thumb is:

> If you can use "interface". If you can't, use "type".

The props for a component should use `interface` and so should
any simple record type

### Adding to an existing type

If you are adding to a type, or combining existing types, avoid using the `&` operator and favour using `interface` and `extends`

```typescript
// BAD: avoid using the intersection operator
type Decker = Samurai & Hacker
type Sheriff = Cop & { wearBigHat(): void }

// GOOD: use extends to combine
interface Decker extends Samurai, Hacker {}
interface Sheriff extends Cop {
  wearBigHat(): void
}
```

### Actions and Discriminated Unions

Redux actions or similar values are often typed as a discriminated union.

```typescript
type Action =
  | { type: 'wombles/delete'; id: number }
  | { type: 'wombles/add'; name: string }
```

### Function types

Function types can be written as interfaces, but it's pretty clunky. In this case use `type` instead.

```typescript
// BAD: don't use interfaces for function types
interface Shout {
  (msg: string): string
}

interface Shouter {
  new (msg: string): string
}

// GOOD: use the `type` keyword for function types
type Shout = (msg: string) => string
type Shouter = new (msg: string) => string
```

## Naming Types

Types are written in "upper camel case" aka. PascalCase.

```typescript
// BAD: do not start with lowercase
interface catOwner {}

// BAD: do not use `_` to separate words
interface cat_owner {}

// GOOD: use PascalCase
interface CatOwner {}
```

We don't use `I` or `T` as a prefix for type names.

```typescript
// BAD: do not use I or T prefixe
interface IDog {
  bark(): void
}

type TAction = { type: 'dog/bark' }

// GOOD: follow this example
interface Dog {
  bark(): void
}

type Action = { type: 'dog/bark' }
```

## Conventional names

### Props

When a module exports a single React component, that module should use an interface called `Props` to define the props for that component.

```typescript
interface Props {
  cats: Cat[]
  phoneNumber: string
}

export function CatOwner({ cats, phoneNumber }: Props) {
  // ...
}
```
