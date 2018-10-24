const Promise = require('es6-promise').Promise;

export class Search {
  searchDoctor(name, specialty) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${specialty}&location=wa-seattle&skip=0&limit=15&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}



export class Doctor {
  constructor(firstName, lastName, address, phone, language) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phone = phone;
    this.language = language;
  }
}
