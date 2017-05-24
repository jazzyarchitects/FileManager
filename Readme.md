# File Manager
## What this is actually planned as
This project is supposed to be a file manager which works on any web browser just like Google Drive.

## Why am I building this?
I am implementing the following things in this project:
* ES6 imports and exports
* Babel CLI
* GruntJS
* InfernoJS
* Eslint

I hope to have an hands on experience with these technologies which are used in today's web development projects.

## How do I run this?
First you need to clone this repository. Obviously...  
Then run the followin in terminal:  
```shell
  $ yarn install
```

You would need g++ installed on your machine to correctly install and build sharp module.  

Once all the packages have been installed, you need to run two processes -- Grunt and other main terminal.  

Open up a new terminal at project root and run the following:
```shell
  $ grunt serve
```

and run the following in another terminal:
```shell
  $ node index.js
```

Running the grunt process is neccessary at it is required to compile es6 file to es5 JS. 

## Testing and Commiting
Test the changes before commiting to master.  
To make this easy, there is a grunt task which runs the mocha tests and then adds, commits and pushes the changes to the repository.  Prefer using 
```shell
  $ grunt push --message="Commit Message"
```
over 
```shell
  $ git add .
  $ git commit -m "Commit message"
  $ git push origin master
```

## FAQ
1. **Once I run the grunt serve I am unable to edit the compiled files.**  
    The grunt serve process includes a chmod task which assigns a read only status to the compiled files to prevent accidental edits to the compiled files.
2. **I want to contribute.**  
    Feel free to fork this repository. Currently I do not plan to accept any contributions as this is intended only for learning purposes.

## Contact
Visit me at: [http://jibinmathews.in](http://jibinmathews.in)