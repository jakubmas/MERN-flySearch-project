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
        </div>
      </div>
    );
  }
}
