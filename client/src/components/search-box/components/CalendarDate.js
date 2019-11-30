import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {
  setDepartureDate,
  setArrivalDate,
} from "../../../redux/actions/searchFlyQuerries";

import Calendar from "react-calendar";
import moment from "moment";

class CalendarDate extends React.Component {
  static propTypes = {
    dateLabel: PropTypes.string.isRequired,
  };

  state = {
    date: "",
    showCalendarDeparture: false,
  };

  componentDidMount() {
    const {date} = this.state;
    const {dateLabel} = this.props;

    const today = new Date();
    const dateToday =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (date === "") {
      this.setState({date: dateToday});
    }
    if (dateLabel === "To") {
      this.setState({date: ""});
    }
  }

  onChange = date => {
    const {type, setDepartureDate, setArrivalDate} = this.props;
    const dateTime = moment(date).toObject();
    const dateFormated = `${dateTime.years}-${dateTime.months + 1}-${
      dateTime.date
    }`;
    this.setState({date: dateFormated});
    console.log("dateFromate", dateFormated, type);
    switch (type) {
      case "from":
        return setDepartureDate(dateFormated);
      case "to":
        return setArrivalDate(dateFormated);
    }
  };

  showCalendarHandler = () => {
    const {showCalendarDeparture} = this.state;
    !showCalendarDeparture
      ? this.setState({showCalendarDeparture: true})
      : this.setState({showCalendarDeparture: false});
  };

  render() {
    const {showCalendarDeparture} = this.state;
    const {dateLabel} = this.props;
    return (
      <div>
        <label>{dateLabel}</label>
        <div onClick={this.showCalendarHandler}>
          <input
            value={this.state.date}
            disabled="disabled"
            style={{cursor: "pointer"}}
          />
        </div>
        {showCalendarDeparture ? <Calendar onChange={this.onChange} /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  setDepartureDate,
  setArrivalDate,
};

export default connect(null, mapDispatchToProps)(CalendarDate);
