//check if there is a color option in the LocalStorage
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main--color",
    localStorage.getItem("color_option")
  );
  //check for active class

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //add active class with data-color === local storage

    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

//Toggle Spin Class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin for Rotation on self
  this.classList.toggle("fa-spin");
  // Toggle Class open on main Settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

//swicth colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    // store color on LocalStorage
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove active class from all children
    handleActive(e);
  });
});

//swicth Random Background options
// random background option
let backgroundoption = true;

// variable to control Interval

let backgroundInterval;
// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
// check if random background item is nor empty
if (backgroundLocalItem !== null) {
  //type of true is string not boolen
  backgroundoption = true;
} else {
  backgroundoption = false;
  clearInterval(backgroundInterval);
}

//remove active class from all spans
document.querySelectorAll(".random-backgrounds span").forEach((element) => {
  element.classList.remove("active");
});
if (backgroundLocalItem === "true") {
  document.querySelector(".random-backgrounds .yes").classList.add("active");
} else {
  document.querySelector(".random-backgrounds .no").classList.add("active");
}
// function for randomized imgs
function randomImgs() {
  if (backgroundoption === true) {
    backgroundInterval = setInterval(() => {
      let landingPage = document.querySelector(".landing-page");
      const baseURL = "imgs/";
      const randomNum = Math.floor(Math.random() * 5) + 1; // generates a random number between 1 and 5
      const imageURL = baseURL + "0" + randomNum + ".jpg"; // generates a URL string like "https://example.com/images/3.jpg"
      landingPage.style.backgroundImage = 'url(" ' + imageURL + '")';
    }, 1000);
  }
}
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
//loop on all spans
randomBackEl.forEach((el) => {
  //click on every span
  el.addEventListener("click", (span) => {
    handleActive(span);
    if (span.target.dataset.background === "yes") {
      backgroundoption = true;
      randomImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundoption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills Offset top
  let skillsOffSetTop = ourSkills.offsetTop;

  //skills outer hieght
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  //window scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// const skillProgress = document.querySelectorAll(".skill-progress span");

// skillProgress.forEach((progress) => {
//   progress.addEventListener("mouseover", (e) => {
//     e.target.textContent = e.target.dataset.progress;
//     e.target.addEventListener("mouseout", (e) => {
//       progress.textContent = "";
//     });
//   });
// });

//  // create pop up with image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create an overlay element
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    //append ovelay to the body
    document.body.appendChild(overlay);

    // create popup box

    let popupBox = document.createElement("div");

    //add class to the popup
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // create Heading
      let imgHeading = document.createElement("h3");
      // create texte for heading
      let imgText = document.createTextNode(img.alt);

      // append text to heading
      imgHeading.appendChild(imgText);
      // append the heading to the pop box
      popupBox.appendChild(imgHeading);
    }

    // create the Image

    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImage);
    //Append the popup box to the body
    document.body.appendChild(popupBox);

    //creaete a close span
    let closeButton = document.createElement("span");
    // create the close button text
    let closeButtonText = document.createTextNode("X");
    // append text to close bytton
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";
    // add close button to pop box

    popupBox.appendChild(closeButton);
  });
});
// close popup

document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollIntoSection(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollIntoSection(allBullets);
scrollIntoSection(allLinks);

// handle active class on self
function handleActive(ev) {
  // remove active calss from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // add active class on self
  ev.target.classList.add("active");
}
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletSpan.forEach(function (span) {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});
//reset button
document.querySelector(".reset-options").onclick = function () {
  //localStorage.clear(); or
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  window.location.reload();
};
// toggle menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
  e.stopPropagation();
};
// click anywhere to close menu toggle
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});
// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
// dynamic footer year
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;
