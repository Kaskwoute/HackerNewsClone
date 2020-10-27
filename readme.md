## Architecture

There is one major points in this project:

- HN api gives us first stories ID and we need to actually fetch each story with a specific request with its ID.

To resolve this I decided to separate the fetching of the stories IDs and the fetching of the batch of 20 stories.

Because separation of concerns helps sharing code between multiple dev (easier to understand) and better confidence when you have to refactor in case of breaking feature.

So we have a StoryContainer -> StoryList component hierarchy.

Best practice want to keep UI concerns separate from the program logic and side effects. 

So we create a "Pure" component Story that only pulls props and renders it. It is even recommended because it is in a FlatList so it can use FlatList optimization. (The component is actually not really pure since we are using date but it was done for simplicity here).

### Components

- All stateful components where writing TDD style. I tested actions in combination with the reducer because "testing reducer === testing actions" and it means fewer tests to write.
- Display component are not tested TDD because I failed using Jest. If I tested them I would make double assertion to test for props being pulled correctly and testing UI is rendered using className. 

### useRequest custom Hook

- Tested same way as stateful component
- The implementation does only really work because of the size of this project. It definitely is not something that would scale well.
- It is mounted with empty URL, it is ok but no self explicit. For me the implementation is ok because it respect react life cycle but I still have no idea how to make it more explicit.
- Fetching request can't be canceled but it is ok for this mock.
- Caching is in here because we have only one type of data (not something i would have considered in bigger project) so it prevents fetching same data every time (that would happen a lot).


PS: It's **ansible** for managing configuration, you can make a Jenkins job with config field so you can build config for multiple client (with versioning) without bundle code again. (same for traduction actually but with it's own tool)


**Disclaimer**: I don't own any apple stuff so I did not test it on apple device. Used Components that were not specific to any platform so I assume it should render the same.


## Env

- Using node v10.16.2

- Expo for easier workflow for building => Shipped with a lot  of feature I don't use, but used for easier workflow

## Setup

```shell
yarn install || npm install
yarn start
```

To run test
```shell
yarn unit:test
```

- To run in your browser: 
```
- yarn start
- click on run in web browser
```

- To run on your phone: 
```
- You can:
    - yarn start
    - download the expo app on your phone
    - same wifi connection
    - click on run on Android / IOS
- Or:
    - scan barcode at https://expo.io/@kaskwoute/projects/HackerNewsClone with expo app
```

- IOS and android builds are also available on https://drive.google.com/drive/folders/1IkwzLIuOasgsFUXen04pQeZzM0FIGaAt?usp=sharing


## Test

- I tested only reducer TDD way, because I didn't managed to get a good grasp of the jest + react-test-renderer api to unit test pure components

- e2e was out of scope

## Comments

- No redux -> not that much states

## Recommendation

- Use panResponder to refresh only 30sc when user is not interaction with the app

## Plans

- [x] Setup with expo
- [x] Architecture + Check HN api + List of components
- [x] TDD reducers and code other without testing
- [x] Build with expo
- [ ] e2e
- [ ] Offline first (storage or db)