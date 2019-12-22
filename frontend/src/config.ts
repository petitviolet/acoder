const development = {
  API_HOST: 'http://localhost:3000',
};

const production = {
  API_HOST: 'https://acoder-api.herokuapp.com',
};

const config = () => {
  if (process.env.NODE_ENV === 'production') {
    return production;
  } else {
    return development;
  }
};

export default config();
