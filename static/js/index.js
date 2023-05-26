//import AirDatepicker from 'air-datepicker';
//import '../css/air-datepicker.css';

//let dp = new AirDatepicker("#datepicker-container-1");
//let dp1 = new AirDatepicker("#datepicker-container-2");
//let dp3 = new AirDatepicker("#datepicker-container-3");

const container = document.getElementById('container');
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
  const dm=new Date(new Date().getFullYear(), i+1, 0).getDate();
  new AirDatepicker(newContainer, {
    inline:true, 
    selectOtherMonth:false, 
    multipleDates:true, 
    weekends:[6,0], 
    showOtherMonths:false,  
    moveToOtherMonthsOnSelect: false,     
    navTitles: { days: '<strong >MMMM</strong>' },
    minDate:new Date(new Date().getFullYear(), i, 1),
    maxDate:new Date(new Date().getFullYear(), i, dm),
    //selectedDates: [6,0]
  });
}