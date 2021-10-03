const express = require('express');
const config = require('../appSettings');

//const msalWrapper = require('msal-express-wrapper');

//const https = require('https');
//const url = require('url');
//const { response } = require('express');


const router = express.Router();

module.exports = params => {
  const { employeeService } = params;
  //const {authProvider} = params;

  router.get('/', async (req, res, next) => {
    try {
      const emps = null;
      return res.render('layout', {
        pageTitle: 'Employees',
        template: 'employees',
        emps,
    });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    /*
    var silentRequest = {
      scopes: ["https://graph.microsoft.com/.default"],
      account: request.session.account,
      forceRefresh: false
    };
  
    var newrequest = {
        scopes: ["https://graph.microsoft.com/.default"],
        loginHint: request.session.account.username // For v1 endpoints, use upn from idToken claims
    };
    const tokenResponse = await myMsal.acquireTokenSilent(silentRequest).catch(async (error) => {
      if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return await myMSALObj.acquireTokenPopup(newrequest).catch(error => {
              handleError(error);
          });
      }
  }); 
  var silentRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
    account: request.session.account,
    forceRefresh: false
  };
  var access_token = '';
  const tokenRequest = {
    code: request.session.tokenRequest.code,
    scopes: ["https://graph.microsoft.com/.default"],
    redirectUri: 'http://localhost:3000/redirect',
  };
  await myMsal.acquireTokenByCode(tokenRequest).then((res) => {
    console.log("I am here");
  }).catch((error) => {
    console.log("I am here");
    response.status(500).send(error)
  });
  

  });*/
/*access_token = await myMsal.acquireTokenSilent(silentRequest).catch(async (error) => {
      const authCodeUrlParameters = {
          scopes: ["https://graph.microsoft.com/.default"],
          redirectUri: "http://localhost:3000/redirect",
      };
      access_token = await myMsal.getAuthCodeUrl(authCodeUrlParameters);
      console.log(access_token);
      access_token = `${access_token}&state=Open ID is great`;
      response.redirect(access_token);
    });
  });
      console.log(access_token);
      const accessURL = new url.URL(access_token);
      var requestOptions = {
        headers: {
          Authorization : 'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6Imhud0RIMUNGMWZudXNrZ3o3WFExemNrc1EzbFVIM0hzZWRDenR2NnVtMUkiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80OGY3MDI3ZC1mYjYyLTRmZTYtODlhNy1jZjg5ZDI3ZjIyNjcvIiwiaWF0IjoxNjMzMDA5MTY5LCJuYmYiOjE2MzMwMDkxNjksImV4cCI6MTYzMzAxMzA2OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQUE2Zk1YUlZqSzdWZHB4ZG1nalY2R2VuMGZxM0MwVTM2SUNJY2FFUmQyWnkyeXdud2N4M2VmaTFHUTBhUklqNnNwUHozWkhLcXBUUVNvc3ZOa1pYWmhQeGNsYWJJSWMwL1NCYnRmUXVteEdFPSIsImFsdHNlY2lkIjoiMTpsaXZlLmNvbTowMDAzN0ZGRTM1QTA3NjREIiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBfZGlzcGxheW5hbWUiOiJPcmFjbGVBUElHVyIsImFwcGlkIjoiNjA5ZWQ1YTAtOGY0ZS00NDEwLTliNzAtOGZhMTNjNWFjYTM3IiwiYXBwaWRhY3IiOiIxIiwiZW1haWwiOiJtYXNhbmRwcmFrYXNoQG91dGxvb2suY29tIiwiZmFtaWx5X25hbWUiOiJNYXNhbmQiLCJnaXZlbl9uYW1lIjoiUHJha2FzaCIsImlkcCI6ImxpdmUuY29tIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjIzLjIzMy45MS4yMzIiLCJuYW1lIjoiUHJha2FzaCBNYXNhbmQiLCJvaWQiOiJjZWUzYTBhNy1hMzU0LTRiY2YtYTg0My02NThlMGU4MWEwZWUiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzIwMDEyNkFGNTExMSIsInJoIjoiMC5BWEVBZlFMM1NHTDc1ay1KcDgtSjBuOGlaNkRWbm1CT2p4QkVtM0NQb1R4YXlqZHhBSkEuIiwic2NwIjoiZW1haWwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJfU2ZvQzNVWnRzTGxleklUTkJROVg1NWdNT1lZczZ2eFl6bFByeGhBd2dBIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiNDhmNzAyN2QtZmI2Mi00ZmU2LTg5YTctY2Y4OWQyN2YyMjY3IiwidW5pcXVlX25hbWUiOiJsaXZlLmNvbSNtYXNhbmRwcmFrYXNoQG91dGxvb2suY29tIiwidXRpIjoiVmJ2X2tOUElmMDIxRWxtczZMM3BBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJMZkRmbVBQQ1JuVHExYVVhaWpNWWw5NUdWbjVlVF9iYU5BeFFCczJWNUlZIn0sInhtc190Y2R0IjoxNjE2NTY2NzQ3fQ.ZVPdwPlPm3i09Kbyt9JkIDJ3FtQ9Ty5hB366vUCrIFT2dW4sKF6F8NTYBa4yRZkV7-VrOp_mAfAp3-r161x-mWQxQ2IgU01toqNuvychRr0V8i8z2uwEkWrBrhWk-JgAAjekFg1XYE9-xoH-1eZuJvewl3Up4_6LY3llGv5EOpipHhXxGbmPq7cO0Iq-ni-tsiS6SooLbt1Zj6twBfBtDJ0wJlOqph_6MnXA51AFqv7OspyfBI3BjNc19PgpJADSL3Iw6oDj2iXtDiKtIblGh0hmrNyOw7Aqg5-UQf1drpRHCRW8_1UCR0ycHbLPrbWLUesKttHPi9s_EG5pbB73gA'
        }
      };
      
      const req =  await https.request(accessURL, requestOptions, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });        
    }).end();
  });
  access_token = await myMsal.acquireTokenByCode(request.session.authCodeRequest).catch(async (error) => {
    const authCodeUrlParameters = {
        scopes: ["https://graph.microsoft.com/.default"],
        redirectUri: "http://localhost:3000/redirect",
    };
    access_token = await myMsal.getAuthCodeUrl(authCodeUrlParameters);
    console.log(access_token);
    access_token = `${access_token}&state=Open ID is great`;
    response.redirect(access_token);
  });
 */
/*  var access_token = authProvider.getToken({
    resource: 'user.read'
  })();*/


  const emps = await employeeService.searchEmployees(req,res);
    try {
      return res.render('layout', {
        pageTitle: 'Employees',
        template: 'employees',
        emps,
    });
    } catch (err) {
      return next(err);
    }
  });



  return router;
}




