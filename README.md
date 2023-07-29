# Seraya

TODO tomorrow:

1. Add subscribing to newsletter from footer (just adds an email to a document (called by the email but with dateSubscribed and email, to a collection called emailList))
2. Timestamps! https://stackoverflow.com/a/70451350/15426643
3. Change userAuth to useAuth in AuthContext.jsx since custom hooks (aka functions) using hooks
   must start with 'use'. userAuth uses useContext so it must be called useAuth or useUserAuth.
   (useAuth is also what we called it in Speer)

Additional:

1. Add a Seraya Logo to replace the current FloatUI
2. Lazy load images and with blurry placeholder first while main is loading
3. Lazy Load routes
4. Delete all the console.log's when everything is done
5. Once released on site, register with Google and add a CAPTCHA to prevent bots on Contact Form.
6. Make the fonts and the images bigger

<b>Letters Page:</b>

- Similar to Blog Page UI
- In Each Letter, has downloadable PDF taken from firebase storage.

<b>Blog Page:</b>

- Ability to subscribe to email list from Blog Page
- Add security to prevent inputs from being injected with HTML
- Add CAPTCHA to prevent this input from being spammed by robots
- Add Pagnation once received more blogs

<b>Contact Us Page</b>

- Add an input field with standard topics (Interested in investing, want to learn more about the fund, other, etc.)
- Add security to prevent inputs from being injected with HTML
- Add a CAPTCHA to prevent form from being spammed by bots

<b>Holdings Page:</b>

- Appears on Navbar and is only visible user is logged in.
- Similar UI to BlogPage with each section (for every 6 months) holding a link to a table of holdings.

<b>Footer</b>

- Ability to subscribe to blog from the Footer

<b>NavBar</b>

- Navbar should close everytime the page changes
- SignOut is also too small in responsive mode

<b>Admin</b>

- Create an admin UI to create future blogs as well as Letters and send them into firebase. Will get admin by manually adding 'admin:true' to my user in database.
- Custom user hook to check if user is signed in on partnership letter page and that will pick they can access the holdings PDF or not.
- Create identical userDoc when user signs up and adds it to the database, method is here
  https://stackoverflow.com/questions/72437027/create-identical-user-in-firestore-based-on-firebase-authentication
