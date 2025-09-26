function fetchUserData(userId){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const fakeData={
                id:userId,
                name:"niraj Rampal",
                email:"nirajrampal93@gmail.com"
            }
            const success=true;
        if (success){
            resolve(fakeData);
        }
        else{
            reject("failed to fetch the data")
        }
        },2000)
        
    });
}
//step 2 Async function to handle the process 
async function displayUser(userId){
    console.log("Loading user data");

    try {
        const user= await fetchUserData(userId)//wait for the promise to resolve
        console.log("user data received:");
        console.log(user);
    } catch (error) {
        console.log("error",error);
    }
    console.log("done");
}

//step 3 call the main function
displayUser(1);