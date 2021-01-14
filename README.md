### To sync your code with Jim's latest commit:

- git fetch --all
- git reset --hard origin/master


<img src="https://i.imgur.com/fx2orT2.png">

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Implement Like functionality on Posts |


## The logic!

#### The HTTP

The First thing we need to think about is what kind of requests we are going to make for creating a like and removing a like.

*User Story*

1. A user can click on the heart to create a like and the heart will turn red
2. A user can click on the heart to remove a like and the heart will turn from red to grey

*Whenever we use the word **Create** we should immediatly think **POST** request.*
*Whenever we use the word **Remove** we should immediatly think **Delete** request.*

Lets take a look at what is set up in our routes!

*routes/likes.js*
```js
const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes')

router.post('/posts/:id/likes', likesCtrl.create)
router.delete('/likes/:id', likesCtrl.deleteLike)

module.exports = router;
```

- POST - We see have a route set up to create a like, we need the post id of the post in order to know what post to add the like to.

- DELETE - For the delete we just need to know the likes ID in order to remove it

Always refer to our [routing guide](https://gist.github.com/jim-clark/17908763db7bd3c403e6)
- 
