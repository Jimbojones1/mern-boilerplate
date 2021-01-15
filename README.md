## Setup 

1. Clone the repo
2. Rename the folder to your Project 
3. Delete the `.git` file, when you are in the root of the file, you can press `ls -a` and you should see a `.git` file, then go ahead and run `rm -rf .git`


#### Setup your git repo
1. in the project root `git init`
2. `git add .` to add all the starter code
3. `git commit -m "setup boilerplate"` 
4. go to github and create your github and create a repo (Without a readme or liscense you can add that later!)
5. copy the remote address
6. In your terminal add the remote `git remote add origin 'yourGithubRepo'sAddressGoesHere`
7. `git pull origin master` If a screen pulls up asking you to do something just press `:q` and then `enter` (thats vim btw :) )
8. `git push origin master`

#### update npm packages

1. `npm update` this will update your node packages to the latest version, this can help keep your boilerplates up to date

#### Setup .env file

1. `touch .env` in the root of your project
2. Add the `SECRET` that your jwt tokens require

```
SECRET=ILOVETACOS
```

#### update package.json 

- update the name property in your package.json to the name of your project

#### Public folder

- `index.html` - update the `title` property to the name of your project

#### update db name

- auth/db.js

```js
mongoose.connect(
  'mongodb://localhost:27017/puppies', // update puppies to your projects name
  { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);
```
