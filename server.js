Meteor.methods({
  'logError' : function (options) {
    options = options || {};

    check(options, {
      error     : String,
      url       : String,
      line      : Match.Integer,
      client    : Match.Optional(Match.Where(validateClient))
    });

    options.timestamp = new Date();
    
    if (ApplicationLogger.server.length > 0)
      options.server = ApplicationLogger.getVals();

    ApplicationErrors.insert(options);
  }
});


var validateClient = function (client) {
  // TODO: this doesn't really check if there are extra properties 
  if (_.size(client) > ApplicationLogger.check.length) return false;

  // test every check against the keys
  return _.every(ApplicationLogger.check, function (chk) {

    // return false if the property doesn't exist, unless it's not required
    if (! client.hasOwnProperty(chk.key)) {
      return ! chk.required;
    }

    // check the supplied pattern
    check(client[chk.key], chk.pattern);
    return true; 
  });
};