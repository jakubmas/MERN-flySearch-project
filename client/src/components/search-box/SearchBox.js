import React from "react";
import axios from "axios";
import {connect} from "react-redux";
//components
import PlaceSearchAutocomplete from "./components/PlaceSearchAutocomplete";
import CalendarDate from "./components/CalendarDate";
import SearchResults from "./components/SearchResults";
//redux
import {setSessionKey} from "../../redux/actions/searchFlyQuerries";
//loader
import Loader from "../layout/ajax-loader.gif";

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
      <div>
        <div style={{display: "flex"}}>
          <div>
            <PlaceSearchAutocomplete
              placeholderName="Departure"
              type="departure"
            />
          </div>
          <div>
            <PlaceSearchAutocomplete placeholderName="Arrival" type="arrival" />
          </div>
          <div>
            <CalendarDate dateLabel="From" type="from" />
          </div>
          <div>
            <CalendarDate dateLabel="To" type="to" />
          </div>
          <img
            src={Loader}
            className={`search-loading ${loading ? "show" : "hide"}`}
            alt="loader"
          />
        </div>
        <button onClick={this.searchFlightsPostAxiosHandler}>
          SEARCH FLIGHTS
        </button>
        {console.log("travelResults", travelResults)}
        {Itineraries.length > 0 && this.renderResults()}
        {Agents.length > 0 && Itineraries.length === 0 ? (
          <h1>Seems that there are no filghts available</h1>
        ) : Itineraries.length > 0 ? null : (
          <h1>Where're you going?</h1>
        )}
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
