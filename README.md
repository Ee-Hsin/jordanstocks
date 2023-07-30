# Seraya

TODO tomorrow:

1. Sort out Navbar UI changes

- SignOut is also too small in responsive mode
- Scroll up everytime link is changed

2. Add protected Holdings page and link

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

<b>Holdings Page:</b>

- Appears on Navbar and is only visible user is logged in.
- Similar UI to BlogPage with each section (for every 6 months) holding a link to a table of holdings.

<b>NavBar</b>

- SignOut is also too small in responsive mode\
- Scroll up everytime link is changed

<b>Admin and Hooks</b>

- Create an admin UI (Will get admin by manually adding 'admin:true' to my user in database, can also set firebase rules to only allow writing to those collections from logged in users) to create:
  a. Future blogs
  b. Letters
  c. Holdings list for every period

- Custom user hook to check if user is signed in on partnership letter page and that will pick they can access the holdings PDF or not.
- Create identical userDoc when user signs up and adds it to the database, method is here
  https://stackoverflow.com/questions/72437027/create-identical-user-in-firestore-based-on-firebase-authentication
