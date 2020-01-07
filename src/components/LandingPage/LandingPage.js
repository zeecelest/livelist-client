import React from 'react';

class LoginPage extends React.Component {
    render() {
        return (
            <nav role='navigation'>
                <ul className='nav-link'>
                    <li><a href='login' className='nav-login'>Login</a></li>
                    <li><a href='signup' className='nav-signup'>Sign Up</a></li>
                </ul>
            </nav>
           

        )
    }
}

export default LoginPage;