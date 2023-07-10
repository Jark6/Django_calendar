const dates = [
  new Date('2023-07-01'),
  new Date('2023-07-05'),
  new Date('2023-07-10')
];

let jsDates=null;

var currentYear = new Date().getFullYear();
document.getElementById("current-year").value = currentYear;
//getDateArray(currentYear);
postYear();

function decrementYear() {
    currentYear--;
    document.getElementById("current-year").value = currentYear;
    postYear();
    //getAllYearDates ();
    //createCalendar(currentYear);

    }

function incrementYear() {
    currentYear++;
    document.getElementById("current-year").value = currentYear;
    postYear();
    //getAllYearDates ();
    //createCalendar(currentYear);
    }

function getAllYearDates () {
const dateStr = document.querySelectorAll('.date_feed');
jsDates = Array.from(dateStr).map(item => new Date(item.textContent.trim()));
console.log(jsDates);
//$name.selectDate(jsDates);
}

/*function getDateArray(year) {
  $.ajax({
    url: '/?year='+year,
    type: 'GET',
    dataType: 'html',
    success: function(response) {
      var myDates = response.my_dates;
      console.log(myDates);
        var $response = $(response); // Создаем jQuery-объект из HTML-кода
        var $myElement = $response.find('#off_dates_container'); // Находим нужный элемент внутри HTML-кода
        $('#off_dates_container').html($myElement.html());
      // Здесь можно вызвать функцию-обработчик с полученным массивом
    },
    error: function(xhr, status, error) {
      console.log('Ошибка запроса');
    }
  });
}*/
//console.log(dates);
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
        var $response = $(response); // Создаем jQuery-объект из HTML-кода
        var $myElement = $response.find('#off_dates_container'); // Находим нужный элемент внутри HTML-кода
        $('#off_dates_container').html($myElement.html());
    }
});
setTimeout(() => {createCalendar(currentYear);}, 100)

}

function createCalendar(currentYear){
const container = document.getElementById('container');
container.innerHTML='';
getAllYearDates();
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

    $name.selectDate(dates);
  //$name.hide();
  if(jsDates==0){
    let docNode = document.querySelectorAll('div.-weekend-');
    docNode.forEach(doc => doc.classList.add("-selected-"));}
  else{
    $name.selectDate(jsDates);}






    //$name.selectDate(dates);

}
}

function postDates() {
let selectedDates = [];
var dateElements = document.querySelectorAll('div.air-datepicker-cell.-selected-');
dateElements.forEach(function(element) {
    var year = element.dataset.year;
    var month = element.dataset.month;
    var day = element.dataset.date;
    var date = new Date(year, month, day);
    selectedDates.push(date);
  });
  console.log(selectedDates);

let csrftoken = $("[name=csrfmiddlewaretoken]").val();

$.ajax({
    url: "/edit",
    type: "POST",
    headers: {"X-CSRFToken": csrftoken},
    data: {'my_year': currentYear,
           'my_dates':selectedDates},
    success: function(response) {
        console.log(response)
    }
});
}
/*setTimeout(() =>{
    let docNode1 = document.querySelectorAll("div.-day-");
    docNode1.forEach(doc => doc.classList.add("-disabled-"));
    let docNode2 = document.querySelectorAll("div.air-datepicker-nav--title");
    docNode2.forEach(doc => doc.classList.add("-disabled-"));},500);*/
