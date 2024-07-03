import React from 'react'
import '../styles.css'

export default function Header() {
    return(
        <div className='header'>
            <img src='./images/Banner-Weather.jpg' alt='Weather Banner' className='imgBan' />
            <h1 className='headerTitle'>Hamy Weather Channel</h1>
        </div>
    );
}