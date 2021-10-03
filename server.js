const express = require('express');
const session = require('express-session');
const path = require('path');
const msal = require('@azure/msal-node');
const employees = require('./routes/employees')

//const cookieSession = require('cookie-session');
const createError = require('http-errors');

const msalWrapper = require('msal-express-wrapper');
const config = require('./appSettings');

const bodyParser = require('body-parser');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');
const EmployeeService = require('./services/EmployeeService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const msalconfig = {
  auth: {
      authority: 'https://login.microsoftonline.com/48f7027d-fb62-4fe6-89a7-cf89d27f2267',
      clientId: '609ed5a0-8f4e-4410-9b70-8fa13c5aca37',
      redirectUri: "http://localhost:3000/redirect", //defaults to application start page
      postLogoutRedirectUri: "http://localhost:3000/",
      clientSecret:"4-50FjAeExWoJnS2_DWWMY_G~s0iWW84E~",
      scopes: ["https://graph.microsoft.com/.default"],
      grant_type: 'client_credentials'
  },
  system: {
    loggerOptions: {
      logLevel: msal.LogLevel.Verbose,
    }
  }
}

let accountId = "";
const myMsal = new msal.ConfidentialClientApplication(msalconfig);


const routes = require('./routes');
routes.name = "mainRouter";
const emproute = require('./routes/emproute');
emproute.name = "EmployeeRouter";

const app = express();

/*const sessionConfig = {
  secret: 'ENTER_YOUR_SECRET_HERE',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false, // set this to true on production
  }
}*/
const sessionConfig = {
  secret: 'Ghdur687399s7w',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false, 
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionConfig.cookie.secure = true // serve secure cookies
}

app.use(session(sessionConfig));


app.locals.siteName = 'Human Resources groups | Meetup';


const port = process.env.PORT || 3000;

//app.set('trust proxy', 1);
//sessionConfig.cookie.secure = true // serve secure cookies

/*app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghdur687399s7w', 'hhjjdf89s866799'],
  })
);*/

//app.use(session(sessionConfig));

const authProvider = new msalWrapper.AuthProvider(config);

// initialize the wrapper
app.use(authProvider.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const employeeService = new EmployeeService('./data/employee.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Human Resources groups Meetup';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/employees',
  authProvider.isAuthenticated(),
  authProvider.getToken({
    resource: config.remoteResources.graphAPI
  }),
  emproute({
    employeeService,
  })
);

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
    authProvider,
  })
);


app.get('/signin', 
    authProvider.signIn({successRedirect: '/'})
);

app.get('/signout', 
    authProvider.signOut({
        successRedirect: '/'
    }
));


app.use((request, response, next) => {
  console.log(request.url);
  return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});

