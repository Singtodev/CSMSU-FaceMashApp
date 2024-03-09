const prodConfig = {
  API_PATH: 'https://csmsu-facemashapp-api.onrender.com',
  APP_ID: 1,
};

const devConfig = {
  API_PATH: 'http://localhost:3000',
  APP_ID: 1,
};

const isDevMode = false;

export default isDevMode ? devConfig : prodConfig;
