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

*Whenever we use the word **Create** we should immediatly think **POST** request.

