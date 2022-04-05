import React from "react";
import { useState, useEffect } from 'react';
import { PostRecipe, getAllTypes, postRecipe } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//css
import './CreateRecipe.css'

function validate(input) {
    let incomplete = {};
    if (input.name === ' ') {
        incomplete.name = 'you must complete the recipe name field!'
    } else if (input.image === ' ') {
        incomplete.image = 'you must complete the recipe image field!'
    } else if (input.summary === ' ') {
        incomplete.summary = 'you must complete the recipe summary field!'
    } else if (input.spoonacularScore === 0 || input.healthScore === 0) {
        incomplete.scores = 'you must complete with a value higher than 0 on the recipe score fields!'
    } else if (input === 'invalid') {
        incomplete.dishTypes = 'special characters are not allowed!'
    }
    return incomplete;
}

export default function CreateRecipe() {
    const dispatch = useDispatch()

    const types = useSelector((state) => state.types)
    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])

    const [input, setInput] = useState({
        name: ' ',
        image: ' ',
        summary: ' ',
        spoonacularScore: 0,
        healthScore: 0,
        instructions: ' ',
        dishTypes: ' ',
        diets: []
    })

    const [incomplete, setIncomplete] = useState({ empty: 'empty' })
    const [complete, setComplete] = useState(false)

    function handleOnChange(e) {
        if (e.target.name === 'dishTypes') {
            let regex = /[.,_-]/g;
            let checkRegex = e.target.value.match(regex)
            if (Array.isArray(checkRegex)) {
                return setIncomplete(validate('invalid'))
            }
            if (e.target.value.length > 15) {
                return e.target.value.substr(0, 15)
            }
        }
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setIncomplete(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleNumbers(e) {
        if (e.target.value < 0) return e.target.value = 0;
        if (e.target.value > 100) return e.target.value = 100;

        setInput({
            ...input,
            [e.target.name]: parseInt(e.target.value)
        })
        setIncomplete(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleTypes(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        } else {
            setInput({
                ...input,
                diets: [...input.diets.filter(d => d !== e.target.value)]
            })
        }
    }

    function handlePost(e) {
        e.preventDefault()
        if (Object.keys(incomplete).length === 0) {
            dispatch(postRecipe(input))
            setComplete(true)
            setInput({
                name: '',
                image: '',
                summary: '',
                spoonacularScore: '',
                healthScore: '',
                instructions: '',
                dishTypes: '',
                diets: []
            })
        } else {
            return incomplete;
        }
    }

    return (
        <div id="creation">
            <form>
                <h2>Create your own recipe!</h2>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={e => handleOnChange(e)} />
                </div>
                {
                    incomplete.name && (
                        <p className="incomplete">{incomplete.name}</p>
                    )
                }
                <div>
                    <label>Image link: </label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={e => handleOnChange(e)} />
                </div>
                {
                    incomplete.image && (
                        <p className="incomplete">{incomplete.image}</p>
                    )
                }
                <div>
                    <label>Summary: </label>
                    <textarea value={input.summary}
                        name="summary"
                        onChange={e => handleOnChange(e)} id="" cols="30" rows="10">
                    </textarea>
                </div>
                {
                    incomplete.summary && (
                        <p className="incomplete">{incomplete.summary}</p>
                    )
                }
                <div>
                    <label>Spoonacular Score: </label>
                    <input
                        type="number"
                        value={input.spoonacularScore}
                        name="spoonacularScore"
                        onChange={e => handleNumbers(e)} />
                </div>
                <div>
                    <label>Health Score: </label>
                    <input
                        type="number"
                        value={input.healthScore}
                        name="healthScore"
                        onChange={e => handleNumbers(e)} />
                </div>
                {
                    incomplete.scores && (
                        <p className="incomplete">{incomplete.scores}</p>
                    )
                }
                <div>
                    <label>Step by step: </label>
                    <textarea value={input.instructions}
                        name="instructions"
                        onChange={e => handleOnChange(e)} id="" cols="30" rows="10">
                    </textarea>
                </div>
                <div>
                    <label>Dish type: </label>
                    <input
                        type="text"
                        value={input.dishTypes}
                        name="dishTypes"
                        onChange={e => handleOnChange(e)} />
                </div>
                {
                    incomplete.dishTypes && (
                        <p className="incomplete">{incomplete.dishTypes}</p>
                    )
                }
                <div className="diets">
                    <label className="diet_types">Diet type: </label>
                    {
                        types?.map((t => {
                            return (
                                <label className="checkboxes">
                                    <input
                                        type="checkbox"
                                        value={t.name}
                                        name={t.name}
                                        className="checkbox"
                                        onChange={handleTypes} /> {t.name}
                                </label>
                            )
                        }))
                    }
                </div>
                {
                    complete ?
                        <div className="complete">
                            Formulario enviado correctamente!
                            <Link to='/home'><button>Go to recipes</button></Link>
                        </div>
                        : <button type="submit" onClick={handlePost}> Create</button>
                }

            </form >
            <div id="move">
                <Link to='/home'>
                    <button>Go back</button>
                </Link>
            </div>
        </div >
    )
}