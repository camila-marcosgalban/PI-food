import React from 'react';
//css
import './Pagination.css'

export default function Pagination({ recipesByPage, allRecipes, pagination }) {
    const pageNum = []

    for (let i = 0; i < Math.ceil(allRecipes / recipesByPage); i++) {
        pageNum.push(i + 1)
    }

    return (
        <div className='paginationContainer'>
            <ul>
                {pageNum?.map(num => {
                    return (
                        <li key={num} className='numContainer'>
                            <a className={num} onClick={() => pagination(num)}> {num} </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}