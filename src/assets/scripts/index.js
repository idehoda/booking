import '../styles/index.scss';

(() => {

  let dataFromDB = {};
  let disabledDays = [];
  const uPicked = {};
  
  const $city = $('#form__city');
  const $hotel = $('#form__hotel');
  const $submit = $('.form__submit');
  const $email = $('#form__email');
  const $datePicker = $('.datepicker');
  const pickedClass = 'ui-state-highlight'; 
  

  $(document).ready(function() { 
  //fetching JSON and setting initial values
    $.getJSON('dataFromDB.json', function(data){
      dataFromDB = Object.assign({}, data);
      init();     
    });        
  }); 
      
    //handlers
    $city.on('change', function() {      
      let cityObj = dataFromDB.city.find((obj) => { 
        return obj.name === this.value; 
      });      
      handleCityChange(cityObj);
    });

    $hotel.on('change', function() {      
        uPicked.hotel = this.value;
    });
    $email.focusout(function() {     
        uPicked.email = this.value;
    });
    
    $submit.submit(function(e) {
      e.preventDefault();
      console.log(uPicked);
    });
      

    //functions
    
    function init(){
        //Datepicker 
        disabledDays = dataFromDB.forbidden;
        $datePicker.datepicker({
          prevText: '<i class="fa fa-fw fa-angle-left"></i>',
          nextText: '<i class="fa fa-fw fa-angle-right"></i>',
          minDate: new Date(),
          beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('dd/mm', date);
            return [ disabledDays.indexOf(string) == -1 ];
          },      
          onSelect: function (dateString) {
            let date = $(this).val();
            uPicked.selectedDate =  $(this).val();          
          }             
        });       
        
        //load cities from db
        $.each(dataFromDB.city, function(key, val){
          $city.append(`<option data-kappa = "${val.id}" id="${val.id}"> ${val.name}</option>`);
        });

        handleCityChange(dataFromDB.city[0]);

        let now = new Date().toLocaleDateString();
        $datePicker.datepicker( "setDate", now);
        uPicked.selectedDate =  $datePicker.val();
        uPicked.hotel =  $hotel.val();
        uPicked.city =  $city.val();
    }      

    function handleCityChange(chosenCityObj){
      $hotel.html('');
      $.each(chosenCityObj.hotels, function(key, val){
        $hotel.append(`<option> ${val}</option>`);
      });
      uPicked.hotel = $hotel.val();
      uPicked.city = chosenCityObj.name;
    } 
    
})();
