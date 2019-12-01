import React from "react";
import ReactDOM from "react-dom";
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
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        showCalendarDeparture: false,
      });
    }
  };

  onChange = date => {
    const {type, setDepartureDate, setArrivalDate} = this.props;
    const dateTime = moment(date).toObject();

    const validation = value => {};

    const day = dateTime.date.toString();
    const month = (dateTime.months + 1).toString();
    const dateFormated = `${dateTime.years}-${
      month.length <= 1 ? "0" + month : month
    }-${day.length <= 1 ? "0" + day : day}`;

    console.log("dateFormated", dateFormated);
    this.setState({date: dateFormated});
    console.log("state", this.state);
    switch (type) {
      case "from":
        return setDepartureDate(dateFormated);
      case "to":
        return setArrivalDate(dateFormated);
      default:
        return null;
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
        <div style={{position: "absolute"}}>
          {showCalendarDeparture ? <Calendar onChange={this.onChange} /> : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setDepartureDate,
  setArrivalDate,
};

export default connect(null, mapDispatchToProps)(CalendarDate);
