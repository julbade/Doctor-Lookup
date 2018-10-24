import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Doctor, Search } from './doctor.js';
/* eslint-disable no-unused-vars */
$(document).ready(function() {
  $('form#doctor').submit(function(event) {
    event.preventDefault();
    let name = $('#doctorName').val();
    let specialty = $('#specialty').val();
    $('#doctorName').val("");
    $('#specialty').val("");

    let doctorSearch = new Search();
    let promise = doctorSearch.searchDoctor(name, specialty);

    promise.then(function(response) {
    let body = JSON.parse(response);
    if (body.data.length === 0) {
      $("#errors").text("There were no doctors found matching your search criteria.");
    }
    for (let i = 0; i < body.data.length; i++) {
           let firstName = body.data[i].profile.first_name;
           let lastName = body.data[i].profile.last_name;
           let address = `${body.data[i].practices[0].visit_address.street}
             ${body.data[i].practices[0].visit_address.street2}
             ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}`;
           let phone = body.data[i].practices[0].phones[0].number;
           let language = body.data[i].practices[0].languages[0].name;
           let doctor = new Doctor(firstName, lastName, address, phone, language);
           
           $("#results").append(`<h2> ${doctor.firstName}   ${doctor.lastName} </h2>` +
           ` <p>Address:  ${doctor.address} </p>` +
           `<p>Phone: ${doctor.phone} </p>` + 
           `<p>Language: ${doctor.language} </p>` +`<hr>` );
         }
   },
   function(error) {
      $('#errors').text(`There was an error processing your request. Please try again. ${error}`);


    });
  });
});

