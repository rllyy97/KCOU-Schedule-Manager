# KCOU-Schedule-Manager
## Team Members: Riley Evans, James Jung
FM schedule manager for KCOU 88.1FM in Columbia, MO

### APPLICATION DESCRIPTION
This project (KCOU Schedule Manager) is an interactive scheduling web app that manages the KCOU 88.1FM show schedule and show hosts.  The FM schedule is displayed in a weekly-calendar sort of view where the columns are the days of the week and the time starts at midnight one morning to 11:59 that night.  The shows are mainly organized by date/time in the week, but also have color categories based on the genre of show.  These shows when clicked take you to a more detailed screen showing the name, hosts, day of the week, start time, end time, description.  There are two buttons at the top to edit and delete the show, edit takes you to another page where you can change or add info as needed, then advances you to input show hosts.

This application is intended to solve a problem we have had of having multiple versions of schedules that should be the same, leading to issues when trying to figure out what is correct and where some of the detailed information is.  This gives everyone the same unified schedule with all of the needed information for a show.

### DATABASE SCHEMA (table definitions)

### Shows:

id int primary key NOT NULL AUTO_INCREMENT

title varchar(255) NOT NULL

category varchar(255) NOT NULL

start_time time NOT NULL

end_time time NOT NULL

description text NOT NULL

weekday varchar(255) NOT NULL

### Hosts:

id int primary key NOT NULL AUTO_INCREMENT

show_id int NOT NULL

first_name varchar(255) NOT NULL

last_name varchar(255) NOT NULL

dj_name varchar(255) NOT NULL

### ENTITY RELATIONSHIP DIAGRAM
![ERD](https://raw.githubusercontent.com/rllyy97/KCOU-Schedule-Manager/master/ERD.png)

### C.R.U.D. COMPLIANCE
 - CREATE - On the homescreen, the “Add” button sends the user to the edit page where they can fill out all the info for a show, when the user clicks the “Save” button it creates a new entry in the “shows” table. On this page, the user additionally adds "hosts" per show. These hosts are added to our hosts table, with each being given a show_id value equivalent to our just created show's id.

 - READ - The homescreen reads in all of the show names, IDs, and times to place them in view.  The detail page, which appears after clicking on a show, reads all show information for a specific show in the “shows” table by ID. It also pulls from the hosts table, grabbing matching hosts.

 - UPDATE - On the show detail page, the user can hit an “Edit” button to take them to the edit page where they can update information 
 (show descriptions) that previously existed, then the update is executed when the user clicks the “Save” button.
 
 - DELETE - On the detail page for a show, there is a “Delete” button that when clicked simply deletes that show and sends the user back to the homescreen.

### VIDEO DEMONSTRATION (url)

https://youtu.be/WIPJeY9fh34
