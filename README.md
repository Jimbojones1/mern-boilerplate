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

#### Making our Util functions

Since we are making requests to update a new resource likes make a new util module for the likesService

```
touch utils/likesService
```

Then lets decide what our base url is? Remeber we need to look at the server to see where our likes router is mounted, if we look at the server we will find.

```js
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api', require('./routes/api/likes'));

// rest of code
```

So we see our base url will be ```/api```

Lets go ahead and write out our util functions.

```js
import tokenService from './tokenService';

const BASE_URL = '/api';

export function create(id) {
    return fetch(`${BASE_URL}/posts/${id}/likes`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => res.json());
  }

export function removeLike(id){
    return fetch(`${BASE_URL}/likes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}
```

- Always sending across our user token! Remember this always us to access req.user in any of our routes thanks to our `app.use(require('./config/auth')); ` middleware!

