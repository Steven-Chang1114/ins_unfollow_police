# ins_unfollow_police
A program that can find all the users that does not follow you while you are following them. This program can only work from the browser since I use DOM and localStorage

## Usage
#### 1. Find user who does not follow you back

1. Navigate to your instagram profile e.g. https://www.instagram.com/YOUR_USERNAME/
2. Open up the console
3. Copy all the code from index.js into the console
4. Click on the follower button and scroll it all the way to the bottom (to load all the users)
5. Type to the console
  ```
  updateFollowers()
  ```
6. Clock the pop up window and click following then scroll it all the way to the bottom
7. Type to the console
  ```
  updateFollowing()
  ```
8. The result will show up in the console as an array of object
e.g.
```
  [{id: 0, name="a"}, {id:1, name="b"}, {id:2, name="c"}...]
```
---
#### 2. Find user who follows you but unfollow afterwards
1. Navigate to your instagram profile e.g. https://www.instagram.com/YOUR_USERNAME/
2. Open up the console
3. Copy all the code from index.js into the console
4. Click on the follower button and scroll it all the way to the bottom (to load all the users)
5. Type to the console (Run this line only for the first time, after that you can just skip to step 7)
  ```
  updateFollowers()
  ```
6. Wait until somebody unfollow you
7. Type to the console
  ```
  updateUnfollowers()
  ```
8. The result will show up in the console as an array of object
e.g.
```
  [{id: 0, name="a"}, {id:1, name="b"}, {id:2, name="c"}...]
```
---
#### Common commands
- Clean the data
```
init()
```
- Check the status
```
_x
```
OR
```
localStorage
```
- If you have saved the previous data as a javaScript object, you can call
```
fetchDatabase(data)
```

## TODO List: 
Currently it is very inconvenient to run this program since you have to manually scroll both of the follower and following lists all the way to the bottom. I'm still trying to think of a better solution for this, and maybe it will get better after Instagram api releases a more readable documents

---
This project is inspired by instaUnfollow(https://github.com/JimishF/instaUnfollow) which is now no longer available to run due 
to the change of the Instagram website. I use part of the code from there and add a lot of my own stuff to make this program work 
in the way that I'm expected
