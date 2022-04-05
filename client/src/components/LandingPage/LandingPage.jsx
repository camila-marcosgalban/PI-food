import React from 'react';
import { Link } from 'react-router-dom';
//css
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div id='landing'>
            <div>
                <h1>time to <br /> <span>GLOW</span></h1>

            </div>
            {/* <div>
                <h2>You are one step away from a healthier life!</h2>
            </div> */}
            <div>
                <Link to='/home'>
                    <button>Let's begin</button>
                </Link>
            </div>
        </div>
    )
}