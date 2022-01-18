import React from "react";
import { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from "../../redux/actions";
//css
import './Detail.css'
//component
import Loader from "../Loader/Loader";

export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])

    const recipeById = useSelector((state) => state.detail)

    return (
        <div id="detailContainer">
            {
                recipeById.length > 0 ?
                    <div>
                        <div className="detail">
                            <div className="front">
                                <img src={recipeById[0].image} alt={recipeById[0].name} />
                                <div className="sideInfo">
                                    <h1>{recipeById[0].name}</h1>
                                    <div id="scores">
                                        <p ><span>Spoonacular Score: </span>{recipeById[0].spoonacularScore}</p>
                                        <p><span>Health Score: </span>{recipeById[0].healthScore}</p>
                                    </div>
                                    <div id="summary" dangerouslySetInnerHTML={{ __html: recipeById[0].summary }}></div>
                                </div>
                            </div>
                            <div className="back">
                                <div className={!recipeById[0].instructions || recipeById[0].instructions === ' ' ? 'hide' : 'show'}>
                                    <h3>Step by step:</h3>
                                    {
                                        Array.isArray(recipeById[0].instructions) ?
                                            recipeById[0].instructions.map(i =>
                                                <p>{i}</p>)
                                            : <p>{recipeById[0].instructions}</p>
                                    }
                                </div>
                                <div className={recipeById[0].dishTypes === ' ' ? 'hide' : 'show'}>
                                    <h3>Dish Types: </h3>
                                    <div className="types">
                                        {
                                            Array.isArray(recipeById[0].dishTypes) ?
                                                recipeById[0].dishTypes.map(d =>
                                                    <p>{d}</p>)
                                                : <p>{recipeById[0].dishTypes}</p>
                                        }
                                    </div>
                                </div>
                                <div className={
                                    recipeById[0].diets ?
                                        recipeById[0].diets.length === 0 ? 'hide' : 'show'
                                        : recipeById[0].types.length === 0 ? 'hide' : 'show'}>
                                    <h3>Diet Types: </h3>
                                    <div className="types">
                                        {
                                            recipeById[0].diets ?
                                                recipeById[0].diets.map(d =>
                                                    <p>{d}</p>)
                                                : recipeById[0].types.map(t => <p>{t.name}</p>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    : <Loader />
            }
            <div id="move">
                <Link to='/home'>
                    <button>Go back</button>
                </Link>
            </div>


        </div>
    )

}