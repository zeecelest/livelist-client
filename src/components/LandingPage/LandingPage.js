import React from 'react';


class LandingPage extends React.Component {
    render() {
        return (
            <>
            <nav role='navigation'>
                <ul className='nav-link'>
                    <li><a href='/login' className='nav-login'>Login</a></li>
                    <li><a href='/signup' className='nav-signup'>Sign Up</a></li>
                </ul>
            </nav>
            <div className='title'>
                <h1>Social Playlist</h1>
            </div>
           <section>
               <p>Social Playlist makes it easy for you to find the perfect outing. 
                   Whether a nite on the town with friends, date night with your love,
                   or a day with the family!  Social Playlist solves the problem of not 
                   knowing what to do with providing customized playlists created for users 
                   by users.
               </p>
               <p>See what social events people enjoy in their areas.  You can like other
                   users playlist.  You can also follow the user with your favorite playlists.
                   Develop your own playlist and share with your follows.  
               </p>
               <p>placeholder for playlist example</p>
           </section>
            </>
        )
    }
}

export default LandingPage;