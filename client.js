// save the onerror handler if there is one
var og = window.onerror;

// call function when error occurs
window.onerror = function (e, u, l) {
  
  // I didn't actually test this
  if (ApplicationLogger.ignoredErrors.indexOf(e) !== -1)
    return;

  var payload = {
    error : e,
    url   : u,
    line  : l
  };

  if (ApplicationLogger.client.length > 0)
    payload['client'] = ApplicationLogger.getVals()

  Meteor.call('logError', payload, function (err) {  
    // TODO: I really shouldn't be logging my error-logging errors to the console
    if (err) console.log(err); 
  });

  // call original onerror if there is one
  if (typeof og === 'function')
    og(e, u, l);
};
