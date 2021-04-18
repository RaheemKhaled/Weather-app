
/* Global Variables */
//define the link of Url
const link = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//define API key
const key = 'b18e6b87a3efa2f901357c94da17d4ea';
//define path of the url
const addkey = '&units=metric&APPID=';  
//define the div of feeling in a variable
const feelings      = document.querySelector('#feelings');
//define the button
const Generate   = document.querySelector('#generate');
//define the div of datails which posts
const div= document.querySelector("#entryHolder");
//define the zip code
const zipcode = document.querySelector('#zip');
  



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//define the object data, in which we received the data
const data = {};

//getDate function by which know the date
const getDate = () => {
    const date = new Date();
    //transform the date to string
    return date.toDateString();
  }

//define the action function by which the event perform
const action = async function (e){
    //pick up the value of zip code which is typed in a variable
    const newZip =  zipcode.value;
    //call the weather function to get the data about weather by the zip code
    weather(link,newZip,addkey,key) ;
    //call the savedata function to save the data which is recieved
    savedata();
    }

//add an event to the button of generate calling the action function    
Generate.addEventListener('click' , action); 


   
//asynnc function by which we get the data about weather, our parameters are the all of url which consists of the link + newzip + addkey + key
async function weather (link , newZip , addkey , key){
    //define the response that = the excuting of this link after that try to collect the data as a json and return it, and if it is an error console it to make me can handle with it 
    const res = await fetch (link+newZip+addkey+key)
      
        try {
            const data = await res.json();
            console.log(data)
            return data;
          }  catch(error) {
            console.log("error", error);
          }
        }


          
//async function to save the data and collect it in its vaiable in the data object
const savedata = async () => {
    //call the getDate function to pick the date and update the object
    data.date = getDate();
    //update the feelings by equal it to the value which user typed
    data.feelings = feelings.value;
    //call the Temp function after is excuted to update the temp in the function
    data.temp = await Temp();
    //calling the update function
    updateUI();
    }

//Temp function to pick up the temperature
const Temp = async()=> {
    const zip = zipcode.value;

    const endpoint = link + zip + addkey + key;
    try {
        const response = await fetch(endpoint);
        if(response.ok) {
          const jsonResponse = await response.json();
          return jsonResponse.main.temp;
        }
      } catch(error) {
        console.log(error.message);
      }
    }






//function by which we post the data
const postData = async ( url = "/add" , data = {})=>{
    console.log(data);
    const response = await fetch (url , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json'

        },
        body: JSON.stringify(data)
    });
    console.log(data);
    try{

        const newData = await response.json()
        return newData;
    }catch(error){
        console.log("error" , error);
    }
}
//update function
const updateUI = async ()=>{
    const request = await fetch('/all');
    try{
        const allData= await request.json();
        date.innerHTML = 'Today :' + data.date;
        temp.innerHTML = 'Temperature is ' + data.temp + '&deg;C';
        content.innerHTML = 'Feelings: ' + data.feelings;

       
    }catch(error){
        console.log("error" , error);
    }
}
