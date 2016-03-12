var React = require('react'),
    Conditions = require('./Conditions'),
    Hourly = require('./Hourly'),
    WeatherApi = require('../apiUtils/WeatherApi'),
    WeatherStore = require('../stores/weather'),
    ToggleLocation = require('./ToggleLocation'),
    Autocomplete = require('./Autocomplete'),
    QueryUtil = require('../apiUtils/QueryUtil');

module.exports = React.createClass({
  getInitialState: function () {
    return { weather: WeatherStore.get() };
  },
  componentDidMount: function () {
    this.listener = WeatherStore.addListener(this.updateState);
    var apiQuery = QueryUtil.parseLocation(this.props.location);
    WeatherApi.fetchWeather(apiQuery);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    var apiQuery = QueryUtil.parseLocation(newProps.location);
    WeatherApi.fetchWeather(apiQuery);
  },
  updateState: function () {
    this.setState({ weather: WeatherStore.get() });
  },
  render: function () {
    var weather = this.state.weather;
    if (weather.response) {
      var city = weather.location.city;
      var province = weather.location.state ? weather.location.state : weather.location.country;
      var lastUpdate = weather.current_observation.observation_time
      return (
        <section className='weather left'>
          <div className='row group'>
            <div className='location-info left'>
              <h2 className='location-name dark-gray'>{city + ", " + province}</h2>
              <h4 className='location-time dark-gray'>{lastUpdate}</h4>
            </div>
            <Autocomplete changeLocation={this.props.changeLocation}/>
            <ToggleLocation location={weather.location} />
          </div>
          <Conditions weather={weather} />
          <Hourly weather={weather} />
        </section>
      );
    } else {
      return <div></div>
    }
  }

});