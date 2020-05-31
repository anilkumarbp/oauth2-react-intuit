require('dotenv').config({ path: '../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const OAuthClient = require('intuit-oauth');

const app = express();

// Instance of intuit-oauth client
const oauthClient = new OAuthClient({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  environment: process.env.REACT_APP_ENVIRONMENT,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/authenticate', (req, res) => {

  // GetUserInfo
  const getUserInfo = () => {
    return oauthClient
      .makeApiCall({
        url:
          oauthClient.environment === 'sandbox'
            ? OAuthClient.userinfo_endpoint_sandbox
            : OAuthClient.userinfo_endpoint_production,
        method: 'GET',
      })
      .then((userInfo) => {
        return { userInfo: userInfo.getJson() };
      });
  };

  // GetCompanyInfo
  const getCompanyInfo = (userInfo) => {
    const companyID = oauthClient.getToken().realmId;

    const url =
      oauthClient.environment === 'sandbox'
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;

    return oauthClient
      .makeApiCall({ url: `${url}v3/company/${companyID}/companyinfo/${companyID}` })
      .then((companyInfo) => {
        return Object.assign({ companyInfo: companyInfo.getJson() }, userInfo);
      })
      .catch(function (e) {
        console.error(e);
      });
  };

  oauthClient
    .createToken(req.body.url)
    .then(getUserInfo)
    .then(getCompanyInfo)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch(function (e) {
      console.error(e.intuit_tid);
    });
});

app.get('/authorizeUrl', (req, res) => {
  const authorizeURL = oauthClient.authorizeUri({
    scope: process.env.REACT_APP_SCOPES.split(' '),
    state: 'testState',
  });
  return res.send(authorizeURL);
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
