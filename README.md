### To sync your code with Jim's latest commit:

- git fetch --all
- git reset --hard origin/master


<img src="https://i.imgur.com/fx2orT2.png">

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Create a Profile Page  |
| Understand the flow of a post request client to server |
| Understand flow of props and Create user Bio Section |


## Wireframe 

#### Profile Page

![Imgur](https://i.imgur.com/dUdOeu3.png)


- What components do we have?

1.  It looks like we have the header component
2.  A Profile Bio with the image of the user and thier information
3.  A container for the the users posts
4.  Cards to render out each Post!


### Step One Set up your the basic components!

1. Create the Profile Page.

pages/ProfilePage/ProfilePage.jsx

```js
import {  Grid } from 'semantic-ui-react'
export default function ProfilePage({user}){

  return (
    <div> This is Profile Page</div>
  )
}
```

2. Render it out in the app!

- Here we need to Create a new Route for the profile page,
- We'll use the username for the profile route to make navigation easy just like fb and instagram!

- app.js

```js
 <Switch>
    <Route exact path="/">
        <Feed user={user}/>
    </Route>
    <Route exact path="/login">
       <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
    </Route>
    <Route exact path="/signup">
       <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
    </Route>
    <Route path="/:username">
       <ProfilePage />
    </Route>
</Switch>

```

- We are using params here so the user can search any username!

3. Lets Create are other components that we will need the Profile Bio and ProfilePostDisplay!

- components/ProfilePostDisplay/ProfilePostDisplay

```js
import React from 'react';
import { Card } from 'semantic-ui-react'
import Post from '../PostCard/PostCard';


export default function ProfilePostDisplay(props){

    return (
      
       <div>Profile Post Display Container</div>
    
    )
}
```

- Notice how this component is importing the Post component we'll be able to reuse, and the Card from semantic ui which will be helpful later on in styling. 

- components/ProfileBio/ProfileBio

```js
import React from 'react';
import {  Image, Grid, Segment } from 'semantic-ui-react';


function ProfileBio() { 
  return (
   <h1>Profile Bio Area</h1> 
  );
}



export default ProfileBio;
```

### Setting up the Profile Page 

- Lets import our components and render them out in different rows like wireframe


```js
import React, { useState, useEffect } from 'react';
import {  Grid } from 'semantic-ui-react'
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfilePostDisplay from '../../components/ProfilePostDisplay/ProfilePostDisplay';
import PageHeader from '../../components/Header/Header';


export default function ProfilePage(){


    return (
    
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                    <PageHeader />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ProfileBio />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column style={{ maxWidth: 750 }}>
                        <ProfilePostDisplay />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

           
        </>       
    )
}
```

### Fetching the Users Data

- When we navigate to a users profile page we'll have to fetch that particular users information when the page loads up!
- So we'll have to use our `useEffect` hook to make sure we run our fetch when the page loads!

- Lets take a look at the route we'll have to make a request to on the backend!

routes/api/users.js

```js
router.get('/:username', usersCtrl.profile);
```

- We see have a route which full address is `/api/users/:username` set up that will trigger our `usersCtrl.profile` route. Lets go checkout that route as well!


controllers/users.js

```js
async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    const posts = await Post.find({user: user._id});
    console.log(posts, ' this posts')
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    console.log(err)
    res.send({err})
  }
}
```

- So we see here that this endpoint will return both the user's posts and the users information in the same respective properties, so making a call to this endpoint will give us everything we need!


**What do we have to do now?**

- You guessed it lets add a function to our `userService` in order to fetch our profile!

```js
function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  })
  .then(res => {
    if(res.ok) return res.json();
    throw new Error('Bad Credentials!')
  })
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};
```

- We see our function will take in a username (whatever the username in the url will be!), and we are sending over our jwt for authentication!
- now back to the profilePage

**Making the api call when the page loads**

- make the imports at the top 

```js
import userService from '../../utils/userService';
import { useLocation } from 'react-router-dom';
```

- We will use the `useLocation` hook from react-router-dom in order to figure out what username is in the url!

- ProfilePage Component

```js
export default function ProfilePage(){

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    
    const location = useLocation()
    
    async function getProfile(){
       
        try {    

            const username = location.pathname.substring(1)
            // This gets the username from the url! 
            console.log(username)
            const data = await userService.getProfile(username);
            console.log(data)
            setLoading(() => false)
            setPosts(() => [...data.posts])
            setUser(() => setUser(data.user))
        } catch(err){
            console.log(err)
            setError(err)
        }
        
        
    }

    useEffect(() => {
        getProfile()
       
    }, [])



    return (
    
        <>
        { loading ?  
            <h1>Loading.....</h1>
            :
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                    <PageHeader />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ProfileBio user={user}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column style={{ maxWidth: 750 }}>
                        <ProfilePostDisplay />
                    </Grid.Column>
                </Grid.Row>
            </Grid>   
            }           
        </>    
    )
}
```




