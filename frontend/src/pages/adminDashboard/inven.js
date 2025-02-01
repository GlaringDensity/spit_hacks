var mnu = document.getElementById("mnu");
var mstate = false;

function slideMenu() {
  mstate = !mstate;
  if(mstate){
    mnu.style.left = "0px";
    mnu.style.boxShadow = "100px 0px 300px 0px rgba(0,0,0,0.3)";
  }
  else{
    mnu.style.left = "-250px";
    mnu.style.boxShadow = "0px 0px 00px 0px rgba(0,0,0,0.0)";
  }
}