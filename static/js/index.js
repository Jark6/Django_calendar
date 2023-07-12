let jsDates=null;

var currentYear = new Date().getFullYear();
document.getElementById("current-year").value = currentYear;
getDateArray(currentYear);
//postYear();

function getCurrentYear(){
return currentYear;
}

function decrementYear() {
    currentYear--;
    document.getElementById("current-year").value = currentYear;
    getDateArray(currentYear);
    //postYear();
    //getAllYearDates ();
    //createCalendar(currentYear);

    }

function incrementYear() {
    currentYear++;
    document.getElementById("current-year").value = currentYear;
    getDateArray(currentYear);
    //postYear();
    //getAllYearDates ();
    //createCalendar(currentYear);
    }

function getAllYearDates () {
const dateStr = document.querySelectorAll('.date_feed');
jsDates = Array.from(dateStr).map(item => new Date(item.textContent.trim()));
console.log(jsDates);
//$name.selectDate(jsDates);
}

function getDateArray(year) {
  $.ajax({
    url: '/?year='+year,
    type: 'GET',
    dataType: 'html',
    success: function(response) {
        //console.log(response);
        var $response = $(response); // Создаем jQuery-объект из HTML-кода
        var $myElement = $response.find('#off_dates_container'); // Находим нужный элемент внутри HTML-кода
        $('#off_dates_container').html($myElement.html());
      // Здесь можно вызвать функцию-обработчик с полученным массивом
    },
    error: function(xhr, status, error) {
      console.log('Ошибка запроса');
    }
  });
  setTimeout(() => {createCalendar(currentYear);}, 100)
}
//console.log(dates);
/*
function postYear() {
    */
/*let xhr = new XMLHttpRequest();
    xhr.open('POST', '/', false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    let data = 'my_date=' + encodeURIComponent(currentYear);
    xhr.send(data);*//*

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
*/

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
    /*onRenderCell: function (date, cellType) {
        if (cellType === 'day') {
            const day = date.getDay();
            if (day === 6 || day === 0){
            return{
              classes: '-selected-',
            };
            }
        };
        }*/

  });

  if(jsDates==0){
    let docNode = document.querySelectorAll('div.-weekend-:not(.-disabled-)');
    docNode.forEach(doc => doc.classList.add("-selected-"));}
  else{
    $name.selectDate(jsDates);}
}
}

function postDates() {
let selectedDates = [];
var dateElements = document.querySelectorAll('div.air-datepicker-cell.-selected-');
dateElements.forEach(function(element) {
    var year = element.dataset.year;
    var month = parseInt(element.dataset.month)+1;
    var day = element.dataset.date;
    var date = year+"-"+month.toString()+"-"+day;//new Date(year, month, day);
    selectedDates.push(date);
  });
  console.log(selectedDates);
  console.log(JSON.stringify(selectedDates));


let csrftoken = $("[name=csrfmiddlewaretoken]").val();

$.ajax({
    url: "/",
    type: "POST",
    headers: {"X-CSRFToken": csrftoken},
    data: {'my_year': currentYear,
           'my_dates': JSON.stringify(selectedDates)},
    success: function(response) {
        console.log("All dates are sent successfully")
    },
    error: function(response) {
    console.log('something happened'+response.error);
  }
});
}

var editButton = document.getElementById('edit-btn');
editButton.addEventListener('click', function () {changeButtons(editButton);});
var saveButton = document.getElementById('save-btn');
saveButton.addEventListener('click', function () {changeButtons(saveButton);});
var cancelButton = document.getElementById('cancel-btn');
cancelButton.addEventListener('click', function () {changeButtons(cancelButton);});
var rebootButton = document.getElementById('reboot-btn');
rebootButton.addEventListener('click', function(){createCalendar(currentYear);});
var confirmButton = document.getElementById('confirm-btn');
confirmButton.addEventListener('click', ()=>{changeButtons(confirmButton)})
var incrementYearButton = document.getElementById('incrementYear-btn');
var decrementYearButton = document.getElementById('decrementYear-btn');

function changeButtons(button) {
    if (button.id === 'edit-btn' && button.classList.contains('button-active')){
        hideButton(button);
        hideButton(incrementYearButton);
        hideButton(decrementYearButton);
        hideButton(rebootButton);
        revealButton(saveButton);
        revealButton(cancelButton);
        }
    else if (button.id === 'cancel-btn' && button.classList.contains('button-active')){
        hideButton(button);
        hideButton(saveButton);
        revealButton(incrementYearButton);
        revealButton(decrementYearButton);
        revealButton(editButton);
        revealButton(rebootButton);
        }
    else if (button.id === 'save-btn' && button.classList.contains('button-active')){
        var promise = new Promise(function(resolve,reject){$('#saveModalCenter').modal('show', function(){resolve();})})
        promise.then(()=>{changeButtons(cancelButton)})
        }
    else if (button.id === 'confirm-btn'){
        $('#saveModalCenter').modal('hide');
        changeButtons(cancelButton);
        postDates();
        }
}

function hideButton(button){
    button.classList.remove('button-active');
    button.classList.add('button-hidden');
}

function revealButton(button){
    button.classList.remove('button-hidden');
    button.classList.add('button-active');
}