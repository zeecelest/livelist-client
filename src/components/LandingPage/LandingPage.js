import React, { Component } from "react";
import './LandingPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';

class LandingPage extends Component {
    render() {
        return (
            <>
            <nav role='navigation'>
                <ul className='nav-link'>
                    <li><a href='/login' className='nav-login'>Log in</a></li> 
                    <li><a href='/register' className='nav-signup'>Sign up</a></li>
                </ul>
            </nav>
            <div className='title'>
                <h1>Social Playlist</h1>
            </div>
           <section>
               <p>Social Playlist solves the problem of not knowing what to do when you want 
                   to go out.  Whether a nite on the town with friends, date night with your love,
                   or a day with the family!   See what social events people enjoy in their areas.  
                   Follow users with your favorite playlists.  Like items from users playlist. 
                   Create your own playlist and share with your followers.  
               </p>
              <p>placeholder for screenshots of app</p>
            
            <LoginForm />
              
           </section>
          
            </>
            )
        }
    
    }

export default LandingPage;