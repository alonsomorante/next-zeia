
export const INDICATOR_CONVERTED = {
  CO2: 'CO2',
  HCHO: 'HCHO',
  PM10: 'PM10',
  PM2_5: 'PM2.5',
  HUMIDITY: 'Humedad',
  TEMPERATURE: 'Temperatura',
  TVOC: 'ica'
 }


export const INDICATOR_UNIT_RAW = {
  CO2: 'PPM',
  HCHO: 'MG_M3',
  PM10: 'UG_M3',
  PM2_5: 'UG_M3',
  HUMIDITY: 'PERCENT',
  TEMPERATURE: 'CELSIUS',
  TVOC: 'ICA',
  PPB: 'PPB'
}

export const UNIT_CONVERTED = {
  PPM: 'ppm' ,
  MG_M3: 'mg/m³' ,
  UG_M3: 'µg/m³',
  PERCENT: '%',
  CELSIUS: '°C',
  ICA: 'ica',
  PPB: 'ppb'
}

export const INDICATOR_UNIT_CONVERTED = {
  CO2: 'ppm',
  HCHO: 'mg/m³',
  PM10: 'µg/m³',
  PM2_5: 'µg/m³',
  HUMIDITY: '%',
  TEMPERATURE: '°C',
}

export type Indicator = keyof typeof INDICATOR_UNIT_RAW;
export type Unit = keyof typeof UNIT_CONVERTED