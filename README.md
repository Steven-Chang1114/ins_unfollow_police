# ins_unfollow_police
A program that can find all the users that does not follow you while you are following them

## Usage
This program can only work from the browser

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

On the other hand, you can always check all the status (follower, following and the result) by typing "_x" to the console

## TODO List: 
Currently it is very inconvenient to run this program since you have to manually scroll both of the follower and following lists all the way to the bottom. I'm still trying to think of a better solution for this, and maybe it will get better after Instagram api releases a more readable documents

---
This project is inspired by instaUnfollow(https://github.com/JimishF/instaUnfollow) which is now no longer available to run due 
to the change of the Instagram website. I use part of the code from there and add a lot of my own stuff to make this program work 
in the way that I'm expected
