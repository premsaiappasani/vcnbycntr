let btn=document.getElementById("btn1");
let input=document.getElementById("pin-input");
let pincode=000000;
var field = document.querySelector('#today');
var date = new Date();
let div = document.getElementById("mt");
document.getElementById("day").value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);
input.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
    e.preventDefault();
    $("#buttonSrch").click(); 
    return true;
    }
});
input.addEventListener("keyup",function(e){
    if(e.key==="Enter"){
        div.innerHTML="<p>Loading...</p>";
        fn1();
    }
});
btn.addEventListener("click",function(){
    div.innerHTML="<p>Loading...</p>";
    fn1();
});
function fn1(){
    document.getElementById("load").className="spinner-grow";
    let pincode=document.getElementById("pin-input").value;
    let today=document.getElementById("day").value;
    let date = today[8]+today[9]+today[7]+today[5]+today[6]+today[4]+today[0]+today[1]+today[2]+today[3];
    console.log(date);
    const req = new XMLHttpRequest();
    req.onload = function () {
        document.getElementById("load").className="no";
        console.log("DONE LOADING!!");
        const txt = JSON.parse(this.responseText);
        let obj={};
        try{obj=txt.centers.sessions[0];}
        catch(err){
            console.log(err);
            div.innerHTML="<p>No information is provided for this center. Visit the center or check <a href='https://www.cowin.gov.in/'>Cowin Website</a> for more information.</p>";
            return;
        }
        var thead=document.getElementById('thead');
        var tbody = document.getElementById('tbody');
        try{if(obj.length==0){
            console.log("fetch-failed");
            alert("No slots! Try with another date or Pincode");
            return;
        }
        div.innerHTML=`<p><span>Vaccines Available: ${obj.available_capacity.toString()} </span></p><p></p><span> Dose1: ${obj.available_capacity_dose1} </span><span>Dose2: ${obj.available_capacity_dose2}</span></p>`;
        thead.innerHTML="<tr><th>S.no</th><th>Time-slot</th></tr>";
        tbody.innerHTML="";
        for (var i = 0; i < obj.slots.length; i++) {
            var tr = "<tr>";
            tr += "<td>" + (i+1).toString()+". </td><td>"+ obj.slots[i] +"</td></tr>";
            tbody.innerHTML += tr;
        }}
        catch(err){
            console.log(err);
            alert("Unable to fetch data! Invalid Center-Id!");
        }
    };
    req.onerror = function () {
        console.log("ERROR");
        console.log(this);
    };
    req.open(
       "GET",
       `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=${pincode}&date=${date}`
    );
    req.send();
    div.innerText="";
}