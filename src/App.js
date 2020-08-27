import React from "react";

import { Cards, Chart, CountryPicker, Navigationbar } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api"; //No need to specify index for index files
import coronaImage from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    //Makes a request to the fetchdata
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    //This styles method stops interference from other css files across the system
    return (
      <div>
        <Navigationbar />
        <div className={styles.container}>
          <img className={styles.image} src={coronaImage} alt="COVID-19" />
          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
      </div>
    );
  }
}

export default App;
