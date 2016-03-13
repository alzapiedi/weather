// Builds a query string out of a location object that can be understood by API.

module.exports = {
  parseLocation: function (location) {
    if (!location.name) { debugger; }
    var cityState = location.name.split(",");
    var city = cityState[0].trim();
    var state = cityState[1].trim();
    return state + "/" + city + ".json";
  }
}
