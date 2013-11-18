// Create  collection for storing errors
ApplicationErrors = new Meteor.Collection("applicationerrors");

// use unsupported, undocumented method for making the collection capped
if (Meteor.isServer) 
  ApplicationErrors._createCappedCollection(1024 * 100);


// Create global object for logging arbitrary data
ApplicationLogger = {};

ApplicationLogger.check = [];

if (Meteor.isServer) {
  ApplicationLogger.server = [];
} else {
  ApplicationLogger.client = [];
  ApplicationLogger.ignoredErrors = [];
}


// addLogger accepts a name and function to run 
ApplicationLogger.addClientLogger = function (key, fn, pattern, req) {
  if (Meteor.isServer) {
    ApplicationLogger.check.push({ 
      key      : key, 
      pattern  : pattern || Match.Any,
      required : !! req 
    });
  } else {
    ApplicationLogger.client.push({ key : key, fn : fn });
  }
}

ApplicationLogger.addServerLogger = function (key, fn) {
  if (Meteor.isServer) {
    ApplicationLogger.server.push({ key : key, fn : fn });
  } 
}

// call all the logging functions and return results 
ApplicationLogger.getVals = function () {
  var payload = {};

  _.each(ApplicationLogger.server || ApplicationLogger.client, function (logger) {
    try {
      payload[logger.key] = logger.fn();
    } catch (e) {
      payload[logger.key] = { error : e };
    }
  });

  return payload;
}

