const { DistanceUnit, TemperatureUnit } = require('../types/metric.type');

const convertUnit = (value, fromUnit, toUnit) => {
  const conversions = {
    // Distance conversions
    [`${DistanceUnit.Meter}-${DistanceUnit.Centimeter}`]: 100,
    [`${DistanceUnit.Centimeter}-${DistanceUnit.Meter}`]: 0.01,
    [`${DistanceUnit.Meter}-${DistanceUnit.Inch}`]: 39.3701,
    [`${DistanceUnit.Inch}-${DistanceUnit.Meter}`]: 0.0254,
    [`${DistanceUnit.Meter}-${DistanceUnit.Feet}`]: 3.28084,
    [`${DistanceUnit.Feet}-${DistanceUnit.Meter}`]: 0.3048,
    [`${DistanceUnit.Meter}-${DistanceUnit.Yard}`]: 1.09361,
    [`${DistanceUnit.Yard}-${DistanceUnit.Meter}`]: 0.9144,
    [`${DistanceUnit.Centimeter}-${DistanceUnit.Inch}`]: 0.393701,
    [`${DistanceUnit.Inch}-${DistanceUnit.Centimeter}`]: 2.54,
    [`${DistanceUnit.Centimeter}-${DistanceUnit.Feet}`]: 0.0328084,
    [`${DistanceUnit.Feet}-${DistanceUnit.Centimeter}`]: 30.48,
    [`${DistanceUnit.Centimeter}-${DistanceUnit.Yard}`]: 0.0109361,
    [`${DistanceUnit.Yard}-${DistanceUnit.Centimeter}`]: 91.44,
    [`${DistanceUnit.Inch}-${DistanceUnit.Feet}`]: 0.0833333,
    [`${DistanceUnit.Feet}-${DistanceUnit.Inch}`]: 12,
    [`${DistanceUnit.Inch}-${DistanceUnit.Yard}`]: 0.0277778,
    [`${DistanceUnit.Yard}-${DistanceUnit.Inch}`]: 36,
    [`${DistanceUnit.Feet}-${DistanceUnit.Yard}`]: 0.333333,
    [`${DistanceUnit.Yard}-${DistanceUnit.Feet}`]: 3,

    // Temperature conversions
    [`${TemperatureUnit.Celsius}-${TemperatureUnit.Fahrenheit}`]: (value) => (value * 9) / 5 + 32,
    [`${TemperatureUnit.Fahrenheit}-${TemperatureUnit.Celsius}`]: (value) => ((value - 32) * 5) / 9,
    [`${TemperatureUnit.Celsius}-${TemperatureUnit.Kelvin}`]: (value) => value + 273.15,
    [`${TemperatureUnit.Kelvin}-${TemperatureUnit.Celsius}`]: (value) => value - 273.15,
    [`${TemperatureUnit.Fahrenheit}-${TemperatureUnit.Kelvin}`]: (value) => ((value - 32) * 5) / 9 + 273.15,
    [`${TemperatureUnit.Kelvin}-${TemperatureUnit.Fahrenheit}`]: (value) => ((value - 273.15) * 9) / 5 + 32,
  };

  const key = `${fromUnit}-${toUnit}`;
  let convertedValue;

  if (typeof conversions[key] === 'function') {
    convertedValue = conversions[key](value);
  } else {
    convertedValue = value * (conversions[key] || 1);
  }

  return parseFloat(convertedValue.toFixed(2));
};

module.exports = {
  convertUnit
};
