var judgedata = {
    first : 1
}
function showbegin () {
    var begin = document.getElementById('popularbegin');
    var input  = document.getElementById('inputbegin');
    var td = begin.getElementsByTagName('td');
    begin.style.display = "block";
    for(var i = 0;i < td.length;i++){
        td[i].onclick = (function(i){
            return function(){
                   input.value = td[i].innerHTML;
                   //console.log(input.value);
                   setTimeout(function(){
                     begin.style.display = "none";
                   },100);
            }
        })(i);
    }
}
function disappearbegin () {
     var begin = document.getElementById('popularbegin');
     begin.style.display = "none";
}
function showend () {
    var end = document.getElementById('popularend');
    var input  = document.getElementById('inputend');
    var td = end.getElementsByTagName('td');
    end.style.display = "block";
    for(var i = 0;i < td.length;i++){
        td[i].onclick = (function(i){
            return function(){
                   input.value = td[i].innerHTML;
                   //console.log(input.value);
                   setTimeout(function(){
                     end.style.display = "none";
                   },100);
            }
        })(i);
    }
}
function disappearend () {
   var end = document.getElementById('popularend');
   end.style.display = "none";
}
function getinformation() {
   var begin = document.getElementById('inputbegin');
   var end = document.getElementById('inputend');
   var high = document.getElementById('high');
   var nohigh = document.getElementById('nohigh');
   var input = {};
   input.start = begin.value;
   input.end = end.value;
   if(high.checked)
    input.ishigh = 1;
   else
    input.ishigh = 0;
   findtrain(input);
}
function findtrain (input) {
    clearinfor();
    var infor = document.getElementsByClassName('getinfor')[0];
    $.ajax({
        type : 'GET',
        dataType : 'jsonp',
        data : {
            start : input.start,
            end : input.end,
            ishigh : input.ishigh,
            appkey : ' 918bb5736e29e7bd'
        },
        success : function (data){
            console.log(data.result);
            //console.log(data.result[0]);
            //console.log(data.result[1]);
            for(var i = 0;i < data.result.length; i++){
                var station = document.createElement('td');
                var endstation = document.createElement('td');
                var trainno = document.createElement('td');
                var type = document.createElement('td');
                var arrivaltime = document.createElement('td');
                var departuretime = document.createElement('td');
                var costtime = document.createElement('td');
                var newtr = document.createElement('tr');
                station.innerHTML = data.result[i].station;
                endstation.innerHTML = data.result[i].endstation;
                trainno.innerHTML = data.result[i].trainno;
                type.innerHTML = data.result[i].type;
                arrivaltime.innerHTML = data.result[i].arrivaltime;
                departuretime.innerHTML = data.result[i].departuretime;
                costtime.innerHTML = data.result[i].costtime;
                newtr.appendChild(station);
                newtr.appendChild(endstation);
                newtr.appendChild(trainno);
                newtr.appendChild(type);
                newtr.appendChild(arrivaltime);
                newtr.appendChild(departuretime);
                newtr.appendChild(costtime);
                //console.log(newtr);
                infor.appendChild(newtr);
                //console.log(i);
            }
            judgedata.first = 0;
        },
        url : "http://api.jisuapi.com/train/station2s"
     });
}
function clearinfor () {
    if(judgedata.first == 0){ 
       var getinfor = document.getElementsByClassName('getinfor')[0];
       var tr = getinfor.getElementsByTagName('tr');
       var length = tr.length;
       //console.log(tr);
       for(var i = 1;i < length;i++){
           getinfor.removeChild(tr[1]);
       }
       //alert(123);
   }
}