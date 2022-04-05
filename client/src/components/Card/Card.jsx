import React from 'react';
import { Link } from 'react-router-dom';
//css
import './Card.css'

export default function Card({ id, name, image, dietType, dishTypes, score }) {
    return (
        <div className='cardContainer'>
            <div>
                <img src={image} alt="image not found" />
                <p>{name}</p>
                {/* <p>Score: {score}</p> */}
            </div>
            <div className="info">
                <div>
                    <h3>Diet Type</h3>
                    {dietType.map(d => {
                        return (
                            <div>
                                <p>{d}</p>
                            </div>

                        )
                    })}
                    <h3>Dish Type</h3>
                    {Array.isArray(dishTypes) ?

                        dishTypes?.map(d => {
                            return (
                                <div>
                                    <p>{d}</p>
                                </div>
                            )
                        })
                        : <div><p>{dishTypes}</p></div>}
                </div>
                <div className='moreBtn'>
                    <Link to={'/home/' + id}>
                        <button>More</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}