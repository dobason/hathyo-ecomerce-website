module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
    AUTH_API_URL: true,
    ADMIN_API_URL: true,
  },
};
