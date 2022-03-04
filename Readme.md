### Introduction
An appointment management system is a software used by companies and service providers to streamline their service appointments.

By using the system, potential customers can know and choose their preferred appointment times according to the companies and service providers' available time slots.

This project does not include a B2C marketplace-like interface for customers to browse different service providers.

### Requirements
* Create a login system for users to register an account with the system. You may add social logins like Google or Facebook to enhance the sign up/sign in user experience.
* Use a third party JavaScript library or plugin to display a calendar with the available time slots for selected time periods (e.g. a week).
* A business side admin dashboard for businesses to manage available appointment times and future appointments.
* A customer interface where customers can schedule, view, or cancel their appointments with a business.
* Use the simplest scheduler (cron job) to send customers email reminders prior to their appointments.

### Suggested Implementation
* Create a simple login system for registration. Alternatively, use Google, Facebook, or other social login integrations for sign up/sign in.
* Use third party JavaScript calendar like FullCalendar or Javascript event calendar.
* Create a form for logged in customers. The form will allow customers to book an appointment in the upcoming week.
* Create a report where businesses can view the scheduled appointments.
* Allow customers to view and edit their appointments (e.g. reschedule or cancel).
* Allow businesses to change the status of the event (e.g. confirmed, paid, cancelled).

### References
* [Client Side JavaScript Frameworks](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction)
* [Integrating Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in)
* [jQuery Calendar Plugins](https://freefrontend.com/jquery-calendar-plugins/)
* [Queuing Systems for Backend Developers](https://geekflare.com/queuing-systems-for-backend-developers/)