var cSource = document.getElementsByName('source');
for(i=0; i<cSource.length; i++){
    cSource[i].required = true;
}

var form = document.getElementById("myFormFeedback");
form.addEventListener("submit", submitted);
 
document.getElementById("whyDiv").style.display='none';
document.getElementById("excellent").style.display='none';
document.getElementById("verygood").style.display='none';
document.getElementById("good").style.display='none';
document.getElementById("bad").style.display='none';
document.getElementById("verybad").style.display='none';
document.getElementById("CommentsToWhyyouLikedit").style.display='none';

var validFirstName = false;
var validLastName = false;
var validEmail = false;
var validPhone = false;
var validZipCode = false;

var regExName = /^[a-z A-Z]+$/;
var regExPhone = /^\d{3}-\d{3}-\d{4}$/;
var regExEmailId = /^([a-z\d\.]+@northeastern.edu)$/; 
var regExZipCode = /^\d{5}$/;

var firstName = document.getElementById("firstName");
firstName.addEventListener("input", validation);
var lastName = document.getElementById("lastName");
lastName.addEventListener("input", validation);
var emailId = document.getElementById("emailId");
emailId.addEventListener("input", validation);
var phoneNumber = document.getElementById("phoneNumber");
phoneNumber.addEventListener("input", validation);
var zipcode = document.getElementById("zipcode");
zipcode.addEventListener("input", validation);

function validation(e){
    var value = e.target.value;
    var typeId= this.id;
    var em = "err_" + typeId;

    switch(typeId){
            case "firstName":
                if(!value.trim().match(regExName)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validFirstName = false;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validFirstName = true;
                }
                break;
            case "lastName":
                if(!value.trim().match(regExName)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validLastName = false;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validLastName = true;
                }
                break;
            case "emailId":
                if(!value.trim().match(regExEmailId)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validEmail = false;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validEmail = true;
                }
                break;
            case "phoneNumber":
                if(!value.trim().match(regExPhone)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validPhone = false;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validPhone = true;
                }
                break;
            case "zipcode":
                if(!value.trim().match(regExZipCode)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validZipCode = false;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validZipCode = true;
                }
                break;
        }
}

function dropDown(value){
    var checkBoxarray = document.getElementsByName('reason');
    for(i=0; i<checkBoxarray.length; i++)
    checkBoxarray[i].checked = false;

    document.getElementById("whyDiv").style.display='none';
    document.getElementById("excellent").style.display='none';
    document.getElementById("verygood").style.display='none';
    document.getElementById("good").style.display='none';
    document.getElementById("bad").style.display='none';
    document.getElementById("verybad").style.display='none';
    document.getElementById("CommentsToWhyyouLikedit").style.display='none';

    if(value != 'select' && value != ''){
        document.getElementById("whyDiv").style.display='';
        document.getElementById(value).style.display='';
    }
}

function checkboxClicked(checkBox){
    
    if(checkBox.checked){
        document.getElementById("CommentsToWhyyouLikedit").style.display='';
        document.getElementById("reasonForWhy").required = true;
    }
    else{
        document.getElementById("CommentsToWhyyouLikedit").style.display='none';
        document.getElementById("reasonForWhy").required = false;
        document.getElementById("reasonForWhy").value = "";
    }
}


function submitted(f){
    f.preventDefault();
    var form = document.getElementById("myFormFeedback");
     
    if (validFirstName && validLastName && validEmail && validPhone && validZipCode){	
        var formData = new FormData(form);
        var feedback = document.getElementById("feedback").value === "select"?"":document.getElementById("feedback").value;

        switch(feedback){
            case "excellent":
                feedback = "Excellent";
                break;
            case "verygood":
                feedback = "Very Good";
                break;
            case "good":
                feedback = "Good";
                break;   
            case "bad":
                feedback = "Bad";
                break;    
            case "verybad":
                feedback = "Very Bad";
                break;   
            default:
                feedback = "";
                break;
        }

        var sourcevar = '';
        for(i=0; i<cSource.length; i++){
            if(cSource[i].checked){
                sourcevar = sourcevar + cSource[i].value + ', ' ;
            }
        }

        sourcevar = sourcevar.slice(0, -2);
        formData.set('source', sourcevar);
        formData.set('feedback', feedback);

        localStorage.setItem("formData", JSON.stringify(Object.fromEntries(formData)));
        
        var resetbtn = document.querySelector("#resetForm");
        resetbtn.click();
        dropDown('');
        addNewRow();
    }
    else{
        alert("Some fields require your attention.");
    }
}

function howDidyouHearCheckBox(cb){
    var sources = document.getElementsByName('source');
    
    if(cb.checked){
        for(i=0; i<sources.length; i++){
            if(sources[i].required)
                sources[i].required = false;
        }
    }
    else{
        var flag = false;
        for(i=0; i<sources.length; i++){
            if(sources[i].checked){
                flag = true;
            }
        }
        if(!flag){
            for(i=0; i<sources.length; i++){
                sources[i].required = true;
            }
        }
    }
}

function addNewRow(){
    var formData = JSON.parse(localStorage.getItem("formData"));
    var tbodyRef = document.getElementsByTagName("tbody")[0];
    

    // Creating a new row 
    var tdRowNode = document.createElement("tr");
  
    var trTitleCell = document.createElement("td");
    trTitleCell.innerHTML = formData.title;

    var trFirstNAme = document.createElement("td");
    trFirstNAme.innerHTML = formData.firstName;

    var trLastName = document.createElement("td");
    trLastName.innerHTML = formData.lastName;

    var trEmailId = document.createElement("td");
    trEmailId.innerHTML = formData.emailId;

    var trPhoneNo = document.createElement("td");
    trPhoneNo.innerHTML = formData.phoneNumber;

    var trStreetAdd1 = document.createElement("td");
    trStreetAdd1.innerHTML = formData.streetAddress1;

    var trStreetAdd2 = document.createElement("td");
    trStreetAdd2.innerHTML = formData.streetAddress2;

    var trCity = document.createElement("td");
    trCity.innerHTML = formData.city;

    var trState = document.createElement("td");
    trState.innerHTML = formData.state;

    var trZipCode = document.createElement("td");
    trZipCode.innerHTML = formData.zipcode;

    var trSource = document.createElement("td");
    trSource.innerHTML = formData.source;

    var trComment = document.createElement("td");
    trComment.innerHTML = formData.text;

    var trFeedback = document.createElement("td");
    trFeedback.innerHTML = formData.feedback;

    var trReason = document.createElement("td");
    trReason.innerHTML = formData.reason == undefined ? '': formData.reason;

    var trReasonForWhy = document.createElement("td");
    trReasonForWhy.innerHTML = formData.reasonForWhy;

    tdRowNode.appendChild(trTitleCell);
    tdRowNode.appendChild(trFirstNAme);
    tdRowNode.appendChild(trLastName);
    tdRowNode.appendChild(trEmailId);
    tdRowNode.appendChild(trPhoneNo);
    tdRowNode.appendChild(trStreetAdd1);
    tdRowNode.appendChild(trStreetAdd2);
    tdRowNode.appendChild(trCity);
    tdRowNode.appendChild(trState);
    tdRowNode.appendChild(trZipCode);
    tdRowNode.appendChild(trSource);
    tdRowNode.appendChild(trComment);
    tdRowNode.appendChild(trFeedback);
    tdRowNode.appendChild(trReason);
    tdRowNode.appendChild(trReasonForWhy);

    tbodyRef.appendChild(tdRowNode);
}