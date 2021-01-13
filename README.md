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


