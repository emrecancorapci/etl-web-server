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
export interface SourceSubscription {
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
