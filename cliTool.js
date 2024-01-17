#!/usr/bin/env node
// This shebang line tells the system this file should be run with Node.js

const { modifyIndexJs, modifyAppCss, modifyAppJs } = require('./modifyFiles');
// import the modifyFiles.js for removing unused lines of code in needed files

const program = require('commander');
// Require the 'commander' package to handle command-line inputs

program.version('1.0.0').description('React Project CLI Tool');
// Set the version and description of your CLI tool

const { exec } = require('shelljs');
// Require 'exec' from 'shelljs' to run shell commands from Node.js

const fs = require('fs');
// Require Node.js 'fs' module to interact with the file system

program
  .command('create <projectName>')
  .description('Create a new React project')
  .action((projectName) => {
    // Define a 'create' command and a function to execute when this command is used

    console.log(`Creating a new React project: ${projectName}`);
    // Log a message indicating the start of project creation

    // Step 1: Create the project using create-react-app
    if (exec(`npx create-react-app ${projectName} --use-npm`).code !== 0) {
      // Run 'create-react-app' command; if it fails (code not 0), display an error and exit
      console.error(`Error: create-react-app failed for project ${projectName}`);
      process.exit(1);
    }

    // Step 2: Navigate into the directory
    process.chdir(projectName);
    // Change the current working directory to the newly created project directory

    // Step 3: Remove unnecessary files
    const filesToDelete = [
        'src/logo.svg', 
        'src/App.test.js', 
        'src/index.css', 
        'src/reportWebVitals.js',
        'src/setupTests.js',
        'public/favicon.ico',
        'public/logo192.png',
        'public/logo512.png'
    ];
    // List of default files from create-react-app to delete
    filesToDelete.forEach(file => {
      fs.unlinkSync(file);
      // Delete each file in the list
    });

    // Step 4: Modify files
    modifyIndexJs();
    modifyAppCss();
    modifyAppJs();
  
    // Step 5: Create folder structures
    const dirsToCreate = ['src/components', 'src/pages', 'src/styles'];
    // Define a list of new directories to create
    dirsToCreate.forEach(dir => {
      fs.mkdirSync(dir, { recursive: true });
      // Create each directory, 'recursive: true' ensures parent directories are created if not existing
    });

    // Step 6: Initialize Git repository
    if (exec('git init').code !== 0) {
      // Initialize a new Git repository; if it fails, display an error and exit
      console.error('Error: git init failed');
      process.exit(1);
    }

    console.log('Project setup complete!');
    // Log a message indicating the completion of the project setup
  });

// Parse the command line arguments provided to the program
program.parse(process.argv);
