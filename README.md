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
Well, you asked for it!
</details>
