import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search, Doctor } from './doctor.js';
/* eslint-disable no-unused-vars */
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
    for (let i = 0; i < body.data.length; i++) {
           let firstName = body.data[i].profile.first_name;
           let lastName = body.data[i].profile.last_name;
           let address =
             `${body.data[i].practices[0].visit_address.street}
             ${body.data[i].practices[0].visit_address.street2}
             ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}`;
           let phone = body.data[i].practices[0].phones[0].number;
           let language = body.data[i].practices[0].languages;
           let doctor = new Doctor(firstName, lastName, address, phone, language);

           $("#results").append(doctor);
   }
  });
 });
});
