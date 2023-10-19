import { Part } from '../weather/enums';

enum Keys {
  sunrise = 'sunrise',
  sunset = 'sunset',
  temp = 'temp',
  feels_like = 'feels_like',
  pressure = 'pressure',
  humidity = 'humidity',
  uvi = 'uvi',
  wind_speed = 'wind_speed',
}

export async function convertResponse(data) {
  const { current, daily, hourly, minutely } = data;
  const response = {};

  if (current ?? null) {
    response[Part.current] = getDataByKeys(current);
  }
  if (daily ?? null) {
    response[Part.daily] = daily?.map((day) => getDataByKeys(day));
  }
  if (hourly ?? null) {
    response[Part.hourly] = hourly?.map((hour) =>
      getDataByKeys(hour, [Keys.sunrise, Keys.sunset]),
    );
  }
  if (minutely ?? null) {
    response[Part.minutely] = minutely?.map((minute) =>
      getDataByKeys(minute, [Keys.sunrise, Keys.sunset]),
    );
  }

  return response;
}

function getDataByKeys(obj, exclude = [], keysArr = Object.values(Keys)) {
  return keysArr.reduce((acc, curr) => {
    if (!exclude.includes(curr)) {
      const value = obj?.[curr] ?? null;
      return {
        ...acc,
        [curr]: value,
      };
    }
    return acc;
  }, {});
}
