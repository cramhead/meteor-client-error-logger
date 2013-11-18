Package.describe({
    summary: "Client and server-side error logging"
});

Package.on_use(function (api, where) {
  api.use('livedata',   ['client', 'server']);
  api.use('underscore', ['client', 'server']);
  api.use('check',       'server');

  api.add_files('shared.js', ['client', 'server']);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');

  api.export('ApplicationLogger');
});

