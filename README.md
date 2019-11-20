# CYPRESS BASICS

- Everything in cypress is enqueued and then run async. This means that is you try to execute `var list = cy.get(".todo li")` you will not get the list of todos as you would expect. This is because cypress will get the element asynchornously.
- **{force:true}** flag skips the checks cypress performs to see if the element can be interacted with or not. Eg cypress will ignore all the html elements with css property `display:none`. But with `force:true` these tags are also included.
- **Fixture** : Json data which can be used in the tests. You can get them by appending keywork fixture followed the filename. `fixture:todos` here todos is the filename in fixture folder ie `todos.json`.
- **Commands** : As the name suggests are a set of statements which are bundled together in a function. You can execute these set of statements by using `cy.<commandname>`.
