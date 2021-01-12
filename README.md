<img src="https://i.imgur.com/fx2orT2.png">

## Learning Objectives

| Students Will Be Able To: |
| --- |
|Create a Feed Page to Render out Posts |
| Create a Form in order to submit a Post |
| Understand the flow of a post request client to server |


## Wireframe 


![Imgur](https://i.imgur.com/3hY0xP0.png)


We are going to develop are Feed Page today.  

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

- Things to note here, the header is how we have to send over our token that is being stored in localstorage. We have to do this for every resource besides login and signup, because those are the operations that create the token.  Remember when we send over the token, it goes through our ```app.use(require('./config/auth')); ``` middleware and inside of that module, we check to see if the token exists and is valid, and if it is we assing the decoded tokens value to req.user ```req.user = decoded.user;```
