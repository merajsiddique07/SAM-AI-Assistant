
function togglePasswordVisibility(passwordFieldId, eyeIconId) {
  const passwordField = document.getElementById(passwordFieldId);
  const eyeIcon = document.getElementById(eyeIconId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.src = "images/eye-slash.png";
  } else {
    passwordField.type = "password";
    eyeIcon.src = "images/eye.png";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const introPopupBtn = document.getElementById("introPopupBtn");
  const openPopupSign = document.getElementById("open-popupSign");
  const popupContainer = document.getElementById("popup-container");
  const playIntroButton = document.getElementById("play-intro");
  const skipIntroButton = document.getElementById("skip-intro");
  const crossSign = document.getElementById("cross");
  const videoContainer = document.getElementById("video-container");
  const introVideo = document.getElementById("intro-video");
  const signedIn = document.getElementById("open-popupSign");
  const roboIcon = document.getElementById("roboIcon");
  const popupSign = document.getElementById("popup-Sign");
  var form = document.forms["submit-to-google-sheet"];
  const signOutButton = document.getElementById("roboIcon");
  const popupSignOutC = document.getElementById("signOutBtn");
  const yesButton = document.getElementById("yes-btn");
  const noButton = document.getElementById("no-btn");

  let text =
    "Hello, Welcome to AI Assistant ! I'm 'SAM' here to simplify your tasks and make your experience effortless. Click on the Intro button to play an engaging introduction video about the assistant.";

  let index1 = 0;

  function typeEffect() {
    if (index1 < text.length) {
      document.getElementById("typing").innerHTML += text.charAt(index1);
      index1++;
      setTimeout(typeEffect, 80);
    } else {
      setTimeout(() => {
        document.getElementById("typing").innerHTML = "";
        index1 = 0;
        setTimeout(typeEffect, 100);
      }, 2000);
    }
  }

  typeEffect();

  introPopupBtn.addEventListener("click", () => {
    popupContainer.style.display = "flex";
  });

  playIntroButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
    videoContainer.style.display = "flex";
    introVideo.play();
    introVideo.addEventListener("ended", () => {
      videoContainer.style.display = "none";
    });
  });

  skipIntroButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });

  popupContainer.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
      popupContainer.style.display = "none";
    }
  });

  openPopupSign.addEventListener("click", () => {
    popupSign.style.display = "flex";
  });

  crossSign.addEventListener("click", () => {
    popupSign.style.display = "none";
  });

  
  const scriptURL =
  "https://script.google.com/macros/s/AKfycbygQailB8fhdNMIRK-kwIlYiG6IcwqSquR77NQ6v2sNpgoZCD1B9fKshDJgzFPg5ZtN/exec";

form = document.forms["submit-to-google-sheet"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) =>{})
          .catch((error) => console.error("Error!", error.message));

    const userData = {
      Name: form["Name"].value,
      Gender: form["Gender"].value,
      Tel: form["Tel"].value,
      Email: form["Email"].value,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    signedIn.style.display = "none";
    roboIcon.style.display = "flex";
    popupSign.style.display = "none";

    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      if (storedUserData.Gender === "male") {
        text = `Hello Mr. ${storedUserData.Name}. Welcome to AI Assistant ! I'm 'SAM' here to simplify your tasks and make your experience effortless. Click on the Intro button to play an engaging introduction video about the assistant.`;
      } else if (storedUserData.Gender === "female") {
        text = `Hello Mrs. ${storedUserData.Name}. Welcome to AI Assistant ! I'm 'SAM' here to simplify your tasks and make your experience effortless. Click on the Intro button to play an engaging introduction video about the assistant.`;
      } else {
        text = `Hello ${storedUserData.Name}. Welcome to AI Assistant ! I'm 'SAM' here to simplify your tasks and make your experience effortless. Click on the Intro button to play an engaging introduction video about the assistant.`;
      }
    } else {
      console.error("Failed to retrieve user data from localStorage.");
    }
  });

  signOutButton.addEventListener("click", () => {
    popupSignOutC.style.display = "block";
  });

  noButton.addEventListener("click", () => {
    popupSignOutC.style.display = "none";
  });

  yesButton.addEventListener("click", () => {
    localStorage.clear();
    popupSignOutC.style.display = "none";
    roboIcon.style.display = "none";
    signedIn.style.display = "flex";
    window.location.reload();
  });

  const initializeUI = () => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));


    if (storedUserData) {
      signedIn.style.display = "none";
      roboIcon.style.display = "flex";
      if (storedUserData.Gender === "male") {
        text = `Hello Mr. ${storedUserData.Name}. Welcome to AI Assistant ! I'm 'SAM' here to simplify your tasks and make your experience effortless. Click on the Intro button to play an engaging introduction video about the assistant.`;
      } else if (storedUserData.Gender === "female") {
        text = `Hello Mrs. ${storedUserData.Name}. Welcome to AI Assistant ! I'm 'SAM' here to simplify your tasks and make your experience effortless. Click on the Intro button to play an engaging introduction video about the assistant.`;
      } else {
        text = `Hello ${storedUserData.Name}. Welcome to AI Assistant ! I'm 'SAM' here to simplify your tasks and make your experience effortless. Click on the Intro button to play an engaging introduction video about the assistant.`;
      }
    }
  };
  initializeUI();
});

// function next(){
//       window.location.href = "index2.html?Uname=" 
//     + encodeURIComponent(UserData.UName) + "&Ugender=" + encodeURIComponent(UserData.UGender)
//     + "&Utel=" + encodeURIComponent(UserData.UTel) + "&Uemail=" + encodeURIComponent(UserData.UEmail);
//   }
