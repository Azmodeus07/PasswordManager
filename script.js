const hidepassword = (password)=>{
    let hiddenpassword="";
    for(let i=0;i<password.length;i++){
        hiddenpassword+="*";
    }
    return hiddenpassword;
}

const deletePasswordData =(index) =>{
    let passwordDetails =localStorage.getItem("passwordDetails");
    let passwordData = JSON.parse(passwordDetails);
    passwordData.splice(index,1);    //delete one  data at index
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password deleted successfully.");
    populateSavedPaswordDetails();//reload populate function to refresh the entries
}


const populateSavedPaswordDetails = () => {
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

        for (let i = 0; i < passwordData.length; i++) {
            if(i%2==0){
                color="whitesmoke";
            } else {
                color="white";
            }
            let row = passwordData[i];
            html+=`
                <tr style="background-color:${color}">
                    <td>${row.website}</td>
                    <td>${row.email}</td>
                    <td>${row.username}</td>
                    <td>${hidepassword(row.password)}</td>
                    <td><button class="delete-btn" onclick="deletePasswordData(${i})">Delete</button></td>
                </tr>
            `;
        }
        table.innerHTML+= html;
    }
}

populateSavedPaswordDetails();

document.querySelector(".btn").addEventListener("click", (event)=>{
    event.preventDefault(); 
    // console.log("Website: ", website.value)
    // console.log("Email: ", email.value)
    // console.log("username",username.value)
    // console.log("password: ", password.value)

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

