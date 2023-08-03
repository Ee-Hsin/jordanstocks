# Seraya

TODO tomorrow:

1. Make Letter Editor upload (just need to work on the uploadStorage function now)
2. Make LetterDisplay fetch from firestore
3. BlogEditor component which is built on top of TextEditor, with Extra info like Title, description etc. TextEditor is only for the main body of the page.
4. Change the Blog Displayer to not print arrays and to accomodate rich text! (Will have to dangerously set inner HTML so need to watch out)

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

- Letter Editor is just a title, a Javascript date that we select, and an
  upload PDF section. When form is submitted, we save it as a doc of a collection
  called 'letters'. Doc will look like this:
  {title: "2023 Annual Letter", date: "25th July", pdf: "download link" } and we
  get the downlad link with getDownloadUrl when we upload the PDF file.

<b>Blog Page:</b>

- Add security to prevent inputs from being injected with HTML
- Add CAPTCHA to prevent this input from being spammed by robots
- Add Pagnation once received more blogs

<b>Contact Us Page</b>

- Add security to prevent inputs from being injected with HTML
- Add a CAPTCHA to prevent form from being spammed by bots
- Add an input field with standard topics (Interested in investing, want to learn more about the fund, other, etc.)

<b>Footer</b>

- Add security to prevent inputs from being injected with HTML
- Add CAPTCHA to prevent spam for the Blog subscription

<b>Sign in</b>

- Add forgot password functionality

<b>Portfolio Page:</b>

- Add sorting ability (sort by % of portfolio ascending and descending)
- Make it only available to user's with Admin permission

<b>NavBar</b>

<b>Admin and Hooks</b>

- Create an admin UI (Will get admin by manually adding 'admin:true' to my user in database, can also set firebase rules to only allow writing to those collections from logged in users) to create:
  a. Future blogs
  b. Letters
  c. Holdings list for every period

- Create identical userDoc when user signs up and adds it to the database, method is here
  https://stackoverflow.com/questions/72437027/create-identical-user-in-firestore-based-on-firebase-authentication

<b>Forms</b>

Input into Firebase Authentication is handled by Firebase,
but input into Firestore (such as through subscribe Blog), should be sanitized.

Output is always sanitized:
"JSX expressions {} automatically take care of encoding HTML before rendering, which means even if u don't sanitise your input your webpage is XSS safe."
https://stackoverflow.com/questions/43584685/input-sanitization-in-reactjs

1. Sign In form (only Email and Passsword inputs)

- use checkForHTML to ensure no HTML
- Captcha to prevent spam
- Could use React Hook Form to feedback missing email or password, BUT unncessary as we alr put required on the input tags AND we dont need to feedback things like minimum or maximum characters since this is only the sign in page.

2. Subscribe Blog forms (only Email)

- Captcha to prevent spam
- React Hook Form unnecessary as only one state

3. Contact Us Form (First Name, Last Name, email, message)

- use checkForHTML to ensure no HTML
- Captcha to prevent spam
- Used React Hook Form

4. sendPortfolio form (stock name, ticker, units, price, currency, conversion)

- Ensure all fields are filled and valid
- I just encuntered an issue where I put a '/' in the field, which SHOULD NOT be allowed because
  it caused my database to have an error.
- Prevent SQL or HTML injections
- Captcha to prevent spam

<b>Security</b>

Write Firebase Rules

Stopping bots from spamming forms:
https://www.mullie.eu/how-to-prevent-form-spam/

HTML Sanitization: https://mobileappcircular.com/securing-your-website-with-html-input-sanitization-5afa91934120
