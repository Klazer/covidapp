import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setFetchedCountries]); //Fetching countries and putting them into an array

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">WorldWide</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option> //Gives us the options to choose countries and also makes us not have to write 'options' multiple times. Loops over it instead
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
