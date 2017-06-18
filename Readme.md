# File Manager
## What this is actually planned as
This project is supposed to be a file manager which works on any web browser just like Google Drive but for your own server.

## Why am I building this?
I am implementing the following things in this project:
* ES6 imports and exports
* Babel CLI
* GruntJS
* ReactJS
* Eslint

I hope to have an hands on experience with these technologies which are used in today's web development projects.

## How do I run this?
First you need to clone this repository. Obviously...  
You would need g++ installed on your machine to correctly install and build sharp module.  
Also ffmpeg>=0.9 is requied for video previews.

Then run the followin in terminal:  
```shell
  $ yarn install
  $ yarn add sharp
```
You may need to install sharp or some other missing dependencies seperately if some error occurs in ``` $ yarn install ``` or if the file is missing in the build file.  

Once all the packages have been installed, you need to run two processes -- Grunt and other main terminal (for development only).  

Open up a new terminal at project root and run the following:
```shell
  $ grunt serve
```

and run the following in another terminal:
```shell
  $ node index.js --password=<enter your required password>
```

Running the grunt process is neccessary at it is required to compile es6 file to es5 JS. 

Or if you do **not** want to run the grunt task then do
```shell
 $ grunt build
 ```
 before 
```shell
  $ node index.js --password=<enter your required password>
```

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
    Feel free to fork this repository.

## Installing on your server (no development)
Download the build-<build-date>.tgz file and extract on your server. This file contains the latest built version of this project.  
Extract the file on your server:
```shell
 $ tar -xvzf /path/to/build-<build-date>.tgz
```
Also you need to install **g++, ffmpeg** from your linux repositories.  
```shell  
 $ cd /path/to/build-<build-date>
 $ npm install sharp
```
Once you extract the file, open the ***package*** folder and run the server using:  

```shell
 $ PORT=your_port_number npm start
```
This will start the file manager with a default password ***helloworld***

or 

```shell
 $ PORT=your_port_number node index.js --password=<your password>
 ```

I would suggest you to run this with forever or pm2 as ffmpeg tends to crash sometimes.  

Cheers

## Requests / In pipeline (hopefully)
* Someone willing to add a feature to take snapshot of the first page of a PDF file and send it for pdf preview will be appreciated.  
* Sharing a folder option  
* The file path seperators used are of specifically linux. Someone willing to make it independent?
* Audio playing in audio preview
* Adding test cases  
* Preview for document (.doc, .xls...) files  
* Zip file preview and extraction
* Video preview instead of single snapshot
* Make file or shell script to install sharp and other dependencies after extracting the build

## Contact
Visit me at: [http://jibinmathews.in](http://jibinmathews.in)