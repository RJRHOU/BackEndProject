
//created a submit button where a pop up will display a message and data will clear upon clicking "Ok"

document.getElementById("button").addEventListener("click", myFunction)

function myFunction() {
  let text = "Your Message Is Under Review!!!";
  if (confirm(text) == true) {
    text = "Thank You!!";
    document.getElementById("data1").value = "";
    document.getElementById("data2").value = "";   
} else {
    text = "";
  } 
  document.getElementById("pop up message").innerHTML = text;
} 