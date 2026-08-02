/* ===========================================
   CONFIG
=========================================== */

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwagv6_F_7YwOR4Ngjn18VSxfR_cUs9ia7XVVUMyD12LomIl83SYfTwMTIG66Dmjz_j/exec";

const COMMUNITY_URL =
"https://chat.whatsapp.com/JeZFFpBhX796LDpMOkqXhJ";

/* ===========================================
   ELEMENTS
=========================================== */

const form = document.getElementById("leadForm");

const submitButton =
form.querySelector("button");

const eventDate =
document.getElementById("eventDate");

const eventTime =
document.getElementById("eventTime");

/* ===========================================
   LOAD WEBINAR DATE & TIME
=========================================== */

async function loadWebinar(){

try{

const response =
await fetch(
SCRIPT_URL +
"?action=webinar&t=" +
Date.now()
);

const data =
await response.json();

if(data.status==="success"){

eventDate.textContent =
data.webinar_date;

eventTime.textContent =
data.webinar_time;

}

}catch(error){

console.log(
"Webinar Load Error",
error
);

eventDate.textContent =
"Next Session";

eventTime.textContent =
"5:00 PM";

}

}

/* ===========================================
   INIT
=========================================== */

loadWebinar();
