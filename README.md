# Seraya

TODO tomorrow:

1. Use form validation to ensure Update Portfolio Holdings submits properly (can apply learnings to the Contact Us Form)
2. Make sure useMutation submits correctly
3. create another fetch React query for Holdings page to fetch from firebase

Additional:

1. All inputs must be security checked to ensure no HTML injection
2. Add a Seraya Logo to replace the current FloatUI
3. Lazy load images and with blurry placeholder first while main is loading
4. Lazy Load routes
5. Delete all the console.log's when everything is done
6. Once released on site, register with Google and add a CAPTCHA to prevent bots on Contact Form.
7. Make the fonts and the images bigger

<b>Letters Page:</b>

- Similar to Blog Page UI
- In Each Letter, has downloadable PDF taken from firebase storage.

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

- Make UpdatePortfolio, make it work
- Make it only available to user's with Admin permission
- Similar UI to BlogPage with each section (for every 6 months) holding a link to a table of stocks.

<b>NavBar</b>

- SignOut is also too small in responsive mode\
- Scroll up everytime link is changed

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

- Captcha to prevent spam
- Could use React Hook Form to feedback missing email or password, BUT unncessary as we alr put required on the input tags AND we dont need to feedback things like minimum or maximum characters since this is only the sign in page.

2. Subscribe Blog forms (only Email)

- Captcha to prevent spam
- React Hook Form unnecessary as only one state

3. Contact Us Form (First Name, Last Name, email, message)

- Captcha to prevent spam
- Used React Hook Form

4. sendPortfolio form (stock name, ticker, units, price, currency, conversion)

- Ensure all fields are filled and valid
- Set default USD conversion rate to 1, and make calculations for value (in USD) before sending POST request
- Prevent SQL or HTML injections
- Captcha to prevent spam
