# vuex-easy

This library provides the easiest way possible to manage state in a Vue application.

## Highlights

- acts as a layer above the VueX library,
  so the Vue devtools Vuex tab can still be used
- makes it unnecessary to implement any mutations
- based on the battle-tested React libraries
  [redux-easy](https://github.com/mvolkmann/redux-easy) and
  [context-easy](https://github.com/mvolkmann/context-easy)

## Re-rendering

Just like in standard usage of VueX,
all components automatically re-render
if any state they use changes.

## Single Store

Using a single store is similar to how REST services
generally have access to entire databases
rather than being restricted to subsets.
The same level of access is provided by vuex-easy.

## Vue Devtools Support

Because vuex-easy uses Vuex, the Vue devtools
can be used to see mutation details
and perform "Time Travel" debugging.

To view a mutation, open the Vue devtools, select a
mutation, and scroll to "mutation" on the right side.
The "type" property shows the name of the mutation and
the "payload" property shows the data supplied to it.

## Actions

Actions are not supported by vuex-easy
because those are never needed.
Any asynchronous processing, such as calling a REST service,
can be done in an event handling method instead of an action.
When the asynchronous part completes,
a synchronous VueX commit can be performed (by calling methods on the `vxe` object).

If common event handling code is needed across multiple components,
it can be implemented as a plain function
that is imported into each of the components
and invoked from their event handling methods.

## Usage

To use vuex-easy:

1. Import vuex-easy in the source file for top-most component (ex. `App.vue`).

```js
import {createStore} from 'vuex-easy';
```

2. Define the initial state. For example:

```js
const initialState = {
  count: 0,
  person: {
    name: 'Mark',
    occupation: 'software developer'
  },
  size: 'medium'
};
```

3. Create the store.

```js
const store = createStore(initialState);
```

4. Register the store.

```js
export default {
  name: 'App',
  components: {...},
  store
  // Other instance definition props go here.
};
```

In components that need to access and/or modify this state:

1. Import the `vxe` object.

```js
import {vxe} from 'vuex-easy';
```

3. Access state from the Vuex store using `mapState`.

This part is the same as standard usage of Vuex.

4. Update state properties at specific paths
   by calling methods on the `vxe` object.\
   Paths are dot-separated strings.\
   For example, to change the state property at `person.name`,
   call `vxe.set('person.name', 'Tami')`.

## vxe Methods

The `vxe` object currently implements ten methods.

- `vxe.decrement(path)`\
  This decrements the number at the given path.
  An optional second argument specifies the amount
  by which to decrement and defaults to one.

- `vxe.delete(path)`\
  This deletes the property at the given path.

- `vxe.filter(path, fn)`\
  This replaces the array at the given path with a new array
  that is the result of filtering the current elements.
  The function provided as the second argument
  is called on each array element.
  It should return true for elements to be retained
  and false for elements to be filtered out.

- `vxe.increment(path)`\
  This increments the number at the given path.
  An optional second argument specifies the amount
  by which to increment and defaults to one.

- `vxe.log(label)`\
  This writes the current state to the devtools console.
  It outputs "vuex-easy:", followed by
  an optional label that defaults to an empty string,
  "state =", and the state object.

- `vxe.map(path, fn)`\
  This replaces the array at the given path with a new array.
  The function provided as the second argument
  is called on each array element.
  The new array will contain the return values of each of these calls.

- `vxe.push(path, newValue1, newValue2, ...)`\
  This appends new values to the end of the array at the given path.

- `vxe.set(path, value)`\
  This sets the value at the given path to the given value.

- `vxe.toggle(path)`\
  This toggles the boolean value at the given path.

- `vxe.transform(path, fn)`\
  This sets the value at the given path to
  the value returned by passing the current value
  to the function provided as the second argument.

## Options

The `createStore` function accepts an optional second argument
that is an object that specifies options.

To validate all method calls made on the context object and
throw an error when they are called with incorrect arguments,
set the `validate` option to `true`.

The `persist` option
is described in the "SessionStorage" section below.

The `version` option
is described in the "Versions" section below.

The `replacerFn` and `reviverFn` options
are described in the "Sensitive Data" section below.

## Path Concerns

When the layout of the state changes, it is necessary
to change state paths throughout the code.
For apps that use a small number of state paths
this is likely not a concern.
For apps that use a large number of state paths,
consider creating a source file that exports
constants for the state paths (perhaps named `path-constants.js`) and
use those when calling every context-easy function that requires a path.

For example,

```js
// In path-constants.js ...
const GAME_HIGH_SCORE = 'game.statistics.highScore';
const USER_CITY = 'user.address.city';

// In the source file for a component ...
import {GAME_HIGH_SCORE, USER_CITY} from './path-constants';
...
vuex.set(USER_CITY, 'St. Louis');
vuex.transform(GAME_HIGH_SCORE, score => score + 1);
```

With this approach, if the layout of the state changes
it is only necessary to update these constants.

## Form Elements Tied to State Paths

It is common to have `input`, `select`, and `textarea` elements
with `onChange` handlers that get their value from `event.target.value`
and update a specific state path.
An alternative is to use the provided `Input`, `Select`, and `TextArea` components
as follows:

HTML `input` elements can be replaced by the `Input` component.
For example,

```js
<Input path="user.firstName" />
```

The `type` property defaults to `'text'`,
but can be set to any valid value including `'checkbox'`.

The value used by the `Input` is the state value at the specified path.
When the user changes the value, this component
updates the value at that path in the state.

To perform additional processing of changes such as validation,
supply an `onchange` prop whose value is a function.

HTML `textarea` elements can be replaced by the `TextArea` component.
For example,

```js
<TextArea path="feedback.comment" />
```

HTML `select` elements can be replaced by the `Select` component.
For example,

```js
<Select path="favorite.color">
  <option>red</option>
  <option>green</option>
  <option>blue</option>
</Select>
```

If the `option` elements have a `value` attribute, that value
will be used instead of the text inside the `option`.

For a set of radio buttons, use the `RadioButtons` component.
For example,

```js
<RadioButtons class="flavor" list={radioButtonList} path="favorite.flavor" />
```

where `radioButtonList` is set as follows:

```js
const radioButtonList = [
  {text: 'Chocolate', value: 'choc'},
  {text: 'Strawberry', value: 'straw'},
  {text: 'Vanilla', value: 'van'}
];
```

When a radio button is clicked, the state property `favorite.flavor`
will be set the value of that radio button.

For a set of checkboxes, use the `Checkboxes` component.
For example,

```js
<Checkboxes class="colors" list={checkboxList} />
```

where checkboxList is set as follows:

```js
const checkboxList = [
  {text: 'Red', path: 'color.red'},
  {text: 'Green', path: 'color.green'},
  {text: 'Blue', path: 'color.blue'}
];
```

When a checkbox is clicked the boolean value at the corresponding path
will be toggled between false and true.

All of these components take a `path` prop
which is used to get the current value of the component
and update the value at that path.

## SessionStorage

Typically VueX state is lost when users refresh the browser.
To avoid this, `sessionStorage` is used to save all the
context state as a JSON string on every state change.
This is throttled so `sessionStorage` is
not updated more frequently than once per second.
The state in `sessionStorage` is automatically reloaded
into the context state when the browser is refreshed.

To opt out of this behavior, pass an options object to
the `createStore` function as follows:

```js
const options = {persist: false}; // defaults to true
const store = createStore(initialState, options);
```

## Versions

By default vxe-easy saves context state data in `sessionStorage`
so it can be retrieved if the user refreshes the browser.
During development when the shape of the initial state changes, it is
desirable to replace what is in `sessionStorage` with the new initial state.

One way do to this is to close the browser tab and open a new one.
If this isn't done, the application may not work properly because it
will expect different data than what is in `sessionStorage`.

A way to force the new initial state to be used is to supply a
version string or number in the options object
passed to the `createStore` function.
Whenever vxe-easy sees a new version,
it replaces the data in `sessionStorage` with the current
`initialState` value in the options object passed to `createStore`.

## Sensitive Data

When the VueX state contains sensitive data
such as passwords and credit card numbers,
it is a good idea to prevent that data from being
added to the context state or written to `sessionStorage`.

One way to do this is to add `replacerFn` and `reviverFn` functions
to the options object that is passed to the `createStore` function.
These functions are similar to the optional `replacer` and `reviver` parameters
used by `JSON.stringify` and `JSON.parse`.
Both are passed a state object.
If they wish to change it in any way,
including deleting, modifying, and adding properties,
they should make a copy of the state object,
modify the copy, and return it.
Consider using the lodash function `deepClone` to create the copy.

## Example app

The GitHub repository at <https://github.com/mvolkmann/vuex-easy-demo>
will provide an example application that uses vuex-easy soon!
