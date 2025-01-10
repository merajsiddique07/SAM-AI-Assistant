const startButton = document.getElementById("startListening");
const statusDisplay = document.getElementById("status");
const question = document.getElementById("question");
const micButton = document.getElementById("startListening");
const reloadP =document.getElementById("reloadPage");
const search = new Audio('images/search.mp3');
const end = new Audio('images/end.mp3');
var song = new Audio('images/song.mp3');
var command ="";
var apiResponse ="";

const API_Key = "AIzaSyBT3tRLHdvhs5Bcw80QipKMyjX19o5viZg";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_Key}`;

const generateAPIResponse = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: command+" in short" }],
          },
        ],
      }),
    });

    const data = await response.json();
    apiResponse = data?.candidates[0].content.parts[0].text;
    speak(apiResponse);
   // console.log(apiResponse);
  } catch (error) {
    console.log(error);
  }
};
var hours = 0;
var minutes = 0;
var amPm = '';
var num = 1;

const urlParams = new URLSearchParams(window.location.search);
const UserData = {
  Name: urlParams.get("Uname"),
  Gender: urlParams.get("Ugender"),
  Tel: urlParams.get("Utel"),
  Email: urlParams.get("Uemail"),
}

function updateDateTime() {
  const now = new Date();

  hours = now.getHours();
  minutes = now.getMinutes();
  const seconds = now.getSeconds();
  amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const time = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${amPm}`;

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const date = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  document.getElementById(
    "dateTime"
  ).textContent = `${time} , ${date}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

if (false) {

  if ((((hours >= 6) && (amPm == "AM")) && (minutes >= 0 && minutes <= 59)) && hours < 12) {
    const welcome = new SpeechSynthesisUtterance(`Hello, Good Morning, ${UserData.Name} I am SAM. How can I help you.`);
    window.speechSynthesis.speak(welcome);

  }

  else if ((((hours >= 12) && (amPm == "PM")) && (minutes >= 0 && minutes <= 59)) && hours < 4) {
    const welcome = new SpeechSynthesisUtterance(`Hello,Good Afternoon, ${UserData.Name} I am SAM. How can I help you.`);
    window.speechSynthesis.speak(welcome);

  }
  else if ((((hours >= 4) && (amPm == "PM")) && (minutes >= 0 && minutes <= 59)) && hours < 9) {
    const welcome = new SpeechSynthesisUtterance(`Hello, Good Evening, ${UserData.Name} I am SAM. How can I help you.`);
    window.speechSynthesis.speak(welcome);

  }
  else {
    const welcome = new SpeechSynthesisUtterance(`Hello,Good Night, ${UserData.Name} I am SAM. How can I help you.`);
    window.speechSynthesis.speak(welcome);
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

startButton.addEventListener("click", () => {
  search.play();
  reloadP.style.visibility ='hidden'
  statusDisplay.textContent = "Listening...";
  recognition.start();
  micButton.style.background = 'orange';
  startSpeaking();
});

function startSpeaking() {
  micButton.classList.add("speaking");
}

function stopSpeaking() {
  micButton.classList.remove("speaking");
}


recognition.onresult = (event) => {
  stopSpeaking();
  end.play();
  micButton.style.background = 'white';
  statusDisplay.innerHTML = "";
  command = Array.from(event.results)
  .map((result) => result[0].transcript)
  .join("");
question.textContent = command.trim();
  handleCommand(command);
};

function handleCommand(command) {

  if (command.includes("Hey") || command.includes("Hay") || command.includes("What is your name") || command.includes("Your name.") || command.includes("Your Intro") || command.includes("Who are you") || command.includes("Hello")) {
    speak(`Hello!, I am SAM How can I assist you today?`);
  }
  else if (command.includes("Mobile number") || command.includes("What is my phone number") || command.includes("My mobile number") || command.includes("What is my mobile number") || command.includes("Contact number") || command.includes("My contact number.")) {
    if(UserData.Name ===null){
      speak("I don't have your contact, Please register while starting the app.");
    }
    else{
    speak(`your phone number is,${UserData.Tel}`);
    }
  }
  else if (command.includes("My name") || command.includes("Who I am") || command.includes("Name please") || command.includes("What is my name") || command.includes("What's my name")) {
    if(UserData.Name ===null){
      speak("I don't have your name, Please register while starting the app.");
    }
   else{ 
    speak(`your are ,${UserData.Name}`);
   }
  }
  else if (command.includes("Open Facebook")) {
    openApp("Facebook", "https://www.facebook.com");
  } else if (command.includes("Open Twitter.")) {
    openApp("Twitter", "https://www.twitter.com");
  } else if (command.includes("Open Instagram")) {  
    openApp("Instagram", "https://www.instagram.com");
  } else if (command.includes("Open YouTube")) {
    openApp("YouTube", "https://www.youtube.com");
  } else if (command.includes("Open Email")  || command.includes("Gmail") ){
    openApp("Gmail", "https://mail.google.com/mail/u/0/");
  }
   else {
  
   generateAPIResponse();

  }
}

function openApp(appName, url) {
  speak(`Opening ${appName}`);
  window.open(url, "_blank");
}

function searchGoogle(query) {
  speak(`Searching for ${query}`);
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(searchUrl, "_blank");
  location.reload();
}

function speak(message) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  synth.speak(utterance);
}

recognition.onerror = (event) => {
  end.play();
  statusDisplay.textContent = `Didn't get that.`;
  reloadP.style.visibility = 'visible';
  stopSpeaking();
  micButton.style.background = 'white';
};

function reloadPage(){
  location.reload();
  recognition.addEventListener('end', () => {
    console.log("Speech recognition ended");
});

window.addEventListener('unload', () => {
    recognition.abort(); 
    window.speechSynthesis.cancel();
});

}

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {

  const textBlob = new Blob([`Q: ${command} \n\nAns: ${apiResponse}`], { type: "text/plain" });

  const fileURL = URL.createObjectURL(textBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = fileURL;
  downloadLink.download = "SamFile.txt";
  downloadLink.click();

  URL.revokeObjectURL(fileURL);
});

const images = ["images/ai2.gif", "images/ai1.gif", "images/ai3.gif"];
let index = 0;

function changeImage() {
  document.getElementById("slideshow").src = images[index];
  index = (index + 1) % images.length;
  setTimeout(changeImage, 10000);
}
changeImage();

const text = "can I help you !";
let index1 = 0;
function typeEffect() {
  if (index1 < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(index1);
    index1++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      document.getElementById("typing").innerHTML = "";
      index1 = 0;
      setTimeout(typeEffect, 100);
    }, 2000);
  }
}
typeEffect();