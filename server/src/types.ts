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

export interface SubscriptionRequest {
  description?: string;
  subject: {
    entities: {
      id: string;
      type: string;
    }[];

    conditions?: {
      attrs: string[];
    };
  };
  notification: {
    httpCustom: {
      url: string;
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    };
    attrs: string[];
    attrsFormat: 'simplifiedKeyValues';
  };
  throttling?: number;
}

/**
 * Subscription interface
 * @param {string} id Subscription ID
 * @param {string} description Subscription description
 * @param {string} status Machine status
 * @param {object} subject Subject object
 * @param {Array<object>} subject.entities Subject entities
 * @param {string} subject.entities.id Machine ID
 * @param {string} subject.entities.type Entity type
 * @param {object} subject.condition Subject condition
 * @param {Array<string>} subject.condition.attrs Condition attribute (mostly empty)
 * @param {boolean} subject.condition.notifyOnMetadataChange Notification only on attribute change
 * @param {object} notification Notification object
 * @param {Array<string>} notification.attrs Attribute to notify
 * @param {boolean} notification.onlyChangedAttrs Notify only changed attributes
 * @param {string} notification.attrsFormat Notification format
 * @param {object} notification.httpCustom Notification path options
 * @param {string} notification.httpCustom.url URL to notify
 * @param {string} notification.httpCustom.method Method to notify
 * @param {boolean} notification.covered I don't know this one
 * @param {number} throttling Notification period in seconds
 *
 */
export interface SubscriptionResponse {
  // Subscription ID
  id: string;
  // Subscription description
  description: string;
  // Machine status
  status: string;
  subject: {
    entities: [
      {
        // Machine ID
        id: string;
        // Entity type
        type: string;
      },
    ];
    condition: {
      // Condition attribute (mostly empty)
      attrs: Array<string>;
      // Notification only on attribute change
      notifyOnMetadataChange: boolean;
    };
  };
  notification: {
    // Attribute to notify
    attrs: Array<string>;
    // Notify only changed attributes
    onlyChangedAttrs: boolean;
    // Notification format
    attrsFormat: 'simplifiedKeyValues';
    // Notification path options
    httpCustom: {
      // URL to notify
      url: string;
      // Method to notify
      method: 'POST';
    };
    // I don't know this one
    covered: boolean;
  };
  // Notification period in seconds
  throttling: number;
}

//
// Destination
//
export interface DestinationBody {
  Stationid: string; // Station ID given by the destination
  Readtime: string; // ISO Standart without ms (2019-12-19T10:00:00)
  SoftwareVersion: string; // Software version (not important)
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
