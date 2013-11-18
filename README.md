#Meteor Client Error Logger

This package adds a capped Collection called `ApplicationErrors`.

Secondly, it adds a handler to `window.onerror` and passes such errors along to `ApplicationErrors`.

##Usage:


Add to shared (client and server) code:

----

*ApplicationLogger.addClientLogger(
`Name`, 
`Function`, 
`Match Pattern`, 
`Required` 
);*

`Name` : The name of your property

`Function` : Pass a function here. The function will be called by the client when `window.onerror` fires. It will be called with no arguments.

`Match Pattern` : This is optional. It defaults to `Match.Any`. See [Match Patterns](http://docs.meteor.com/#matchpatterns) for all options.

`Required` : Ironically, the `required` option isn't. It defaults to false. If required is set to true, and the property isn't present when the logging method is called, it will result in a Meteor Error.

---

Add to server-only code:

*ApplicationLogger.addServerLogger(
`Name`, 
`Function`
);*

`Name` : The name of your property

`Function` : Pass a function here. The function will be called by the server on receipt of the passed error. It will be called with no arguments.


##Examples:

    ApplicationLogger.addClientLogger('Session Keys', function () {
      return Session.keys;
    }, Match.Any);
    
    ApplicationLogger.addClientLogger('Random', function () {
      return Math.random();
    }, Number, true);

    // TODO: Let's come up with some useful example logging functions 
	// For a good ideas, check here:
	// http://stackoverflow.com/questions/2860879/detecting-if-a-browser-is-using-private-browsing-mode
	// http://www.quirksmode.org/js/detect.html
    // http://www.javascriptkit.com/script/script2/plugindetect.shtml


##Notes

The `ApplicationErrors` collection is not published by default. You can create your own publication function if you want to export this, but it should not be published to all users.

Match Patterns default to allow anything, so as to work with the `audit-argument-checks` though I haven't bothered to test this at all.

`window.onerror` doesn't return a stack trace so it's useful to add `try/catch` in critical points. Feel free to add your own method to log these into Application Errors.

##WIP

This package is a work in progress. It generally works but the Match code is bad (you can inject additional properties into it). It could also use some anti-DOS code, though the Match functions and the fact that it uses an (undocumented, unsupported) capped-collection will help on this.

Pull requests welcome. When more eyes have been through it and hopefully fixed up my horrible code, I'll publish to Atmosphere.



