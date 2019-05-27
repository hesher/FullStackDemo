# Server/Client Workshop

This workshop will take you through adding feature to a fullstack, react ToDo app.
Next, you will learn how to read and write changes to the hard drive.

## Installation

```
git clone git@github.com:hesher/FullstackWorkshop.git
cd FullstackWorkshop
yarn
```

## Running

- `yarn dev`: Start express server + static client server. Allow hot reloading
- `yarn start`: bundle client into bundle.js and server from express server
  ![Screenshot](TodoScreenshot.png)

## Steps

### Implement Duplicate

- Use `<TodoButton>` to implement a button that duplicates a todo
- Look at examples in `Todos.js` (`onComplete` and `onDelete`) and `Todo.js`

### Implement "Add Todo"

You should implement a "Add" button - It should allow typing the label for the new todo and adding it as a new todo

- Discuss the visual design with your peer
- Think about which DOM components you need to implement this
- Which state does this feature require?
- Implement it
- **Bonus** - Refactor this functionality as a new component. Think about what is the API/Properties this component should have? (It's not the same as state)

### Read and Write Todos from disk (when you refresh, todos state should be preserved)

Currently, the state of Todos is reset every time you refresh the browser. The reason for that is that the state is stored in memory.

Obviously, that's not good enough for a real Todos app.
As a first iteration on improvement, we are going to use a server to store our Todos on the hard disk.

Later on, you can easily switch to cloud api to store the state on a remote server and use it from any client.

- Look at `Todos.js` - We currently use `useState` and pass the initial value that is the initial state of our app (The todos).
- Now `useState` with `useTodos` (You need to import it from `useTodos.js`)
- The browser should refresh with the new app

### Implement Move Down and Move Up buttons
