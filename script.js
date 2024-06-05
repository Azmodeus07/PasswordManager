//convert copy element to check svg
const copied = () =>{
    document.querySelector(".copy").classList.remove('fa-regular');
    document.querySelector(".copy").classList.remove('fa-clipboard');
    document.querySelector(".copy").classList.add('fa-solid');
    document.querySelector(".copy").classList.add('fa-check');
}

//to copy the selected content then tick marrk it
const copyContent = (content) =>{
    navigator.clipboard.writeText(content).then( () =>{
        copied();
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
    console.log(editable)
    if(editable==='true')
        location.reload();
    else
    populateSavedPaswordDetails(i,false);
}

//to update the password data 
const updatePassowrdData = (index) =>{
    let passwordDetails =localStorage.getItem("passwordDetails");
    if(passwordDetails!= null){
        let passwordData = JSON.parse(passwordDetails);
        let row = passwordData[index];
        console.log(row);
    }

    
    populateSavedPaswordDetails();
}

//to create the table to show
const populateSavedPaswordDetails = (index, value) => {
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
                    <td >${row.website} <i onclick="copyContent('${row.website}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td>${row.email} <i onclick="copyContent('${row.email}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td>${row.username} <i onclick="copyContent('${row.username}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td  >${hidepassword(row.password)} <i onclick="copyContent('${row.password}')" class="fa-regular fa-clipboard copy"></i></td>
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

document.querySelector(".save-btn").addEventListener("click", (event)=>{
    event.preventDefault();
    let passwordDetails =localStorage.getItem("passwordDetails");
    if(passwordDetails==null){
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
    } else {
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
    }
    website.value = "";
    email.value = "";
    username.value = ""; 
    password.value = "";
    populateSavedPaswordDetails();
})

