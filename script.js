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

/* ===========================================
   PHONE VALIDATION
=========================================== */

function isValidPhone(phone){

return /^[6-9]\d{9}$/.test(phone);

}

/* ===========================================
   SUBMIT FORM
=========================================== */

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const formData=new FormData(form);

const name=formData.get("name").trim();

const phone=formData.get("phone").trim();

if(name.length<3){

alert("Please enter your full name.");

return;

}

if(!isValidPhone(phone)){

alert("Please enter a valid WhatsApp number.");

return;

}

/* Button Loading */

submitButton.disabled=true;

submitButton.innerHTML="Submitting...";

/* Save Current Page */

formData.append(

"page_url",

window.location.href

);

/* UTM Parameters */

const params=new URLSearchParams(window.location.search);

formData.append(

"utm_source",

params.get("utm_source")||""

);

formData.append(

"utm_medium",

params.get("utm_medium")||""

);

formData.append(

"utm_campaign",

params.get("utm_campaign")||""

);

formData.append(

"utm_content",

params.get("utm_content")||""

);

formData.append(

"utm_term",

params.get("utm_term")||""

);

try{

await fetch(

SCRIPT_URL,

{

method:"POST",

body:formData,

mode:"no-cors"

}

);

/* Redirect after 100ms */

if (typeof fbq !== "undefined") {
    fbq("track", "Lead");
}

window.location.href = COMMUNITY_URL;
}catch(error){

console.log(error);

alert(

"Something went wrong. Please try again."

);

submitButton.disabled=false;

submitButton.innerHTML="JOIN FREE LIVE SESSION →";

}

});

/* ===========================================
   PART 3C
   UX + PRODUCTION IMPROVEMENTS
=========================================== */

// Prevent multiple rapid submissions
let isSubmitting = false;

form.addEventListener("submit", (e) => {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    isSubmitting = true;

    setTimeout(() => {
        isSubmitting = false;
    }, 3000);
});

/* Auto focus on Name */
window.addEventListener("load", () => {

    const nameInput =
    document.querySelector('input[name="name"]');

    if(nameInput){

        nameInput.focus();

    }

});

/* Online / Offline Detection */

window.addEventListener("offline",()=>{

alert(
"Internet connection lost. Please check your network."
);

});

window.addEventListener("online",()=>{

console.log("Internet Connected");

});

/* Prevent accidental form resubmit */

window.history.replaceState(
{},
document.title,
window.location.pathname
);

/* Console Branding */

console.log(
"%cFREE TELUGU LIVE SESSION",
"color:#25D366;font-size:18px;font-weight:bold;"
);

console.log(
"Landing Page Loaded Successfully"
);
