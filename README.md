# SkyPulse
## Overview

I have built a basic weather application that uses the weather.gov API, found here: [https://www.weather.gov/documentation/services-web-apiLinks to an external site.](https://www.weather.gov/documentation/services-web-api). It has these pages and sections:

* Home
    * Modal with a form to sign in (doesn't do anything yet)
        * Username
        * Password
        * Forgot username or password
    * Navbar:
        * Links to the "About", "FAQ", and "Contact" pages
    * Sidebar from bootstrap
    * Cards:
        * Current weather conditions
        * Current weather alerts (e.g. Excessive Heat Warning)
        * A card that displays the weather over the next 24 hours
            * Use a line chart from Chart.js: https://www.chartjs.org/docs/latest/samples/line/line.html
* About
    * Has a simple description of who I am and why I made this site.
* FAQ
    * Lists out what API and chart was used, along with other facts about this page. (e.g. The login button does not log you in)
* Contact
    * A form with these fields:
        * Name
        * Email
        * Category (dropdown button)
            * Question
            * Feature request
            * Bug
            * Report
        * Message
