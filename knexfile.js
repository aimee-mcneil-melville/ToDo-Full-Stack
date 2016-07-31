// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/dev.sqlite3'
    },
    useNullAsDefault: true
  },
};
