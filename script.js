var storeArr = [];
var inputsub = document.getElementById("inputsubject");
var inputques = document.getElementById("inputquestion");
var store = document.getElementById("store");
var tempInd;

if(localStorage.getItem("item")){
  storeArr = JSON.parse(localStorage.getItem("item"));
  addSubQues();
}

function addItemToLocal(){
  let items = localStorage.getItem("item");
  let newsubj = inputsub.value;
  let newque = inputques.value;
  if(newsubj=="" || newque==""){
    alert("Input Fields Can't be Empty");
  }
  else{
    if(items==null){
      storeArr=[];
    }
    else{
      storeArr=JSON.parse(items);
    }
    let obj = {};
    obj.subject = newsubj;
    obj.question = newque;
    storeArr.push(obj);
    localStorage.setItem("item", JSON.stringify(storeArr));
    addSubQues();
  }
}

function addSubQues(){
  store.innerHTML=" ";
  storeArr.forEach(function(item,index){
    store.innerHTML += `
    <div id="${index}" class="gayeb" onclick="displayResQues(this.id)">
       <div id="storediv"> <b> ${item.subject} </b></div>
       <span id="storespan"> ${item.question} </span>
       <hr>
    </div>
    `;
  })
}

//-----------------------------------------------------------------------------------------------------------

var resListSTore = document.getElementById('resList');

function displayResQues(index){
  document.getElementById("storedivSub").innerHTML=storeArr[index].subject;
  document.getElementById("storespanQues").innerHTML=storeArr[index].question;
  document.getElementById("resList").innerHTML = "";
  document.getElementById("rightInner").style.display = "none";
  document.getElementById("QuesAndResContainer").style.display = "block";
  document.getElementById("resList").style.display = "block";
  tempInd = index;
    var test2 = Object.keys(storeArr[tempInd]);
    var test3 = Object.values(storeArr[tempInd]);
    for (i in test2) {
        if (test2[i] != "subject" && test2[i] != "question") {
            resListSTore.innerHTML=" ";
            resListSTore.innerHTML=`
              <div id="storediv"> 
                  <b>${test2[i]}  </b>
              </div>
              <span id="storespan"> ${test3[i]} </span>
            `
        }
    }
}

function submitResponse() {
    var inputname = document.getElementById("inputname").value;
    var  inputcomment= document.getElementById("inputcomment").value;
    storeArr[tempInd][inputname] = inputcomment;
    //console.log(obj);
    localStorage.setItem("item", JSON.stringify(storeArr));

    resListSTore.innerHTML=" ";
    resListSTore.innerHTML=`
    <div id="resDiv">
      <div id="storediv"> <b> ${inputname}  </b>
      </div>
      <span id="storespan"> ${inputcomment}</span>
    </div>
    `
}
function delet(){
  storeArr.splice(tempInd, 1);
  addSubQues();
  newQuesForm()
  localStorage.setItem("item", JSON.stringify(storeArr));
}

function newQuesForm(){
  if (localStorage.getItem("item") == "[]") {
    document.getElementById("store").innerHTML = "";
  }
  document.getElementById("inputquestion").value = '';
  document.getElementById("inputsubject").value = '';
  document.getElementById("rightInner").style.display = "block";
  document.getElementById("QuesAndResContainer").style.display = "none";
  document.getElementById("resList").style.display = "none";
}


var search = document.getElementById('search');
search.addEventListener("input",function (){
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName('gayeb');
  Array.from(noteCards).forEach(function (element) {

    let cardTitle = element.getElementsByTagName("div")[0].innerText;
    
    var str = cardTitle;
    str = str.toLowerCase();
    if (str.includes(inputVal)) {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
  });
});
