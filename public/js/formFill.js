$(document).ready(function(){
  $("#fill1").click(function(e){
    e.preventDefault();

    $('#addRowBtn').click();
    $('#addRowBtn').click();

    $('#url').val("http://localhost:8080/contact");
    $('#elementID1').val("name");
    $('#act1').val("Text Entry");
    $('#value1').val("George");

    $('#elementID2').val("email");
    $('#act2').val("Text Entry");
    $('#value2').val("yx009467@reading.ac.uk");

    $('#elementID3').val("message");
    $('#act3').val("Text Entry");
    $('#value3').val("Hello! Just sending a quick message");

    $('#elementID4').val("submit_button");
    $('#act4').val("Click");
    $('#value4').val("");

    $('#elementID5').val("confirmation-msg");
    $('#act5').val("Assert");
    $('#value5').val("Thanks!");
  });
});

$(document).ready(function(){
  $("#fill2").click(function(e){
    e.preventDefault();

    $('#addRowBtn').click();

    $('#url').val("http://localhost:8080/contact");
    $('#elementID1').val("name");
    $('#act1').val("Text Entry");
    $('#value1').val("George");

    $('#elementID2').val("message");
    $('#act2').val("Text Entry");
    $('#value2').val("Hello! Just sending a quick message");

    $('#elementID3').val("submit_button");
    $('#act3').val("Click");
    $('#value3').val("");

    $('#idOrClass4').val("Class");
    $('#elementID4').val("error");
    $('#act4').val("Assert");
    $('#value4').val("Email field empty");
  });
});

$(document).ready(function(){
  $("#fill3").click(function(e){
    e.preventDefault();

    $('#addRowBtn').click();
    $('#addRowBtn').click();
    $('#addRowBtn').click();

    $('#url').val("http://localhost:8080/contact");
    $('#elementID1').val("name");
    $('#act1').val("Text Entry");
    $('#value1').val("George");

    $('#elementID2').val("email");
    $('#act2').val("Text Entry");
    $('#value2').val("yx009467@reading.ac.uk");

    $('#elementID3').val("message");
    $('#act3').val("Text Entry");
    $('#value3').val("Hello! Just sending a quick message");

    $('#elementID4').val("phone-number");
    $('#act4').val("Text Entry");
    $('#value4').val("07432669754");

    $('#elementID5').val("submit_button");
    $('#act5').val("Click");
    $('#value5').val("");

    $('#elementID6').val("confirmation-msg");
    $('#act6').val("Assert");
    $('#value6').val("Thanks!");
  });
});
