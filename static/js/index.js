//import AirDatepicker from 'air-datepicker';
//import '../css/air-datepicker.css';

//let dp = new AirDatepicker("#datepicker-container-1");
//let dp1 = new AirDatepicker("#datepicker-container-2");
//let dp3 = new AirDatepicker("#datepicker-container-3");
//import getAllDates from "Calendar.views"
var currentYear = new Date().getFullYear();
document.getElementById("current-year").value = currentYear;

function decrementYear() {
    currentYear--;
    document.getElementById("current-year").value = currentYear;
    createCalendar(currentYear);
    }

function incrementYear() {
    currentYear++;
    document.getElementById("current-year").value = currentYear;
    createCalendar(currentYear);
    }


const dates = [
  new Date('2023-07-01'),
  new Date('2023-07-05'),
  new Date('2023-07-10')
];

console.log(dates);

let dateStr = document.querySelectorAll('.date_feed');
//let dateObj = JSON.parse(jsonStr);
//console.log(dateStr);
let jsDates = Array.from(dateStr).map(item => new Date(item.textContent.trim()));
console.log(jsDates);

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



   $name.selectDate(jsDates);
    //$name.selectDate(dates);
    //$name.selectDate(jsDate);
}
}
createCalendar(currentYear);
    let docNode = document.querySelectorAll('div.air-datepicker-nav--title');
    docNode.forEach(doc => doc.classList.add("-disabled-"))
/*for (let i = 0; i < 12; i++) {
    const name = 'airDatepicker'+i;
    let $name;
    }*/