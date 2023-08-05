# Seraya

Till production ready:

1. Protect the editing letters and editing portfolio (so will need the user in firestore with admin permissions)
2. Firebase rules

User Issue Dilemna:

- Do I create the userDoc from signIn, or from
  createUser.
- So basically debate is do either create and update on every login, OR create only on sign in.
- I will also need to figure out deleting the UserDoc everytime a user is deleted (this will require firebase functions tho)

TODO:

1. BlogEditor component which is built on top of TextEditor, with Extra info like Title, description etc. TextEditor is only for the main body of the page.
2. Change the Blog Displayer to not print arrays and to accomodate rich text! (Will have to dangerously set inner HTML so need to watch out)

Additional:

1. All inputs must be security checked to ensure no HTML injection
2. Add a Seraya Logo to replace the current FloatUI
3. Lazy load images and with blurry placeholder first while main is loading
4. Lazy Load routes
5. Delete all the console.log's when everything is done
6. Once released on site, register with Google and add a CAPTCHA to prevent bots on Contact Form.
7. Make the fonts and the images bigger
8. Setup firebase rules for security
9. Cover any remaining TODO: comments in the project
10. Firestore seems to have a TON of reads, look into that and cleanup functions

<b>Letters Page:</b>

- Make the editing available to only user's with Admin permission

<b>Blog Page:</b>

- Add security to prevent inputs from being injected with HTML
- Add Pagnation once received more blogs
- Make the editing available to user's with Admin permission

<b>Contact Us Page</b>

- Add security to prevent inputs from being injected with HTML
- Add an input field with standard topics (Interested in investing, want to learn more about the fund, other, etc.)

<b>Footer</b>

- Add security to prevent inputs from being injected with HTML
- Add CAPTCHA to prevent spam for the Blog subscription

<b>Sign in</b>

- Add forgot password functionality

<b>Portfolio Page:</b>

- Add sorting ability (sort by % of portfolio ascending and descending)
- Make the editing available to user's with Admin permission

<b>NavBar</b>

<b>Admin and Hooks</b>

- Create an admin UI (Will get admin by manually adding 'admin:true' to my user in database, can also set firebase rules to only allow writing to those collections from logged in users) to create:
  a. Future blogs
  b. Letters
  c. Holdings list for every period

- Create identical userDoc when user signs up and adds it to the database, method is here
  https://stackoverflow.com/questions/72437027/create-identical-user-in-firestore-based-on-firebase-authentication

<b>Forms</b>

(Public -> Contact Us, Email Subscribe, Sign In)

(Private -> UpdateLetters, UpdateBlogs, UpdatePortfolio)

- HTML check for UpdateLetters

<b>Security</b>

1. Write Firebase Rules

2. Stopping bots from spamming forms:
   https://www.mullie.eu/how-to-prevent-form-spam/ ✅ ()

3. Change from checking for HTML to HTML Sanitization: https://mobileappcircular.com/securing-your-website-with-html-input-sanitization-5afa91934120

Input into Firebase Authentication is handled by Firebase,
but input into Firestore (such as through subscribe Blog), should be sanitized.

Output is always sanitized:
"JSX expressions {} automatically take care of encoding HTML before rendering, which means even if u don't sanitise your input your webpage is XSS safe."
https://stackoverflow.com/questions/43584685/input-sanitization-in-reactjs
