# Battleship Test

## TL;DR

Open dist/index.html

## Running locally

*NOTE NODE & NPM REQUIRED*

### Dependencies

`npm install`

### Launch

`gulp dev`

This will start a webserver on port 9000 with live reload

# How to play

* Grid is number A-J for the rows and 1-10 for the columns
* Enter a grid coordinate (eg A5) to the text field and hit the fire button
* Status of each attempt will be shown as text above the text field

# Notes

* Unfortunatlely the enter key can't be used to fire, this was due to issues with the form reloading the current page, and returning false from my JS handler didn't appear to have the desired effect
* The logic for setuping up the grid can be found in src/js/battleship-grid.js
* I realise the instructions said not to spend too much time on the UI but I needed it anyway to visually verify that the code was working as intended
