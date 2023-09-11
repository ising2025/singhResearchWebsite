// Filename:    branchDemo.js
// Author:      Ishani Singh
// Objective:   Demonstrate how to sue Github branches

const months = ["January", "Febreuary", "March", "April",
                 "May", "June", "July", "August", "September",
                 "October", "November", "December"]

const d = new Date();

//getMonth() returns the month as an integer (0 - 11). Jan = 0, Dec = 11
// getDay() returns the day as an integer (1 - 31)
// getFullYear() returns the year as a 4 digit number

let month = months[d.getMonth()]
let day = d.getDay()
let year = d.getFullYear()

let currentDate = "The current date is: " + month + " " + day + ", " + year

console.log(d)
console.log(currentDate)