const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector("[weather-container]");

const grantAssecLocatin=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-search-form]");
const loadingScreen=document.querySelector(".loading-container");
//const userInfocontainer=document.querySelector(.user-info-container)
const userInfocontainer=document.querySelector(".user-info-container");
 // initally need variable...
 let currTab= userTab;
 const API_KEY="846191dc0d5cf217476a6909b489cf26";
 currTab.classList.add("current-Tab");
 
  function switchTab(clickedTab){
    if(clickedTab!=currTab){
      
        currTab.classList.remove("current-Tab");
        currTab=clickedTab;
        currTab.classList.add("current-Tab"); 
        if(!searchForm.classList.contains("active")){
         // kya search form val container is visible .if yes then mack it visibe
         userInfocontainer.classList.remove("active");
         grantAssecLocatin.classList.remove("active");
         searchForm.classList.add("active");
        }
        else{
         // maint phle search vale tab per tha, ab your weather tab visible karna hai
         searchForm.classList.remove("active");
         userInfocontainer.classList.remove("active");
         // ypour weather vale tab me aya hun, toh weather bhi display karna pdega , 
         //so let s chek local storage 
         // show weather according to coordinat of saved storage
         getformsessionstorage();
        }
    }
  }

 userTab.addEventListener("click", () => {
    switchTab(userTab);
 });
 searchTab.addEventListener("click", () => {
    switchTab(searchTab);


 });
 function getformsessionstorage(){
   const localcoordinat=sessionStorage.getItem("user-coordinate");
   if(!localcoordinat){
      // agar local cordinate nhi mile\
      grantAssecLocatin.classList.add("active");
   }
   else{
      const coordinates=JSON.parse(localcoordinat);
      fetchuserWeatheInfo(coordinates);
   }
 }
 async function fetchuserWeatheInfo(coordinates){
   const {lat,log}=coordinates;
          // mack grant container invisible
          grantAssecLocatin.classList.remove("active");
          loadingScreen.classList.add("active");
          // API CALL
          try {
            const response=await fetch(
               `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const data=await response.json();
            loadingScreen.classList.remove("active");
            userInfocontainer.classList.add("active");
            renderweatherinfo(data);
          } catch (error) {
            loadingScreen.classList.remove("active");
          }
  }
   function renderweatherinfo(weatherInfo){
      // firstly we haive feth the elements
      const cityName=document.querySelector("[data-Cityname]");
      const countryIcon=document.querySelector("[data-countryIcon]");
      const desc=document.querySelector("[data-weatherDesc]");
      const weatherIcon=document.querySelector("[data-weatherIcon]");
      const temp=document.querySelector(".data-temp");
      const windspeed=document.querySelector("[data-windspeed]");
      const humidity=document.querySelector("[data-humidity]");
      const cloudiness=document.querySelector("[datacloudiness]");
      console.log(weatherInfo);
      /// fetch value from weatherInfo object and and put it UI element
      cityName.innerText = weatherInfo?.name;
      countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
      desc.innerText = weatherInfo?.weather?.[0]?.description;
      weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
      temp.innerText = `${weatherInfo?.main?.temp} °C`;
      windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
      humidity.innerText = `${weatherInfo?.main?.humidity}%`;
      cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
   }

   function getlocation(){
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(showPosition);
      }
      else{

      }

   }
   function showPosition(position){
      const userCoordinate={
         lat: position.coords.latitude,
        lon: position.coords.longitude,
      }
      sessionStorage.setItem("user-coordinate",JSON.stringify(userCoordinate));
      fetchuserWeatheInfo(userCoordinate);
      console.log(userCoordinate.lat);
      console.log(userCoordinate.lon);
   }
   const grantassetbutton=document.querySelector("[data-grant-asset]");
   grantassetbutton.addEventListener("click",getlocation);
     
let searchInput=document.querySelector("[datasearchInput]");
searchForm.addEventListener("submit",(e)=>{
   e.preventDefault();
   let cityname=searchInput.value;
   if(cityname==="")
      return;
   else fetchuserWeatheInfo(cityname);
});


 async function fetchuserWeatheInfo(c){
   loadingScreen.classList.add("active");
   userInfocontainer.classList.remove("active");
   grantAssecLocatin.classList.remove("active");
   try {
      const response= await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${API_KEY}&units=metric`

      );
      const data=await response.json();
      loadingScreen.classList.remove("active");
      userInfocontainer.classList.add("active");
      renderweatherinfo(data);
   } catch (err) {
      console.log("EEEEError found" , err); 
   }
}



async function  fetchuserWeatheInfo(city) {
   loadingScreen.classList.add("active");
   userInfocontainer.classList.remove("active");
   grantAssecLocatin.classList.remove("active");


       const response = await fetch(
           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
         );
       const data = await response.json();
       loadingScreen.classList.remove("active");
       userInfocontainer.classList.add("active");
       renderweatherinfo(data);
   
  
}