# React OAuth2.0 Intuit

## Overview

This is a `sample` app bootstrapped with [Create React App](https://github.com/facebook/create-react-app) to show how to login using Intuit's [OAuth2.0 Client library](https://www.npmjs.com/package/intuit-oauth).

## Installation

### Requirements

- ⚛️ React
- [Node.js](http://nodejs.org) 8 LTS and above
- [Intuit Developer](https://developer.intuit.com) Account

### Via Github Repo (Recommended)

```bash
$ git clone https://github.com/anilkumarbp/oauth2-react-intuit
$ cd react-oauth2-intuit
$ yarn install
```

## Configuration

Edit the `.env` file to add your:

- **PORT:(optional)** Optional port number for the app to be served
- **REACT_APP_CLIENT_ID** Enter your client_ID from Intuit Developer Portal
- **REACT_APP_CLIENT_SECRET** Enter your client_Secret from Intuit Developer Portal
- **REACT_APP_ENVIRONMENT** =sandbox
- **REACT_APP_REDIRECT_URI** http://localhost:3000/login (default)
- **REACT_APP_PROXY_URL** http://localhost:5000/authenticate (default)
- **REACT_APP_AUTHORIZE_URL** http://localhost:5000/authorizeUrl (default)
- **REACT_APP_SCOPES** `com.intuit.quickbooks.accounting openid email phone profile` (space
  seperated : default)
- **SERVER_PORT** 5000 (default)

## Usage

Before you start the `app` , enter the `Redirect URI` in your app’s Keys and OAuth section under
`Development`.

`Redirect URI` : http://localhost:3000/login

```bash
$ yarn start
```

Open `http://localhost:3000` and voilà !

If you would like to test the app using `https` refer to the section below.

### TLS / SSL (**optional**)

If you want your enpoints to be exposed over the internet. The easiest way to do that while you are
still developing your code locally is to use [ngrok](https://ngrok.com/download/).

ONLY when you have `ngrok` setup follow the steps below :

1. Start ngrok on the root path

```bash
$ cd oauth2-react-intuit
$ ngrok http 3000 -host-header="localhost:3000"
```

2. Update Redirect URI in two places :

- .env -> change the `REACT_APP_REDIRECT_URI` to `https forwarding` url from Step 1 above.  
  (ex: `https://d3d98c1ea00f.ngrok.io/login`)
- Login to Intuit Developer Portal and update the Redirect URL for your app under `Production` keys

3. Run the App (_in a different terminal from the root path_)

```bash
$ cd oauth2-react-intuit
$ yarn start
```

Open the URL from ngrok which looks like `https://d3d98c1ea00f.ngrok.io/` and voilà !
