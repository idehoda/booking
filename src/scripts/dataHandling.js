$(document).ready(function() {

    var $city = $('#form__city');
   
  //request the JSON data and parse into the select element
  $.getJSON('dataFromDB.json', function(data){
   
    //clear the current content of the select
    $city.html('');
   console.log(data);
    //iterate over the data and append a select option
    // $.each(data.city, function(key, val){
    //   // $select.append('<option id="' + val.id + '">' + val.name '</option>');
    //   $select.append(`<option id="${val.id}"> ${val.name}</option>`);
    // })
  });
  
    let data = {};
  
    $(".datepicker").datepicker({
      prevText: '<i class="fa fa-fw fa-angle-left"></i>',
      nextText: '<i class="fa fa-fw fa-angle-right"></i>'
    });
    var currentDate = $( ".datepicker" ).datepicker( "getDate" );
    $(".datepicker").on("change",function(){
      data.selectedDate =  $(this).val();
      
  });
  });