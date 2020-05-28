var btnContainer = document.getElementById("myDIV");
// Get all buttons with class="btn" inside the container
var lis = btnContainer.getElementsByClassName("page-item");
// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("click", function() {
        var current = btnContainer.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
};

// var navHeaderContainer = document.getElementById("navbarSupportedContent");
// // Get all buttons with class="btn" inside the container
// var navItemList = navHeaderContainer.getElementsByClassName("nav-item");
// var aRefList = navHeaderContainer.getElementsByClassName("nav-link");
// // Loop through the buttons and add the active class to the current/clicked button
// for (var i = 0; i < navItemList.length; i++) {
//     navItemList[i].addEventListener("click", function() {
//         var current = navHeaderContainer.getElementsByClassName("active");
//         current[0].className = current[0].className.replace(" active", "");
//         this.className += " active";
//     });
//     aRefList[i].addEventListener("click", function() {
//       var current = navHeaderContainer.getElementsByClassName("active");
//       current[0].className = current[0].className.replace(" active", "");
//       this.className += " active";
//   });
// };