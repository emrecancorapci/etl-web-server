//
// Source
//
export interface Notification {
  id: string;
  type: string;
  relativeHumidity: number;
  NO2: number;
  PM10: number;
  PM2P5: number;
  pressure: number;
  CO: number;
  SO2: number;
  temperature: number;
  O3: number;
  PM1: number;
}

/**
 * Represents the response object returned by the source token API.
 */
export interface SourceTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

/**
 * Represents a request for a source token.
 */
export interface SourceTokenRequest {
  grant_type: 'client_credentials' | 'refresh_token';
  client_id?: string;
  client_secret?: string;
  refresh_token?: string;
}

export interface SourceErrorResponse {
  error: string;
  description: string;
}

//
// Destination
//
export interface DestinationBody {
  Stationid: string;
  Readtime: string; // 2019-12-19T10:00:00
  SoftwareVersion: string; // Cabin?? software version
  Period: number; // Measurement period in minutes
  PM10: number;
  PM10_Status: number;
  PM25: number;
  PM25_Status: number;
  SO2: number;
  SO2_Status: number;
  CO: number;
  CO_Status: number;
  NO2: number;
  NO2_Status: number;
  O3: number;
  O3_Status: number;
  PM1: number;
  PM1_Status: number;
  HavaBasinci: number;
  HavaBasinci_Status: number;
  BagilNem: number;
  BagilNem_Status: number;
  Sicaklik: number;
  Sicaklik_Status: number;
}

export interface DestinationTokenResponse {
  result: boolean;
  message: string;
  objects: {
    TicketId: string;
    DeviceId: string;
  };
}

export interface DestinationTokenRequest {
  username: string;
  password: string;
}


//
// Application
//

export interface RequestParams {
  [key: string]: string;
}