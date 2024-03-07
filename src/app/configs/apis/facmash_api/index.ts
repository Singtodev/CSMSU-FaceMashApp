const prodConfig = {
  API_PATH: 'https://csmsu-facemashapp-api.onrender.com',
  DELAY: 20,
};

const devConfig = {
  API_PATH: 'http://localhost:3000',
  DELAY: 20,
};

const isDevMode = false;

export default isDevMode ? devConfig : prodConfig;
