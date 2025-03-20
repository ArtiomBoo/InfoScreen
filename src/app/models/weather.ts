import {timeSeries} from "./weatherTimeseries";

export interface IWeather {
  type: string
  geometry: {
    type: string
    coordinates: number[]
  }
  properties: {
    meta: {
      updated_at: string
      units:{
        air_pressure_at_sea_level: string
        air_temperature: string
        cloud_area_fraction: string
        precipitation_amount: string
        relative_humidity: string
        wind_from_direction: string
        wind_speed: string
      }
    }
    timeseries: timeSeries[]
  }
}
