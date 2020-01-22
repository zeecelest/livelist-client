## Project Name: Social-Playlist

It is a collaboration betwen [Daniel Lee Bright](https://github.com/Brahyt), [Glaiza Wagner](https://github.com/glaizawagner), [Wesley Jacobs](https://github.com/wjacobs71086), [Julio Hernandez](https://github.com/hernandez-crypto), and [Lazandrea Celestine](https://github.com/zeecelest)

- [Live app](https://social-playlist.netlify.com)
- [Heroku-endpoint](https://still-fortress-90057.herokuapp.com)
- [Heroku-git](https://git.heroku.com/still-fortress-90057.git)
- [Client-Repo](https://github.com/thinkful-ei-heron/SocialPlaylist-Client)
- [Server-Repo](https://github.com/thinkful-ei-heron/SocialPlaylist-server)

## Account login for demo

&ensp;username: admin </br>
&ensp;password: pass

## Technologies

&ensp;Client Side:<br>
&ensp;&ensp; HTML5 | CSS3 | React  |  Javascript  |  Cypress   |  JWT-Decode  |  APIs (GoogleMap and Restaurants)
&ensp;&ensp; Deployed in Netlify

&ensp;Server Side:<br>
&ensp;&ensp; Node | Express | PostgreSQL | GeoCode | Bcryptjs | JWT | Morgan | Chai | Supertest
&ensp;&ensp; Deployed in Heroku 

## Summary
Social Playlist helps users find new places that other users visited and liked in a specific area. 

## Screenshots
&ensp;Landing Page
![Landing Page]()

&ensp;Sign up Page
![Sign up Page]()

&ensp;Log in Page
![Log in Page]()

&ensp;Dashboard Page
The user's dashboard shows all playlists created by the user. It also shows all the `Hot lists` where user can filter by the city. Hot lists is based on the top 1% of all the likes of all the users.  </br> 
This page also shows combined users playlists. The user can browse the list or use a hashtag `i.e. #fun` to display the playlists they are interested in. When user clicks other users' playlists, they will be redirected to the List Page route `list/:id`. It will show all the spots created by that user in their playlist.
![Dashboard Page]()

&ensp; List Page
This page is in route `list/:id`. It has a map that marks all the spots that the user added to their list. When the user hovers over one of the spot markers and clicks the spot name, it will display the details of that spot. 
Below the map there is `current` and `center` buttons. When user clicks the `current` button, it will bring you to user's current location. When you click the `center` button, it will bring you to the center location of the spot lists.  <br>
The page also displays the name of the playlist and the lists of spots created by the user or what playlist was clicked by that user.</br>
The `delete` and `edit` button will only appear to the user.
![List Page]()

&ensp; Add Playlist Form
When user clicks the `New Playlist` button in the user's dashboard, it will bring user to the `/newList` route where user needs to provide the required information such as playlist name, city, state, tags, description, and an option if they want their list private.
![Add Playlist]()

&ensp; Add Spot Form
When user clicks one of their playlists in their dashbard or under `Browse all lists`, user will be linked to route `list/:id`. The `New Spot` button will only appear to that user. When this button is clicked, it will bring user to route `/newSpot`. In the form for adding a spot, user is required to fill in information such as Spot name, address, city, and state.
![Add Spot]()

&ensp; Update Playlist Form
The page route is `updateSpot/:id`. In this form the user can update their playlist.
![Update Playlist]()

&ensp; Update Spot Form
The page route is `updateList/:id`. In this form the user can update their spots.
![Update Spot]()


Copyright © 2020