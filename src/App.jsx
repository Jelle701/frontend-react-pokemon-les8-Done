import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const limit = 20;
    const controllerRef = useRef();

    useEffect(() => {
        if (controllerRef.current) controllerRef.current.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        async function fetchPokemon() {
            try {
                setLoading(true);
                setError(null);

                const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
                    params: { limit, offset },
                    signal: controller.signal,
                });

                const details = await Promise.all(
                    data.results.map(pokemon => axios.get(pokemon.url).then(res => res.data))
                );

                setPokemonList(details);
            } catch (err) {
                if (!axios.isCancel(err)) setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
        return () => controller.abort();
    }, [offset]);

    const handlePrevious = () => setOffset(prev => Math.max(prev - limit, 0));
    const handleNext = () => setOffset(prev => prev + limit);

    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <p>Er is iets misgegaan: {error}</p>
                <button onClick={() => setOffset(prev => prev)}>Probeer opnieuw</button>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="pagination">
                <button onClick={handlePrevious} disabled={offset === 0}>Vorige</button>
                <span>Pokemon nummers: {offset} - {offset + limit}</span>
                <button onClick={handleNext}>Volgende</button>
            </div>

            <div className="pokemon-container">
                {pokemonList.map(poke => (
                    <PokemonCard
                        key={poke.id}
                        name={poke.name}
                        image={poke.sprites.front_default}
                        moves={poke.moves.length}
                        weight={poke.weight}
                        abilities={poke.abilities.map(a => a.ability.name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;