import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search, Doctor } from './doctor.js';

$(document).ready(function() {
  $('#doctorForm').sumbit(function() {
    let name = $('#doctorName').val();
    let specialty = $("#specialty").val();
    $('#doctorName').val("");
    $('#specialty').val("");


    let doctorSearch = new Search();  // create instance of WeatherService class
    let promise = doctorSearch.searchDoctor(name, specialty);  // call the instance method and pass in user input

    promise.then(function(response) {
    let body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
