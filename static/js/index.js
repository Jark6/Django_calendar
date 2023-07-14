let inDates=null;

var currentYear = new Date().getFullYear();
document.getElementById("current-year").value = currentYear;
getDateArray(currentYear);

function getCurrentYear(){
return currentYear;
}

function decrementYear() {
    currentYear--;
    document.getElementById("current-year").value = currentYear;
    getDateArray(currentYear);
     }

function incrementYear() {
    currentYear++;
    document.getElementById("current-year").value = currentYear;
    getDateArray(currentYear);
    }

function getAllYearDates () {
    const dateStr = document.querySelectorAll('.date_feed');
    inDates = Array.from(dateStr).map(item => new Date(item.textContent.trim()));
    }

function getDateArray(year) {
  $.ajax({
    url: '/?year='+year,
    type: 'GET',
    dataType: 'html',
    success: function(response) {
        var $response = $(response);
        var $myElement = $response.find('#off_dates_container');
        $('#off_dates_container').html($myElement.html());
    },
    error: function(xhr, status, error) {
      console.log('Ошибка запроса');
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
    moveToOtherMonthsOnSelect: false,
    disableNavWhenOutOfRange: true,
    minView: 'months',
    startView: 'days',
    navTitles: {
    days: '<strong >MMMM</strong>' },
    minDate:new Date(currentYear, i, 1),
    maxDate:new Date(currentYear, i, dm),
    });

  if(inDates==0){
    let docNode = document.querySelectorAll('div.air-datepicker-cell.-day-.-weekend-:not(.-other-month-)');
    docNode.forEach(doc => doc.classList.add("-selected-"));}
  else{
    $name.selectDate(inDates);}
}
let dayNode = document.querySelectorAll('div.air-datepicker-cell.-day-:not(.-other-month-)');
dayNode.forEach(doc => doc.classList.add("-disabled-"));
let monthNode = document.querySelectorAll('div.air-datepicker-nav--title');
monthNode.forEach(doc => doc.classList.add("-disabled-"));
}

function postDates() {
let selectedDates = [];
var dateElements = document.querySelectorAll('div.air-datepicker-cell.-day-.-selected-');
dateElements.forEach(function(element) {
    var year = element.dataset.year;
    var month = parseInt(element.dataset.month)+1;
    var day = element.dataset.date;
    var date = year+"-"+month.toString()+"-"+day;
    selectedDates.push(date);
  });

let csrftoken = $("[name=csrfmiddlewaretoken]").val();

$.ajax({
    url: "/",
    type: "POST",
    headers: {"X-CSRFToken": csrftoken},
    data: {'my_year': currentYear,
           'my_dates': JSON.stringify(selectedDates)},
    success: function(response) {
        $('#alert_success_upload').fadeIn();
        setTimeout(()=>{$('#alert_success_upload').fadeOut();}, 10000)
    },
    error: function(response) {
    console.log('something wrong: '+response.error);
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
rebootButton.addEventListener('click', function(){getDateArray(currentYear);;});
var confirmButton = document.getElementById('confirm-btn');
confirmButton.addEventListener('click', ()=>{changeButtons(confirmButton)})
var incrementYearButton = document.getElementById('incrementYear-btn');
incrementYearButton.addEventListener('click', ()=>{incrementYear()})
var decrementYearButton = document.getElementById('decrementYear-btn');
decrementYearButton.addEventListener('click', ()=>{decrementYear()})

function changeButtons(button) {
    if (button.id === 'edit-btn' && button.classList.contains('button-active')){
        hideButton(button);
        hideButton(incrementYearButton);
        hideButton(decrementYearButton);
        hideButton(rebootButton);
        revealButton(saveButton);
        revealButton(cancelButton);
        document.querySelector('#container').classList.remove('-view-');
        editAddBreadCrumb('Edit Calendar');
        let dayNode = document.querySelectorAll('div.-day-:not(.-other-month-)');
        dayNode.forEach(doc => doc.classList.remove("-disabled-"));
        }
    else if (button.id === 'cancel-btn' && button.classList.contains('button-active')){
        hideButton(button);
        hideButton(saveButton);
        revealButton(incrementYearButton);
        revealButton(decrementYearButton);
        revealButton(editButton);
        revealButton(rebootButton);
        document.querySelector('#container').classList.add('-view-');
        editRemoveBreadCrumb();
        setTimeout(()=>getDateArray(currentYear), 300)
        }
    else if (button.id === 'save-btn' && button.classList.contains('button-active')){
        $('#saveModalCenter').modal('show')
        }
    else if (button.id === 'confirm-btn'){
        $('#saveModalCenter').modal('hide');
        postDates();
        changeButtons(cancelButton);
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

function editAddBreadCrumb(newText){
    const currentBreadcrumb = document.querySelector('.breadcrumb-item.active');
    currentBreadcrumb.classList.remove('active');
    currentBreadcrumb.removeAttribute('aria-current')
    const breadcrumbList = document.getElementById('breadcrumb-list');
    const newCrumb = document.createElement('li');
    newCrumb.classList.add('breadcrumb-item', 'active');
    newCrumb.setAttribute('aria-current', 'page');
    newCrumb.textContent = newText;
    breadcrumbList.appendChild(newCrumb);
}

function editRemoveBreadCrumb(){
    const breadcrumbList = document.getElementById('breadcrumb-list');
    const currentBreadcrumb = document.querySelector('.breadcrumb-item.active');
    breadcrumbList.removeChild(currentBreadcrumb);
    const prevCrumb = document.querySelector('.breadcrumb-item:last-child');
    prevCrumb.classList.add('active');
    prevCrumb.setAttribute('aria-current', 'page');
}