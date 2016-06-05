window.onload = function(){
  (function Initdate () {
     var date = document.getElementById('inputdate');
     var today = new Date();  
     var time = today.toString().split(" ");
     var month = makemonthtonum(time[1]);
     console.log(time);
     date.value = time[3] + " " + month + " " + time[2];
  })();
  Inittable();
  var input = document.getElementById('inputdate');
  var calendar = document.getElementsByClassName('calendar')[0];
  var tdlist = calendar.getElementsByTagName('td');
  var tid;
  input.onfocus = function(){
    tid = setTimeout(function(){
      calendar.style.display = "block";
    },25);
    //console.log(123);
  }
  for(var i = 7;i < tdlist.length; i++){
    tdlist[i].onblur = function(){
      clearTimeout(tid);
      }
  }
}
var judgedata = {first :0}
function makemonthtonum (monthday) {
  switch (monthday){
    case "Jan" : return "01";
        case "Feb" : return "02";
        case "Mar" : return "03";
        case "Apr" : return "04";
        case "May" : return "05";
        case "Jun" : return "06";
        case "Jul" : return "07";
        case "Aug" : return "08";
        case "Sept" : return "09";
        case "Oct" : return "10";
        case "Nov" : return "11";
        case "Dec" : return "12";
  }
}
function Inittable () {
  var calendar = document.getElementById('calendar');
  var table = {
    rownum  : "6",
    colnum : "7",
    color : "#A33F98",
  }
  for(var i = 0;i < table.rownum; i++){
    var newtr = document.createElement('tr');
    for(var j = 0;j < table.colnum; j++){
      var newtd = document.createElement('td');
      newtr.appendChild(newtd);
    }
    calendar.appendChild(newtr);
  }
  Initcalendar();
}
function Initcalendar () {
  var calendar = document.getElementById('calendar');
  var tdlist = calendar.getElementsByTagName('td');
  var inputdate = document.getElementById('inputdate');
  var date = inputdate.value.split(" ");
  var length = getmonthdaylength(date[1],date[0]);
  //console.log(length);
  var firstday = date[0] + " " + date[1] + " " + 1;
  firstday = new Date(firstday);
  firstday = firstday.toString().split(' ');
  //console.log(makeweektonum(firstday[0]));
  var begin = 7 + makeweektonum(firstday[0]);
  for(var i = 1 ; i <= length; i++){
     tdlist[begin].innerHTML = i;
     tdlist[begin].style.cursor = "pointer";
     (function(begin){
         return tdlist[begin].onmouseover = function(){
          tdlist[begin].style.background = "#A33F98";
          tdlist[begin].style.color = "white";
         }
     })(begin);
     (function(begin){
         return tdlist[begin].onmouseout = function(){
          tdlist[begin].style.background = "white";
          tdlist[begin].style.color = "#A33F98";
         }
     })(begin);
      (function(begin){
         return tdlist[begin].onclick = function(){
          if(tdlist[begin].innerHTML < 10)
            inputdate.value = date[0] + " " + date[1] + " " + 0 +tdlist[begin].innerHTML;
          else
            inputdate.value = date[0] + " " + date[1] + " " + tdlist[begin].innerHTML;
         }
     })(begin);
     begin ++;
  }
}
function makeweektonum (weekday) {
    switch (weekday){
        case "Mon" : return 1;
        case "Tue" : return 2;
        case "Wed" : return 3;
        case "Thu" : return 4;
        case "Fri" : return 5;
        case "Sat" : return 6;
        case "Sun" : return 0;
    }
}
function getmonthdaylength (month,year) {
    var length;
    switch (month){
        case "01" : length = 31; break;
        case "02" : if(year % 4 == 0){
            length = 29;
        }
        else{
            length = 28;
        }
        break;
        case "03" : length = 31; break;
        case "04" : length = 30; break;
        case "05" : length = 31; break;
        case "06" : length = 30; break;
        case "07" : length = 31; break;
        case "08" : length = 31; break;
        case "09" : length = 30; break;
        case "10" : length = 31; break;
        case "11" : length = 30; break;
        case "12" : length = 31; break;
    }
    //console.log(length);
    return length;
}
function getinformation () {
    var name = document.getElementById('inputname');
    var date = document.getElementById('inputdate');
    var calendar = document.getElementsByClassName('calendar')[0];
    //console.log(calendar);
    var result = {};
    result.name = name.value;
    result.date = date.value;
    calendar.style.display = "none";
    //console.log(result);
    getresult(result);
}
function getresult (input) {
    clearresult();
    var getinfor = document.getElementsByClassName('getinfor')[0];
     $.ajax({
        type : 'GET',
        dataType : 'jsonp',
        data : {
            name : input.name,
            date : input.date,
            key : '7ab6c717306a4b3e0bc54faa3eb7e884'
        },
        success : function (data){
            console.log(data.result.list.length);
            judgedata.first = 1;
            for(var i = 0; i < data.result.list.length ; i++)
           { 
                       var newname = document.createElement('td');
                       var newlaunch = document.createElement('td');
                       var newreach = document.createElement('td');
                       var newlaunchtime = document.createElement('td');
                       var newreachtime = document.createElement('td');
                       var newstatus = document.createElement('td');
                       var newboarding = document.createElement('td');
                       var newtr = document.createElement('tr');
                       newname.innerHTML = input.name;
                       newlaunch.innerHTML = data.result.list[i].qf;
                       newreach.innerHTML = data.result.list[i].dd;
                       newlaunchtime.innerHTML = data.result.list[i].jhqftime_full;
                       newreachtime.innerHTML = data.result.list[i].jhddtime_full;
                       newstatus.innerHTML = data.result.list[i].state;
                       newboarding.innerHTML = data.result.list[i].djk;
                       newtr.appendChild(newname);
                       newtr.appendChild(newlaunch);
                       newtr.appendChild(newreach);
                       newtr.appendChild(newlaunchtime);
                       newtr.appendChild(newreachtime);
                       newtr.appendChild(newstatus);
                       newtr.appendChild(newboarding);
                       getinfor.appendChild(newtr);}
        },
        url : "http://apis.juhe.cn/plan/snew"
    });
}
function clearresult () {
    if(judgedata.first == 1)
   { 
       var getinfor = document.getElementsByClassName('getinfor')[0];
       var trlist = getinfor.getElementsByTagName('tr');
       var length = trlist.length;
       for(var i = 1; i < length; i++)
           getinfor.removeChild(trlist[1]);
   }
}
