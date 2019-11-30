import React, {Component} from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import moment from "moment";

export default class CalendarDate extends Component {
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
    const dateTime = date;
    const dateFormated = moment(dateTime).toObject();
    const data = `${dateFormated.years}-${dateFormated.months + 1}-${
      dateFormated.date
    }`;
    this.setState({date: data});
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
