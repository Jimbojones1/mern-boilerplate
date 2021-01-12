<img src="https://i.imgur.com/fx2orT2.png">

## Learning Objectives

| Students Will Be Able To: |
| --- |
|Create a Feed Page to Render out Posts |
| Create a Form in order to submit a Post |
| Understand the flow of a post request client to server |


## Wireframe 


![Imgur](https://i.imgur.com/3hY0xP0.png)


We are going to develop our Feed Page today.  

- Lets go ahead and create a component to hold our page!

```
mkdir Feed
touch Feed/Feed.jsx
```

and then lets just render out something simple to test it

```js
import React, from 'react';

export default function Feed(props){  
    return (
        <>
        <span>The Feed</span>
        </>
    )
}
```


and then render it out instead of our home page.

```js
// top of file
import Feed from '../Feed/Feed'

// rest of code

return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <Feed />
          </Route>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
      </Switch>
    </div>
  );
```

**Planning The components**
Looking back on the wireframe 

<details open>
<summary>what components are being rendered out on the page?</summary>
<br>
1. Header Component <br/>
2. a addPostForm Component <br/>
3. Post Feed Component that will render each Post <br/>
4. A Card for each Post <br />
</details>


Okay now that we know what components we need lets go ahead and create all of those in our components folder. We're going to assume from here on out you can make the proper file structure

- components/Header/Header.jsx

```js
import React from 'react';

import { Header, Segment} from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
    return (
        <Segment>
            <Header as='h2' >
              This is the HEADER!
            </Header>
        </Segment>
    )
}
```

- components/AddPostForm/AddPostForm.jsx

```js
import React, { useState } from 'react';

export default function AddPostForm(){
    
    return (
        <span> Post Form</Form>
    )
}

```

- components/PostFeed/PostFeed.jsx

```js
import React from 'react';

export default function PostFeed(props){

    return (
       <div>THIS IS THE POST FEED THAT WILL RENDER OUT EACH POST AS A CARD</div>
    )
}
```
- componets/PostCard/PostCard.jsx

```js
import React from 'react';

function PostCard(props) { 

  return (
    <div>I will render each post as a semantic ui card</div>
  );
}

export default PostCard;
```

- Okay, So we created all of our components that will be rendered as children or further descendents of our `Feed` Component.

**Rendering the components in our Feed Component**

```js
import React,  from 'react';
import PageHeader from '../../components/Header/Header';
import AddPost from '../../components/AddPostForm/AddPostForm';
import PostFeed from '../../components/PostFeed/PostFeed'; 


export default function Feed(props){

    return (
        <>
        <PageHeader />
        <AddPost />
        <PostFeed/>
        </>
    )
}
```


**Creating a Post**

- Lets first create our form, It is going to look very similiar to yesterday 

- AddPostForm

```js
import React, { useState } from 'react';

import { Button, Form, Grid, Header, Image,  Segment } from 'semantic-ui-react'

export default function AddPuppyForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    caption: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('caption', state.caption)
    
    // Have to submit the form now! We need a function!
  }


  return (
    
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="caption"
                  value={state.caption}
                  placeholder="What's on your pups mind?"
                  onChange={handleChange}
                  required
              />   
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />   
              <Button
                type="submit"
                className="btn"
              >
                ADD PUPPY
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}
```

**key things to note**

Styling - we are using semantic ui's [grid prop](https://react.semantic-ui.com/collections/grid/) verticalAlign, to align our component in the middle of the page! We are also setting the max-width to make sure our form doens't take up the whole page.

formData - Since we have to send over a formData to the server we have to create formData and append our state propeties to it, and this is what we will pass to our function that will make our api call to our server.

**Creating a fetch Post function**

- Since we are dealing with a new resource "posts", we'll create a new utility module to handle all of its crud operations.

```
mkdir utils/post-api.js
```

What is going to be are base URL for this resource? Hint look at the server and see what is set up to handle the "post resource requests"

```js
import tokenService from './tokenService';

const BASE_URL = '/api/posts';

export function create(post) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: post,
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => res.json());
  }

```

- Things to note here, the header is how we have to send over our token that is being stored in localstorage. We have to do this for every resource besides login and signup, because those are the operations that create the token.  Remember when we send over the token, it goes through our ```app.use(require('./config/auth')); ``` middleware and inside of that module, we check to see if the token exists and is valid, and if it is we assign the decoded tokens value to req.user ```req.user = decoded.user;```

**Where to import the function**

- What we want to do is think about where we want to keep our state for all the Posts that will be rendered in our feed!

- Since we want to be able to pass down all of our posts in the future to our `PostFeed` component, it would make sense to set up our function in our `Feed` component!

```
import React, { useState, useEffect } from 'react';
import AddPost from '../../components/AddPostForm/AddPostForm';
import * as postsAPI from '../../utils/post-api';

export default function Feed(){
  const [posts, setPosts] = useState([])


  async function handleAddPost (post){
   
    const data = await postsAPI.create(post);
    console.log(data)
  }

  
    return (
        <>
         <PageHeader />
        <AddPost handleAddPost={handleAddPost}/>
        <PostFeed/>
        </>
    )
}
```

Here we set up our utility function in `handleAddPost` in the Feed component that will hold our state that contains all the posts for our app!

**Now lets use it!**

AddPostForm

```js
 function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('caption', state.caption)
    props.handleAddPost(formData); // calling our function!
 }
```

- How would you confirm that it worked!

- Check the response and check the server!

**Checking the server**

we see our server just has a simple response

```js
function create(req, res){
   console.log(req.body, req.file)
   res.json({data: 'working'})
}
```

- Seeing an empty object and undefined for our logs, what do we have to set up again? What kind of request are we making?

**Setting up a form/multipart process on the server**

- setup our multer!

- routes/posts.js

```js
const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer  = require('multer')
const upload = multer()
// /*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)


/*---------- Protected Routes ----------*/

module.exports = router;
```

- As we can see we set up it up the same way, We initialize multer, and then add it to the middlechain on the function that is recieving a file

- `upload.single('photo')` - photo is the property we are expecting from the request that has the value of our image.

- Testings again we should be able to confirm the proper logs!

**Setting up the Post Create function**

- We need the aws/sdk again in order to upload our image to aws
- Also be sure to check the model in order to see what properties you need to be adding!

controllers/posts.js
```js
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid'); // import uuid to generate random ID's

const s3 = new S3(); // initialize s3 constructor

module.exports = {
    create,
    index
}

function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: 'collectorcat', Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){

            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});

            console.log(post)
            res.status(201).json({post: post})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}


// rest of code!
```

Looking at the post model we see have the following properties (photoUrl, user)

```js
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    likes: [likesSchema]
  })
```

- so we have to pass to our create both the userId, and the photoUrl of our image location on aws!

- Where is req.user coming from again? If you can't remeber, scroll up and read again!

**Setting are state**

Feed.jsx

```js
import AddPost from '../../components/AddPostForm/AddPostForm';
import * as postsAPI from '../../utils/post-api';

export default function Feed({ user,handleLogout}){
  const [posts, setPosts] = useState([])


  async function handleAddPost (post){
    console.log(post)
    const data = await postsAPI.create(post);
    console.log(data.post, ' This is new pup', data, ' data variable')
    setPosts(posts => [data.post, ...posts])
  }

```

- Here our actually object is inside of data.post, where is post coming from? Check the controller function!

- Then in our setPosts, we are creating a new array, adding our post to the front of the array, and spreading out all the old posts into the rest of the array!

- Then confirm that it works by looking in the devtools at your Feed component and you should see something like this

![Imgur](https://i.imgur.com/I9NiqGp.png)


**Resources**

[multer](https://www.npmjs.com/package/multer)
[aws/sdk](https://www.npmjs.com/package/aws-sdk)
[semantic ui react](https://react.semantic-ui.com/)
