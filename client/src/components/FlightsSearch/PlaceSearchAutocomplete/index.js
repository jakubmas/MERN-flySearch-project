import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  setDeparture,
  setArrival,
} from "../../../redux/actions/searchFlyQuerries";

import axios from "axios";
import uuid from "uuid";
import Loader from "../../../layout/ajax-loader.gif";

class PlaceSearchAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: -1,
      query: "",
      results: [],
      loading: false,
      message: "",
    };
    this.cancel = "";
  }

  static propTypes = {
    placeholderName: PropTypes.string.isRequired,
  };

  //when you click outside of component suggestions are closed can use for this also library react-onclickoutside

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        cursor: -1,
        results: [],
        loading: false,
        message: "",
      });
    }
  };

  // fetch data from API
  fetchSearchResult = async query => {
    const searchUrl = `/api/flight/${query}`;

    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    await axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then(res => {
        const resultNotFoundMessage = !res.data.resultBody.length
          ? "There are no more search results"
          : "";
        this.setState({
          results: res.data.resultBody,
          message: resultNotFoundMessage,
          loading: false,
        });
      })
      .catch(err => {
        if (axios.isCancel(err) || err) {
          this.setState({
            loading: false,
            message: "failed to fetch data",
          });
        }
      });
  };

  handleOnInputChange = event => {
    const query = event.target.value;
    if (!query) {
      this.setState({query, results: [], message: ""});
    } else {
      this.setState({query, loading: true, message: ""}, () => {
        this.fetchSearchResult(query);
      });
    }
  };

  reduxHandler = (destination, placeId) => {
    const {setDeparture, setArrival} = this.props;
    switch (destination) {
      case "departure":
        return setDeparture(placeId);
      case "arrival":
        return setArrival(placeId);
      default:
        return null;
    }
  };

  renderSugestions = () => {
    const {results, cursor} = this.state;
    const {destination} = this.props;
    if (results.length === 0) {
      return null;
    }
    return (
      <ul className="autocomplete--list">
        {results.map(item => (
          <li
            className={`autocomplete--list__item--${
              cursor === results.indexOf(item) ? "active" : "inactive"
            }`}
            key={uuid.v4()}
            value={item.CountryName}
            onMouseEnter={() => {
              this.setState({
                cursor: results.indexOf(item),
              });
            }}
            onMouseLeave={() =>
              this.setState({
                cursor: results.indexOf(item),
              })
            }
            onClick={() => {
              this.setState({
                query: item.PlaceName,
                results: [],
                loading: false,
              });
              this.reduxHandler(destination, item.PlaceId);
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "5px",
              }}
            >
              <p className="place-name-list">
                {item.PlaceName} ({item.PlaceId.split("-")[0]})
              </p>
              <p className="country-name-list">{item.CountryName}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  handleKeyDown(e) {
    const {cursor, results} = this.state;
    const {destination} = this.props;
    const {keyCode} = e;
    // arrow up/down button should select next/previous list element
    if (keyCode === 38) {
      if (cursor === 0) {
        this.setState({cursor: -1});
      } else if (cursor > 0) {
        this.setState(prevState => ({
          cursor: prevState.cursor - 1,
        }));
      }
    } else if (keyCode === 40) {
      if (cursor < results.length - 1) {
        this.setState(prevState => ({
          cursor: prevState.cursor + 1,
        }));
      } else if (cursor === -1) {
        this.setState({cursor: 0});
      }
    } else if (keyCode === 13) {
      const resultsCopy = results;
      if (cursor === -1) {
        return;
      }
      this.setState({
        query: resultsCopy[cursor].PlaceName,
        results: [],
        cursor: -1,
        loading: false,
        message: "",
      });
      this.reduxHandler(destination, resultsCopy[cursor].PlaceId);
    }
  }

  render() {
    const {query, loading, message} = this.state;
    const {placeholderName, destination} = this.props;
    return (
      <div className="container" style={{width: "300px"}}>
        <div className="autoCompleteText">
          {/* loader */}
          <img
            src={Loader}
            className={`search-loading ${loading ? "show" : "hide"}`}
            alt="loader"
          />
          <div className="form__group">
            <input
              type="text"
              name={destination}
              className="form__input"
              placeholder={placeholderName}
              id={destination}
              value={query}
              onChange={this.handleOnInputChange}
              autoComplete="off"
              onKeyDown={e => this.handleKeyDown(e)}
            />
            <label htmlFor="" className="form__label">
              {placeholderName}
            </label>
          </div>

          <div className="autocomplete--results">{this.renderSugestions()}</div>
        </div>
        {/* Error message */}
        <p className={`message${message ? "--visible" : "--hidden"}`}>
          {message}
        </p>
      </div>
    );
  }
}
const mapDispatchToProps = {
  setDeparture,
  setArrival,
};

export default connect(null, mapDispatchToProps)(PlaceSearchAutocomplete);
