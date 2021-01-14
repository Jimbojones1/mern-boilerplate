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

#### React logic 

Looking back on our user stories...

*User Story*

1. A user can click on the heart to create a like and the heart will turn red
2. A user can click on the heart to remove a like and the heart will turn from red to grey

We'll notice that we have to invoke are addLike function when the heart is grey in our Card component, and we'll invoke our removeLike function is grey.

So we'll have to pass down both functions to our card component!

What else will we need to know?

1. We'll have to know if the logged in user has clicked on the heart or not so we'll have to pass the user object down from the app all the way to the card, I trust that you can do that, its alot of layers. (Maybe in the future you can check out some [solutions](https://reactjs.org/docs/context.html) to bypass that, but for now we do it without the magic.

2. Where to setup the functions? We'll set them up where our `posts` state is because we will want to update our cards with the new information about the like being clicked or deleted by setting our state which will cause our cards to rerender!

## First the Feed Page!

```js
import * as likesAPI from '../../utils/likesService';
// rest of code 

      async function addLike(postId){
        try {
          const data = await likesAPI.create(postId);
          console.log(data, ' this is from addLike')
          getPosts()
        } catch(err){
          console.log(err)
        }
      }
    
      async function removeLike(postId){
        try {
          const data = await likesAPI.removeLike(postId);
          getPosts();
        } catch(err){
          console.log(err)
        }
      }
```

- Here we import our likesAPI service and setup our functions
- Notice we can just call `getPosts` after we add or remove a like which will fetch the updated documents from our db, and then inside of `getPosts` it will set our state!

**passing the functions as props**

Feed Page

```js
<PostFeed posts={posts} isProfile={false} numPhotosCol={1} user={user} addLike={addLike} removeLike={removeLike}/>
```

- remember user must be passed down from the app component, so our feed component now recieves the use which we our passing down


PostFeed

```js
    <PostCard post={post} key={post._id} isProfile={isProfile} user={user} addLike={addLike} removeLike={removeLike}/>
```

- Pass them all down again, This concept is called `prop drilling` in the react world.

#### Logic in the Post Card

```js
import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react'


function PostCard({post, isProfile, addLike, removeLike, user}) { 

  const liked = post.likes.findIndex(like => like.username === user.username);
  const clickHandler = liked > -1 ?  () => removeLike(post.likes[liked]._id) : () => addLike(post._id)
  const likeColor = liked > -1 ? 'red' : 'grey';

  return (
    <Card key={post._id}>
     {isProfile ? ''
        :  <Card.Content textAlign='left'>
            <Image
                floated='left'
                size='large'
                avatar
                src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
            />
          <Card.Header floated="right">{post.user.username}</Card.Header>
          </Card.Content>
      }
      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
      <Card.Description>
        {post.caption}
      </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={'right'}>
        <Icon name={'heart'} size='large' color={likeColor} onClick={clickHandler} />
        {post.likes.length} Likes
          
      </Card.Content>
    </Card>
  );
}

export default PostCard;
```

Let's break this logic down. 

`const liked = post.likes.findIndex(like => like.username === user.username);`

1.  Here we are using the js array method `findIndex` to find out if there is a like in this particular posts likes array, and to see if the logged in user (user.username) has liked this post already.  If they did this function will return the index of the liked object in the `post.likes` array.  

1a. If it `findIndex` doesn't find anything then it will return -1

`const clickHandler = liked > -1 ?  () => removeLike(post.likes[liked]._id) : () => addLike(post._id)`

2.  Then if we found an index `liked` value will be greater then negative one which means we want our click handler to be our remove like function.  

2a. `removeLike(post.likes[liked]._id)`, Here we are finding the particular `likes` id on our post because that is what our server needs in order to delete our like, remeber the server route. 

```js
router.delete('/likes/:id', likesCtrl.deleteLike)
```

2b.  `() => addLike(post._id)`, If the logged in user hasn't clicked on the heart, `liked` value will be -1 then we know that the logged in user hasn't liked the post yet, so we want to send over the `post._id` so we can add a like to that particular post!

```js
router.post('/posts/:id/likes', likesCtrl.create)
```

The Color 

```js
const likeColor = liked > -1 ? 'red' : 'grey';
```

3.  We just use the same logic here, if the logged in user is found in the `post.likes` array than the heart should be `red` because the user has liked the particular post, and it should be grey if they haven't

Then we just add those values to our `Icon` componenet!

```js
 <Icon name={'heart'} size='large' color={likeColor} onClick={clickHandler} />
        {post.likes.length} Likes
```

*Go ahead and test it out*

#### Profile page

- Pretty much the same logic applies as the feed, and we have already done the hard work because we are reusing our components!

- The one difference instead of calling `getPosts` after we create our delete a like, what will we call?


```js
    async function addLike(postId){
        try {
          const data = await likesAPI.create(postId);
          console.log(data, ' this is from addLike')
          getProfile()
        } catch(err){
          console.log(err)
        }
      }
    
      async function removeLike(postId){
        try {
          const data = await likesAPI.removeLike(postId);
          getProfile();
        } catch(err){
          console.log(err)
        }
      }
```

- Thats right we call getProfile, because on this page we need to update this particular users posts, and then we just pass down everything just like before.

ProfilePage
```js
   <PostFeed isProfile={true} posts={posts} numPhotosCol={3} user={user} addLike={addLike} removeLike={removeLike}/>
```

- and since we are reusing our components we are know done! How cool is that! The power of props!

