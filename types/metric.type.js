const MetricType = Object.freeze({
  Distance: "Distance",
  Temperature: "Temperature"
});

const DistanceUnit = Object.freeze({
  Meter: "Meter",
  Centimeter: "Centimeter",
  Inch: "Inch",
  Feet: "Feet",
  Yard: "Yard"
});

const TemperatureUnit = Object.freeze({
  Celsius: "Celsius",
  Fahrenheit: "Fahrenheit",
  Kelvin: "Kelvin"
});


module.exports = {
  MetricType,
  DistanceUnit,
  TemperatureUnit,
}
