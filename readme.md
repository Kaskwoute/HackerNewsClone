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