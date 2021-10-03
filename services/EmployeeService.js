const fs = require('fs');
const util = require('util');
const config = require('./OICSettings.js');

const https = require('https');
const { Http2ServerResponse } = require('http2');

const readFile = util.promisify(fs.readFile);

class EmployeeService {
    /**
     * Constructor
     * @param {*} datafile Path to a JSOn file that contains the speakers data
     */
    constructor(datafile) {
      this.datafile = datafile;
  }

    async searchEmployees(req,res) {
      var curRequest = JSON.parse(JSON.stringify(config));
      curRequest.path = config.path + req.body.name;
      var data;
        curRequest.headers.Authorization = `Bearer ${req.session.remoteResources['graphAPI'].accessToken}`;
        var httppromise = this.getPromise(curRequest);
        var response = await httppromise;
        try {
          data = JSON.parse(response);
        }catch(err) {
          data = {
            "Persons": [
              {
                LastName :"Error",
                WorkEmail : err
              }
            ]
          };
        }
        httppromise = null;
        return data;
      /*const url = `${config.protocol}://${config.url}${config.path}`;
      console.log(`url is ${url}`);
      const req = http.request({'url': url, 
        'headers': {
          'Authorization':`Bearer ${accessToken}`
        }},function(err,res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
      });*/
      // We are using map() to transform the array we get into another one
    }


    getPromise(curRequest) {
      return new Promise((resolve, reject) => {
        https.get(curRequest, (response) => {
          let chunks_of_data = [];
    
          response.on('data', (fragments) => {
            chunks_of_data.push(fragments);
          });
    
          response.on('end', () => {
            let response_body = Buffer.concat(chunks_of_data);
            console.log(response_body.toString());
            resolve(response_body.toString());
          });
    
          response.on('error', (error) => {
            reject(error);
          });
        });
      });
    }
    

}

module.exports = EmployeeService;
    