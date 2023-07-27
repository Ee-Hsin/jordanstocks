# Seraya

TODO tomorrow:

1. Blogs should be rendered from firebase database
2. Custom user Hook
3. Add a Contact Us page

Additional:

1. Add a Seraya Logo to replace the current FloatUI
2. Lazy load images and with blurry placeholder first while main is loading
3. Lazy Load routes
4. Delete all the console.log's when everything is done

<b>Letters Page:</b>

- Similar to Blog Page UI
- In Each Letter, has downloadable PDF taken from firebase storage.

<b>Blog Page:</b>

- Render them directly from front end first, then switch them into being retrieved from Firebase.
- Since need to fetch in BlogPage and then again in individual blog, should use the React Router loader and useLoaderData and nest the dynamic route to fetch only at the blog page and use that info for the individual blog page. OR use React Query and still need to technically query twice, BUT it caches the stuff for me. I think I might go with the React Query Route.
- Add Pagnation once received more blogs
- Ability to subscribe from Blog Page

<b>Contact Us Page</b>

- Simple Contact Us Page with form that emails to me (eehsinkok777@gmail.com)

<b>Holdings Page:</b>

- Appears on Navbar and is only visible user is logged in.
- Similar UI to BlogPage with each section (for every 6 months) holding a link to a table of holdings.

<b>Footer</b>

- Ability to subscribe to blog from the Footer

<b>Admin</b>

- Create an admin UI to create future blogs as well as Letters and send them into firebase. Will get admin by manually adding 'admin:true' to my user in database.
- Custom user hook to check if user is signed in on partnership letter page and that will pick they can access the holdings PDF or not.
