import React, {Component} from "react";
//components
import PlaceSearchAutocomplete from "./components/PlaceSearchAutocomplete";
import CalendarDate from "./components/CalendarDate";
export default class SearchBox extends Component {
  render() {
    return (
      <div>
        <div style={{display: "flex"}}>
          <div>
            <PlaceSearchAutocomplete placeholderName="Departure" />
          </div>
          <div>
            <PlaceSearchAutocomplete placeholderName="Arrival" />
          </div>
          <div>
            <CalendarDate dateLabel="From" />
          </div>
          <div>
            <CalendarDate dateLabel="To" />
          </div>
        </div>
      </div>
    );
  }
}
