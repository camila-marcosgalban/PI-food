import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//action
import { getRecipesByName } from '../../redux/actions'
//css
import './SearchBar.css'
//image
import search from '../../media/search.png'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSearch(e) {
        e.preventDefault()
        dispatch(getRecipesByName(name))
        document.getElementById('searchBarInput').value = ''
    }

    return (
        <div id="searchbar">
            <input id="searchBarInput" type="text" placeholder="Search recipes here..." onChange={(e) => handleInput(e)} />
            <button type="submit" onClick={(e) => handleSearch(e)}>
                <img src={search} alt="search" />
            </button>
        </div>
    )
}