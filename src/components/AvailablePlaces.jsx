import { useEffect, useState } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    // * Note: resolving data using async/await
    async function fetchData() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();
        // * Note : getCurrentPosition function will run in background and call the success callback once its done.
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })
      } catch (error) {
        setError({ message: error.message || "Couldn't fetch places, please try again later." });
        setIsFetching(false);
      }
    }
    fetchData();
  
      // * Note: using promise.then to resolve the response data
      // .then((response) => {
      //   return response.json();
      // })
      // .then((resData) => {
      //   console.log(resData);
      //   setAvailablePlaces(resData.places);
      // });
  }, []);

  if (error) {
    return (<Error title="An error occurred!" message={error.message} />)
  }
  
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
