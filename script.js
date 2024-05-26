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
            <th>Website</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
        </thead>`
        let passwordData = JSON.parse(passwordDetails);
        let html="";

        for (let i = 0; i < passwordData.length; i++) {
            let row = passwordData[i];
            html+=`
                <tr>
                    <td>${row.website}</td>
                    <td>${row.email}</td>
                    <td>${row.username}</td>
                    <td>${row.password}</td>
                    <td><button onclick="deletePasswordData(${i})">Delete</button></td>
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

