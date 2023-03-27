import { usePlacesWidget } from "react-google-autocomplete";
import { useState } from "react";

const GOOGLE_PLACE_KEY = "";

export default function App() {
  const [localVal, setLocalVal] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_PLACE_KEY,
    onPlaceSelected: (place) => {
      const country = place.address_components.find((component) =>
        component.types.includes("country")
      );
      const city = place.address_components.find((component) =>
        component.types.includes("locality")
      );
      const state = place.address_components.find((component) =>
        component.types.includes("administrative_area_level_1")
      );

      setCity(city.long_name);
      setState(state.long_name);
      setCountry(country.long_name);
      setLocalVal(place.formatted_address);
    }
  });

  return (
    <div className="App">
      <h1>React Google Place Autocomplete</h1>
      <h2>with extraction for country, state, city or locality</h2>
      <input
        ref={ref}
        type="text"
        value={localVal}
        autoComplete="off"
        onChange={(e) => setLocalVal(e.currentTarget.value)}
      />
      <br />
      <div>country : {country}</div>
      <div>city : {city}</div>
      <div>state : {state}</div>
    </div>
  );
}
