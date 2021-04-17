  /* Global Variables */
   
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
//define the api code
const KeyOfApi = "b18e6b87a3efa2f901357c94da17d4ea";
//define the bottun of generate to add an event
const Generate = document.querySelector("#generate");


Generate.addEventListener('click' , async () => {
    //getting the value of the zip code and what user is feeling
    const zipcode = document.querySelector("#zip").value ;
    const feel = document.querySelector("#feelings").value;
    // 2 if statement to make user write his feeling and the zip code
    if(!zipcode){
        return alert ("Please, enter the Zip Code")
    }
    if(!feel){
        return alert ("Please, enter What are you feeling")
    }
    
    GettingData (zipcode , feel)
    .then(function(data){
        console.log(data);
        
        postData('/add', {date:d , temp:data , content:feel})
        updateUI();
    })
    
})

//function by which we get the data
async function GettingData(zipcode , feel){
    //url which getting from it the response 
    const Res = await fetch (`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${KeyOfApi}&units=metric`)
        if ( Res.status === 404 || Res.status === 400 ){
            return alert("ENTER VALID ZIP CODE");
        }
    try{
        //getting the temp from the data which is recieved
        const weather = await Res.json();
        const temp = weather.main.temp;        
        console.log(temp);
        return temp;

    }catch(err){
        //to handle any error
        console.log("err",err)
    }
}

//function by which we post the data
const postData = async ( url = "" , data = {})=>{
    console.log(data);
    const response = await fetch (url , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{

        const newDate = await response.json();
        console.log(newDate);
        return newDate;
    }catch(error){
        console.log("error" , error);
    }
}
//update function
const updateUI = async ()=>{
    const request = await fetch('/all');
    try{
        const allData= await request.json();
    
      document.getElementById('date').innerHTML = `Date: ${allData.date} `;
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} `;
      document.getElementById('content').innerHTML = `Content: ${allData.content} `;    
    }catch(error){
        console.log("error" , error);
    }
}




