import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './doctor.js';

$(document).ready(function() {
  $('#doctorForm').sumbit(function() {
    let name = $('#doctorName').val();
    $('#doctorName').val("");


    let doctorSearch = new Search();  // create instance of WeatherService class
    let promise = doctorSearch.searchName(name);  // call the instance method and pass in user input

    promise.then(function(response) {
      body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
