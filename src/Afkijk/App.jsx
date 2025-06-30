import {useEffect, useState} from 'react';
import ErrorMessage from './components/errorMessage/ErrorMessage.jsx';
import './App.css';

function App() {
	const [count, setCount] = useState(0); // deze wordt tijdens initialisatie al klaargezet
	const [value, setValue] = useState('');

	useEffect(() => {
		// LET OP: hier doe je bijvoorbeeld een get request in async function met try/catch en state
		console.log("👖 Alle kledingstukken zijn opgehaald en in de state gezet!");

	}, []); // <---- [] geeft aan dat het een MOUNT effect is

	useEffect(() => {
		console.log('💗 De state-variabele "value" is zojuist veranderd!');

		// Wil je alleen iets doen als die state-waarde een specifieke waarde bereikt?
		if (value === "banaan") {
			console.log('🍌 BANAAN ALERT 🍌');
			// hier kun je dan bepalen om bijvoorbeeld de volgende set aan kledingstukken op te halen
		}
	}, [value]); // <--- [value] geeft aan dat het een UPDATE effect is

	// alles wat hier staat wordt als eerste uitgevoerd op MOUNT!
	console.log('function App() wordt uitgevoerd');

	return (
		<>
			<button type="button" onClick={() => setCount(count + 1)}>Teller is {count}</button>

			{console.log('Alle HTML elementen in de return worden gerenderd!')}

			{/*Check hier altijd of je data er al is voordat je het weergeeft, */}
			{/*want het mounting effect zal pas NA de eerste render worden aangeroepen*/}

			<input
				type="text"
				name="username"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{value.length < 3 && <ErrorMessage message="Er moeten minimaal 3 karakters ingevoerd worden" />}
		</>)
}

export default App;
