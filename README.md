## Social-Playlist Client

It is a collaboration between [Daniel Lee Bright](https://github.com/Brahyt), [Glaiza Wagner](https://github.com/glaizawagner), [Wesley Jacobs](https://github.com/wjacobs71086), [Julio Hernandez](https://github.com/hernandez-crypto), and [Lazandrea Celestine](https://github.com/zeecelest)

- [Live app](https://social-playlist.netlify.com)
- [Client-repo](https://github.com/thinkful-ei-heron/SocialPlaylist-Client)
- [Server-repo](https://github.com/thinkful-ei-heron/SocialPlaylist-server)
- [Heroku-endpoint](https://still-fortress-90057.herokuapp.com)
- [Heroku-git](https://git.heroku.com/still-fortress-90057.git)

## Account login for demo

&ensp;username: admin </br>
&ensp;password: pass

## Technologies

&ensp;<strong>Client Side:</strong><br>
- HTML5 | CSS3 | React  |  Javascript  |  Cypress   |  JWT-Decode  |  APIs (GoogleMap and Restaurants)</br>
- Deployed in Netlify

&ensp;<strong>Server Side:</strong><br>
- Node | Express | PostgreSQL | GeoCode | Bcryptjs | JWT | Morgan | Chai | Supertest</br>
- Deployed in Heroku 

## Summary
Social Playlist helps users find new places that other users visited and liked in a specific area. 

## Screenshots
<strong>Landing Page</strong>
![Landing Page]()

<strong>Sign up Page</strong>
![Sign up Page]()

<strong>Log in Page</strong>
![Log in Page]()

<strong>Dashboard Page</strong>
<p>The user's dashboard shows all playlists created by the user. It also shows all the `Hot lists` where user can filter by the city. Hot lists is based on the top 1% of all the likes of all the users. 
<p>This page also shows combined users playlists. The user can browse the list or use a hashtag `i.e. #fun` to display the playlists they are interested in. When user clicks other users' playlists, they will be redirected to the List Page route `list/:id`. It will show all the spots created by that user in their playlist.
![Dashboard Page]()

<strong>List Page</strong>
<p>This page is in route `list/:id`. It has a map that marks all the spots that the user added to their list. When the user hovers over one of the spot markers and clicks the spot name, it will display the details of that spot. 
<p>Below the map there is `current` and `center` buttons. When user clicks the `current` button, it will bring you to user's current location. When you click the `center` button,it will bring you to the center location of the spot lists.
<p>The page also displays the name of the playlist and the lists of spots created by the user or what playlist was clicked by that user.</br>
The `delete` and `edit` button will only appear to the user.
![List Page]()

<strong>Add Playlist Form</strong>
<p>When user clicks the `New Playlist` button in the user's dashboard, it will bring user to the `/newList` route where user needs to provide the required information such as playlist name, city, state, tags, description, and an option if they want their list private.
![Add Playlist]()

<strong>Add Spot Form</strong>
<p>When user clicks one of their playlists in their dashbard or under `Browse all lists`, user will be linked to route `list/:id`. The `New Spot` button will only appear to that user. When this button is clicked, it will bring user to route `/newSpot`. In the form for adding a spot, user is required to fill in information such as Spot name, address, city, and state.
![Add Spot]()

<strong>Update Playlist Form</strong>
<p>The page route is `updateSpot/:id`. In this form the user can update their playlist.
![Update Playlist]()

<strong>Update Spot Form</strong>
<p>The page route is `updateList/:id`. In this form the user can update their spots.
![Update Spot]()


Copyright © 2020