//convert copy element to check svg check
const copied = (content,id) =>{
    if(id.indexOf("3")>0){
        content = hidepassword(content);
    }
    document.getElementById(id).innerHTML=`${content}<i class="fa-check fa solid"></i>`;
}

//to copy the selected content then tick marrk it
const copyContent = (content,id) =>{
    navigator.clipboard.writeText(content).then( () =>{
        copied(content,id);
        // alert("Copied");
        setTimeout(populateSavedPaswordDetails,1000);
    }).catch((err)=>{
        alert("Copy failed")
    })
}

//to hide the password to *
const hidepassword = (password)=>{
    let hiddenpassword="";
    for(let i=0;i<password.length;i++){
        hiddenpassword+="*";
    }
    return hiddenpassword;
}
//to delete a password from local storage
const deletePasswordData =(index) =>{
    let passwordDetails =localStorage.getItem("passwordDetails");
    let passwordData = JSON.parse(passwordDetails);
    passwordData.splice(index,1);    //delete one  data at index
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password deleted successfully.");
    populateSavedPaswordDetails(-1);//reload populate function to refresh the entries
}

//to edit some details in the entry
const editPasswordData = (i,editable) => {
    // console.log(editable)
    if(editable==='true')
        location.reload();
    else
    populateSavedPaswordDetails(i,false);
}

//to update the password data 
const updatePassowrdData = (index) =>{
    const websiteData = document.getElementById(index + "0").innerText;
    const emailData = document.getElementById(index + "1").innerText;
    const usernameData = document.getElementById(index + "2").innerText;
    const passwordDataNew = document.getElementById(index + "3").innerText;
    // console.log(websiteData+emailData+ usernameData+ passwordDataNew);
    let passwordDetails =localStorage.getItem("passwordDetails");
    let passwordData = JSON.parse(passwordDetails);
    passwordData[index].website = websiteData;
    passwordData[index].email = emailData;
    passwordData[index].username = usernameData;
    passwordData[index].password = passwordDataNew;

    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password updated successfully.");
    populateSavedPaswordDetails();
}

//to create the table to show
const populateSavedPaswordDetails = (index=-1, value=true) => {
   let table = document.querySelector("table");   
   let passwordDetails =localStorage.getItem("passwordDetails");
   if(passwordDetails == null ){
        table.innerHTML="No Data Available"
   } else {
        table.innerHTML=`<thead>
            <th style="background-color:lightgrey">Website</th>
            <th style="background-color:lightgrey">Email</th>
            <th style="background-color:lightgrey">Username</th>
            <th style="background-color:lightgrey">Password</th>
            <th style="background-color:lightgrey">Action</th>
        </thead>`
        let passwordData = JSON.parse(passwordDetails);
        let html="";
        let color="whitesmoke";
        let editable=false;

        for (let i = 0; i < passwordData.length; i++) {
            if(i%2==0){
                color="whitesmoke";
            } else {
                color="white";
            }
            let editvalue="Edit";
            if(index==i && !value){
                editable=true;
                editvalue="Cancel";
            } else{
                editable =false;
                editvalue="Edit";
            }
            let row = passwordData[i];
            // console.log(row);
            html+=`
                <tr contentEditable="${editable}" style="background-color:${color}">
                    <td id="${i+"0"}">${row.website} <i onclick="copyContent('${row.website}','${i+"0"}')" class="fa-regular fa-clipboard "></i></td>
                    <td id="${i+"1"}">${row.email} <i onclick="copyContent('${row.email}','${i+"1"}')" class="fa-regular fa-clipboard "></i></td>
                    <td id="${i+"2"}">${row.username} <i onclick="copyContent('${row.username}','${i+"2"}')" class="fa-regular fa-clipboard "></i></td>
                    <td id="${i+"3"}">${hidepassword(row.password)} <i onclick="copyContent('${row.password}', '${i+"3"}')" class="fa-regular fa-clipboard "></i></td>
                    <td>
                        <button class="delete-btn" onclick="deletePasswordData('${i}')">Delete</button>
                        <button class="edit-btn" onclick="editPasswordData('${i}','${editable}')">${editvalue}</button>
                        <button class="update-btn" onclick="updatePassowrdData('${i}')">Update</button>
                    </td>
                </tr>
            `;
        }
        table.innerHTML+= html;
    }
}

populateSavedPaswordDetails();

//on clicking save button form post value and saving them   
document.querySelector(".save-btn").addEventListener("click", (event)=>{
    event.preventDefault();
    let passwordDetails =localStorage.getItem("passwordDetails");
    if(website.value==""|| email.value==""||  username.value==""||  password.value==""){    // checking if there is any empty input
        // console.log("Write all details");
        alert("Input All Details");
    } else  if(passwordDetails==null){            //crreating json obj when there are zero details
        let passwordJSON = [];
        passwordJSON.push(
            {
                website:website.value,
                email: email.value,
                username: username.value,
                password: password.value
        });
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
        alert("Password details added...");
        website.value = "";                                                   //setting input boxes to blank
        email.value = "";
        username.value = ""; 
        password.value = "";
    } else {                                                //adding new password details
        let passwordJSON =JSON.parse(passwordDetails);
        passwordJSON.push(
            {
                website:website.value,
                email: email.value,
                username: username.value,
                password: password.value
        });
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
        alert("Password details added...");
        website.value = "";                                                   //setting input boxes to blank
        email.value = "";
        username.value = ""; 
        password.value = "";
    }
    populateSavedPaswordDetails();
})

