Netflix Settling is an app create using React with Redux state management. It helps with settling balance with other users of your Netflix account. This app will give you a summary of all costs of your subscription and what was not returned. [Live version can be viewed here.](https://chilimanjaro.github.io/netflix-settling/)

## Usage

Usage is simple:
1. Start new editor or upload a JSON file of previously saved data. If you have run this app before, previous state should be persisted in your local storage.
2. Set initial subscription cost and starting date.
3. Add other people using your Netflix account to the list.
4. Add any returns that they have made.

## How to change values of properties?

Editable properties will be bold on hovered. Clicking on them will invoke an input with a mask of each property type.

## Data Structure

These following properties are available in Redux store and used throughout the app:
1. _isInitialized_ - tells if editor has been started.
2. _language_ - tells which language is set (available are: Polish, English)
3. _activeForm_ - there are to forms available: adding new person, adding new return. This property tells with forms is currently active.
4. _notifications_ - stores currently visible notifications, eg. errors. Notificiations will be visible on the bottom of the page.
5. _subscriptionInfo_ - stores information about starting date and subscription cost.
6. _people_ - stores an array of other Netflix users.
7. _returns_ - stores an array of all returns. Returns are assigned to people by their IDs.

## Used dependencies

1. Inputs were created using [IMask](https://imask.js.org/).
2. Formatted numbers were created using [react-number-format](https://github.com/s-yadav/react-number-format).
3. IDs are created using [UUID](https://github.com/uuidjs/uuid). It helps maintaining unique IDs for each object globally.
