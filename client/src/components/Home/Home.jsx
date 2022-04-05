import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
//css
import './Home.css';
//actions
import { getAllRecipes, getAllTypes, orderByAToZ, orderByScore, filterByDietType } from '../../redux/actions'
//components
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import SearchBar from '../SearchBar/SearchBar'
import Loader from '../Loader/Loader';
//image
import up from '../../media/upload.png'

export default function Home() {

    //GET ALL RECIPES

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(getAllTypes())
    }, [dispatch])

    const allRecipes = useSelector((state) => state.recipes)
    const allTypes = useSelector((state) => state.types.map(t => t['name']))

    //PAGINATION
    const recipesByPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const lastRecipe = currentPage * recipesByPage;
    const firstRecipe = lastRecipe - recipesByPage;
    const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe)

    const pagination = (Num) => {
        setCurrentPage(Num)
    }

    //HANDLERS
    const [order, setOrder] = useState('')
    const [order2, setOrder2] = useState('')

    function handleReset(e) {
        e.preventDefault();
        dispatch(getAllRecipes())
        document.getElementById('orderByAToZ').getElementsByTagName('option')['0'].selected = 'selected'
        document.getElementById('orderByScore').getElementsByTagName('option')['0'].selected = 'selected'
        document.getElementById('filterByDiet').getElementsByTagName('option')['0'].selected = 'selected'
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByAToZ(e.target.value))
        setOrder(order2 + e.target.value)
        setCurrentPage(1)
    }

    function handleOrderByScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setOrder2(order + e.target.value)
        setCurrentPage(1)
    }

    function handleFilterByDietType(e) {
        dispatch(filterByDietType(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div id='home'>
            <div id="content">
                <nav>
                    <h1 id='#top'>Time to <br /> <span>GLOW</span></h1>
                    <div id='navItems'>
                        {/* FILTERS */}
                        <div id='filters'>
                            {/* ORDER BY NAME */}
                            <select id="orderByAToZ" onChange={e => handleOrderByName(e)}>
                                <option value="1" disabled selected>--Order By Name--</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>
                            {/* ORDER BY SPOONACULAR SCORE */}
                            <select id="orderByScore" onChange={e => handleOrderByScore(e)}>
                                <option value="1" disabled selected>--Order By Score--</option>
                                <option value="low">low - high</option>
                                <option value="high">high - low</option>
                            </select>
                            {/* FILTER BY TYPE OF DIET */}
                            <select id="filterByDiet" onChange={e => handleFilterByDietType(e)}>
                                <option value="1" disabled selected>--Filter By Diet Type--</option>
                                <option value="all">all</option>
                                {
                                    allTypes?.map(d => {
                                        return (
                                            <option value={d}>{d}</option>
                                        )
                                    })
                                }
                            </select>
                            {/* RESET CARDS */}
                            <button onClick={handleReset}>RESET</button>
                        </div>

                        {/* SEARCH BAR */}
                        <SearchBar />
                        {/* create your own */}
                        <Link to='/recipe'><button id='createBtn'>Create your own recipe here!</button></Link>
                    </div>
                </nav>
                <main>
                    <div>
                        {/* SHOW CARDS */}
                        <div id='cardsContainer'>
                            {
                                allRecipes.length > 0 ?

                                    currentRecipes === 'Not found' ?
                                        <div>
                                            <p>Recipe not found. Try again.</p>
                                        </div>
                                        : currentRecipes?.map(r => {
                                            let dietType = '';
                                            r.diets ? dietType = r.diets : dietType = r.types.map(t => t.name);
                                            return (
                                                <div className="card">
                                                    <Card
                                                        name={r.name}
                                                        image={r.image}
                                                        dietType={dietType}
                                                        dishTypes={r.dishTypes}
                                                        score={r.spoonacularScore}
                                                        id={r.id}
                                                    />
                                                </div>
                                            )
                                        })

                                    : <Loader />
                            }
                        </div>
                        {/* PAGINATION */}
                        <Pagination
                            recipesByPage={recipesByPage}
                            allRecipes={allRecipes.length}
                            pagination={pagination}
                        />
                        {/* back to top */}
                        <button id='move'><a href="#top">
                            <img src={up} alt="go up" />
                        </a></button>
                    </div>
                </main>
            </div>
            <footer>
                <p>&copy; Camila Marcos Galbán 2022</p>
            </footer>
        </div >
    )
}