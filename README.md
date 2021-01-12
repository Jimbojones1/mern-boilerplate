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
