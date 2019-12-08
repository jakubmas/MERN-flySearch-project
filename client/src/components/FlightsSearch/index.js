import React from "react";
import axios from "axios";
import {connect} from "react-redux";
//components
import PlaceSearchAutocomplete from "./PlaceSearchAutocomplete";
import CalendarDate from "./CalendarDate";
import SearchResults from "./SearchResults";
//redux
import {setSessionKey} from "../../redux/actions/searchFlyQuerries";
//loader
import Loader from "../../layout/ajax-loader.gif";

class SearchBox extends React.Component {
  state = {
    travelResults: {travelData: {Itineraries: [], Agents: []}},
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const {sessionKey} = this.props;

    if (sessionKey !== prevProps.sessionKey) {
      this.getDataResults(sessionKey);
    }

    if (this.state.travelResults !== prevState.travelResults) {
      this.renderResults();
    }
  }

  getDataResults = async sessionKey => {
    try {
      const res = await axios.get(`/api/flight/key/${sessionKey}`);
      this.setState({loading: true});
      if (!res.data.travelData && res.data.msg.ValidationErrors) {
        setTimeout(() => this.getDataResults(sessionKey), 5000);
      }
      if (res.data.travelData.Status === "UpdatesPending" && !res.data.msg) {
        setTimeout(() => this.getDataResults(sessionKey), 1000);
      } else {
        this.setState({loading: false});
        await this.setState({travelResults: res.data});
      }
    } catch (error) {
      console.error(error);
    }
  };

  searchFlightsPostAxiosHandler = async () => {
    const {setSessionKey} = this.props;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const {departure, arrival, departureDate, arrivalDate} = this.props;
    const body = JSON.stringify({
      departure,
      arrival,
      departureDate,
      arrivalDate,
    });
    const res = await axios.post(
      `/api/flight/postflight/${departure}/${arrival}/${departureDate}/${arrivalDate}`,
      body,
      config,
    );
    if (res.data.msg === "error") {
      console.log("ERRROR", res.data);
      // this.searchFlightsPostAxiosHandler();
    } else {
      const key = res.data.key;
      setSessionKey(key);
    }
  };

  renderResults = () => {
    try {
      const {travelResults} = this.state;
      return <SearchResults results={travelResults} />;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {travelResults, loading} = this.state;
    const {Itineraries, Agents} = travelResults.travelData;
    return (
      <div
        className="search-box--container"
        // style={{display: "flex", flexDirection: "column"}}
      >
        <div className="search-box--form">
          {/*section--register*/}

          <PlaceSearchAutocomplete
            placeholderName="Departure"
            destination="departure"
          />

          <PlaceSearchAutocomplete
            placeholderName="Arrival"
            destination="arrival"
          />

          <CalendarDate dateLabel="From" type="from" />

          <CalendarDate dateLabel="To" type="to" />

          <div className="search-box--button-container">
            <button
              onClick={this.searchFlightsPostAxiosHandler}
              className="button__flight-result"
            >
              SEARCH FLIGHTS
            </button>
          </div>
        </div>
        {/* {console.log("travelResults", travelResults)} */}
        <div
          className={`search-box--results__${loading ? "loading" : ""}`}
          style={{flexDirection: "row"}}
        >
          <img
            src={Loader}
            className={`search-box--loading__${loading ? "show" : "hide"}`}
            alt="loader"
          />
          {Itineraries.length > 0 && this.renderResults()}
          {Agents.length > 0 && Itineraries.length === 0 ? (
            <h1>Seems that there are no filghts available</h1>
          ) : Itineraries.length > 0 ? null : (
            <h1>Where're you going?</h1>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    departure: state.searchFlyQuerries.departure,
    arrival: state.searchFlyQuerries.arrival,
    departureDate: state.searchFlyQuerries.departureDate,
    arrivalDate: state.searchFlyQuerries.arrivalDate,
    sessionKey: state.searchFlyQuerries.sessionKey,
  };
}
const mapDispatchToProps = {
  setSessionKey,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
