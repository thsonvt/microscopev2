Package.describe({
  name: 'thsonvt:errors',
  summary: ' A pattern to display application errors to the user ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');

  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.addFiles(['thsonvt:errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if (api.export)
  	api.export('Errors');
});

Package.onTest(function(api) {
    api.use('thsonvt:errors', 'client');
    api.use(['tinytest', 'test-helpers'], 'client');  
    api.addFiles('thsonvt:errors-tests.js', 'client');
});
