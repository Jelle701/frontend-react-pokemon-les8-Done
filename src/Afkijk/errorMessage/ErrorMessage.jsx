import './ErrorMessage.css';
import {useEffect} from 'react';

function ErrorMessage({ message }) {
	useEffect(() => {
		// je zou hier dingen kunnen doen op mount, zoals het ophalen van informatie van de backend

		// Een functie returnen uit een use effect === UNMOUNT effect
		// Dit kun je dus aan iedere useEffect toevoegen
		return function cleanup() {
			// Dit wordt getriggerd VLAK VOOR de UNMOUNT cyclus
			console.log('We gaan eraaaaaaaan 😭');
			// hier kunnen we ons uitstaande request dan snel annuleren met een abort-controller
		}
	}, []);

	return (
		<p className="error-message">{message}</p>
	);
}

export default ErrorMessage;