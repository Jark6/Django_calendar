//import AirDatepicker from 'air-datepicker';
//import '../css/air-datepicker.css';

//let dp = new AirDatepicker("#datepicker-container-1");
//let dp1 = new AirDatepicker("#datepicker-container-2");
//let dp3 = new AirDatepicker("#datepicker-container-3");
//import getAllDates from "Calendar.views"

const dates = [
  new Date('2023-07-01'),
  new Date('2023-07-05'),
  new Date('2023-07-10')
];

var currentYear = new Date().getFullYear();
document.getElementById("current-year").value = currentYear;
getAllYearDates ();
createCalendar(currentYear);

function decrementYear() {
    currentYear--;
    document.getElementById("current-year").value = currentYear;
    postYear();
    //getAllYearDates ();
    createCalendar(currentYear);

    }

function incrementYear() {
    currentYear++;
    document.getElementById("current-year").value = currentYear;
    postYear();
    //getAllYearDates ();
    createCalendar(currentYear);
    }

function getAllYearDates () {
postYear();
let dateStr = document.querySelectorAll('.date_feed');
let jsDates = Array.from(dateStr).map(item => new Date(item.textContent.trim()));
console.log(jsDates);
//$name.selectDate(jsDates);
}


console.log(dates);
function postYear() {
    /*let xhr = new XMLHttpRequest();
    xhr.open('POST', '/', false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    let data = 'my_date=' + encodeURIComponent(currentYear);
    xhr.send(data);*/
//$("#year_container").empty();
let csrftoken = $("[name=csrfmiddlewaretoken]").val();

$.ajax({
    url: "/",
    type: "POST",
    headers: {"X-CSRFToken": csrftoken},
    data: {'my_year': currentYear},
    success: function(response) {
        //console.log(response);
        // $('#date_feed').html(response);
        //alert("success");
         //$('#off_dates_container').html(response);
        var $response = $(response); // Создаем jQuery-объект из HTML-кода
        var $myElement = $response.find('#off_dates_container'); // Находим нужный элемент внутри HTML-кода
        $('#off_dates_container').html($myElement.html());
    }
});
getAllYearDates ()
}





//let dateObj = JSON.parse(jsonStr);
//console.log(dateStr);


/*let jsonStr = document.getElementById('off_date').textContent;
let dateObj = JSON.parse(jsonStr);
console.log(dateObj)*/
//let jsDate = new Date(dateObj);
//const container2 = {{ get_date }};

function createCalendar(currentYear){
const container = document.getElementById('container');
container.innerHTML='';
let rowSerial = 0;
for (let i = 0; i < 12; i++) {
    if (i==0 || i==6){
        rowSerial++;
        const newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.id='row_'+rowSerial;
        container.appendChild(newRow);
    };
  const row = document.getElementById('row_'+rowSerial);
  const newContainer = document.createElement('div');
  newContainer.classList.add('col');
  row.appendChild(newContainer);
  const dm=new Date(currentYear, i+1, 0).getDate();
  const name = 'airDatepicker'+i;
  let $name = new AirDatepicker(newContainer, {
    inline:true, 
    selectOtherMonth:false, 
    multipleDates:true, 
    weekends:[6,0],
    showOtherMonths:false,
    //highlightWeekends:true,
    moveToOtherMonthsOnSelect: false,     
    navTitles: {
    days: '<strong >MMMM</strong>' },
    minDate:new Date(currentYear, i, 1),
    maxDate:new Date(currentYear, i, dm),
      //selectedDates: jsDate,
    onRenderCell: function (date, cellType) {
        if (cellType === 'day') {
            const day = date.getDay();
            if (day === 6 || day === 0){
            return{
              classes: '-selected-',
            };
            }
        };
        }

  });


  //$name.hide();
    let docNode = document.querySelectorAll('div.-weekend-');
    docNode.forEach(doc => doc.classList.add("-selected-"))

    $name.selectDate(dates);




    //$name.selectDate(dates);
    //$name.selectDate(jsDate);
}
}


    let docNode = document.querySelectorAll('div.air-datepicker-nav--title');
    docNode.forEach(doc => doc.classList.add("-disabled-"))
/*for (let i = 0; i < 12; i++) {
    const name = 'airDatepicker'+i;
    let $name;
    }*/
     //$name.selectDate(jsDates);