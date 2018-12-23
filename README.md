# SpentTimePlugin
Sort of javascript code for redmine to ease tracking time spent on issues.
*Currently testing on Redmine 3.3.0-1.*

# Introduction
This lightweight javascript code eases the time tracking experience on Redmine, extending it's functionality with a resume/pause button. 
Helps keeping track about the issues the user has been working of during the day.
On issue's page load, a new button will be created. Clicking on this button will record information about the issue, the exact timestamp when is pressed, and recalculate how many minutes are already spent on this issue.

In a future, there will be also a way to easily inspect the generated JSON object to inspect how many minutes per issue has been worked on.

# Functionality
Using some JSON, this app creates a new object in which its position 0 means the current day (used to reset the object as the day ends); issues are saved inside the JSON object as their Issue ID.
This information is saved inside issue's data:
* Issue ID
* Issue name
* Minutes spent
* Last update

# How to use
* The user presses the new button as he/she starts working on an issue.
* When the user finishes the Issue, he/she just need to start working on another issue; clicking again the button on the Issue which is currently working in.

# How to implement on current Redmine server
Implementation is very simple. Just need to reference current javascript inside the next webpage file:
* redmine-3.3.0-1\apps\redmine\htdocs\app\views\issues
