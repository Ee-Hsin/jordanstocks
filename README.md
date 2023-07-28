# Seraya

TODO tomorrow:

1. Add a Contact Us page

Additional:

1. Add a Seraya Logo to replace the current FloatUI
2. Lazy load images and with blurry placeholder first while main is loading
3. Lazy Load routes
4. Delete all the console.log's when everything is done

<b>Letters Page:</b>

- Similar to Blog Page UI
- In Each Letter, has downloadable PDF taken from firebase storage.

<b>Blog Page:</b>

- For individual Blog Page, can get existing data from queryClient with queryClient.getQueryData('blogPosts') and then filter it out from there.
  (https://stackoverflow.com/questions/68336399/access-data-already-fetched-with-react-query-in-other-component)
- Ability to subscribe to email list from Blog Page
- Add Pagnation once received more blogs

<b>Contact Us Page</b>

- Simple Contact Us Page with form that emails to me (eehsinkok777@gmail.com)

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
