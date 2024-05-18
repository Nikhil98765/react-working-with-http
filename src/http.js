export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");

    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }
    const resData = await response.json();
    
    return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-placess", {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error("Failed to update user places");
  }
  const resData = await response.json();
  return resData.message;
}