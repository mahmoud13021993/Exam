  //*********   ? Loading Secreen  *******// 
window.addEventListener("load", function() {
  var load_screen = document.getElementById("load_screen");
  document.body.removeChild(load_screen);
});

//*********   ? Sidebar   *******// 

function openSideNav() {
  $(".side-nav-menu").animate({
      left: 0
  }, 500)


  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");


  for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({
          top: 0
      }, (i + 5) * 100)
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({
      left: -boxWidth
  }, 500)

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");


  $(".links li").animate({
      top: 300
  }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
      closeSideNav()
  } else {
      openSideNav()
  }
})




//*********   ? Api Home Section  *******// 



let mealDeatails = document.getElementById('mealDeatails');
let dataList = [];
async function getMeal() {
    let requst = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let data = await requst.json();
    console.log(data);
    dataList = data.meals
    display(dataList)
    
}
getMeal()



//*********   ? Display *******// 


function display(dataList){
var cols =``;
for(var i=0;i<dataList.length;i++){
cols +=`
<div class="col-md-3 p-3">
<div class="item position-relative">
   <img class="w-100 rounded-2" src="${dataList[i].strMealThumb}" alt"products"/>
   <div class="layer d-flex align-items-center p-2 fw-bold rounded-2">${dataList[i].strMeal}</div>
</div>
</div>
`
}

document.getElementById('rowBody').innerHTML =cols;
let imgs = Array.from(document.querySelectorAll('.col-md-3'))


mealDetails(dataList,imgs)

}



//*********   ? Details Meals  *******// 

function mealDetails(dataList,imgs) {
  let trs = ``;
  let ingredients = ``
  let det = document.getElementById('mealDeatails')
 for (let i = 0; i <dataList.length; i++) {
   imgs[i].addEventListener('click',function (e) {
    // console.log(e.target.parentElement.children[0]);
    let img = e.target.parentElement.children[0]
    console.log(img);
    let imgClicked = img.getAttribute('src')
    console.log(imgClicked);
    console.log(imgs);
    
    det.classList.remove('d-none')
    $('#home').hide(500);
    $('#category').hide(500)
    $('#Area').hide(500)
    $('#home').hide(500);
   $('#searchByCat').hide(500);
   $('#category').hide(500)
   $('#Area').hide(500)
   $('#Ingredients').hide(500)
    if(imgClicked === dataList[i].strMealThumb
      ) {
        console.log(imgClicked);
        console.log(dataList[i][`strIngredient${i}`]);
       

    for (let j = 1; j <= 20; j++) {
        if (dataList[i][`strIngredient${j}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${dataList[i][`strMeasure${j}`]} ${dataList[i][`strIngredient${j}`]}</li>`
            console.log(  'hamza' + ingredients);
        }
    }
    let tags = dataList[i].strTags?.split(",");
    console.log('tags',tags);
    if (!tags) tags = []

    let tagsStr = ``
    for (let k = 0; k < tags.length; k++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[k]}</li>`
    }


      trs = `
    <div class="col-md-4">
    <div class="item text-center">
        <img src="${dataList[i].strMealThumb}" alt="" class="rounded-2 w-100">
        <h2 class="text-white">${dataList[i].strMeal}</h2>
    </div>
</div>
<div class="col-md-8 m-0 pe-4 lh-base">
    <div class="item">
        <h2>Instructions</h2>
        <p>${dataList[i].strInstructions}</p>
        <h3>Area :  ${dataList[i].strArea}</h3>
        <h3>Category : ${dataList[i].strCategory}</h3>
        <h3>Recipes :
        </h3>
        <ul  class="list-unstyled d-flex g-2 flex-wrap">
                 ${ingredients}
        </ul>
        <h2>Tags :</h2>
      <ul class="list-unstyled d-flex g-3 flex-wrap>
                ${tagsStr}
      </ul>
         <div class="mt-3 mb-3"> 
             <a href="${dataList[i].strSource}" class="btn btn-success me-2">Source</a>
             <a href="${dataList[i].strYoutube }" class="btn btn-danger ">Youtube</a>
        </div>
    </div>
</div>
    `
    }
    
    document.getElementById('detBody').innerHTML = trs
   })
    
 } 

}




// ?   Search Section    //

let inputSection = document.getElementById('searchByCat')
function showSerchSection() {
inputSection.classList.remove('d-none');
$('#home').hide(500);
$('#mealDeatails').hide(500)
$('#category').hide(500)
$('#Area').hide(500)
$('#Ingredients').hide(500)
$('#contact').hide(500)
}

//*********   ? Api    *******// 

let searchData=[]
async function serarchByName(searchByName) {
  let requst = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName}`);
  let data = await requst.json();
  console.log(data);
  searchData = data.meals
  displaySearch(searchData)
}


async function searchByFirstletter(searchByFirstletter) {
  let requst = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByFirstletter}`);
  let data = await requst.json();
  console.log(data);
  searchData = data.meals
  displaySearch(searchData)
}


//*********   ? Display    *******// 

function displaySearch(searchData){
  var cols =``;
  for(let i=0;i<searchData.length;i++){
  cols +=`
  <div class="col-md-3 p-3">
  <div class="item position-relative">
     <img class="w-100 rounded-2" src="${searchData[i].strMealThumb}" alt"products"/>
     <div class="layer d-flex align-items-center p-2 fw-bold rounded-2">${searchData[i].strMeal}</div>
  </div>
  </div>
  `
  }
  
  document.getElementById('SearchBody').innerHTML =cols;
  let imgs = Array.from(document.querySelectorAll('.col-md-3'))  
  let y = mealDetails(searchData,imgs)
  console.log(y);
  console.log(searchData);
  console.log(imgs);

  }




 
//*********   ? Category section    *******// 

let categoryArea = document.getElementById('category')
function showCategory() {
categoryArea.classList.remove('d-none');
$('#mealDeatails').hide(500)
$('#home').hide(500);
$('#searchByCat').hide(500);
$('#Area').hide(500)
$('#Ingredients').hide(500)
$('#contact').hide(500)
}


//*********   ? Api    *******// 



let CatList = [];
async function getCategory() {
    let requst = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let data = await requst.json();
    CatList = data.categories
    console.log(CatList);
    displayCategory(CatList);
    console.log(displayCategory(CatList));
}
getCategory()


//*********   ? Display    *******// 


function displayCategory(CatList){
  console.log(CatList);
 let cols =``;
  for(let i=0;i<CatList.length;i++){
  cols +=`
  <div class="col-md-3 p-3">
  <div class="item position-relative">
     <img class="w-100 rounded-2" src="${CatList[i].strCategoryThumb}" alt"products"/>
     <div class="layer text-center p-2 fw-bold rounded-2"><h2>${CatList[i].strCategory}</h2>
     <p class="lead ">${CatList[i].strCategoryDescription.slice(0,120)}</p>
     </div>
  </div>
  </div>
  `
  }
  
  document.getElementById('categoryBody').innerHTML = cols;
  let imgs = Array.from(document.querySelectorAll('.col-md-3'))

  }

  //*********   ? Display meail By Category  *******// 

  

//*********   ? Meals By Area Section  *******// 



  let Area = document.getElementById('Area')
function showArea() {
Area.classList.remove('d-none');
$('#mealDeatails').hide(500)
$('#home').hide(500);
$('#home').hide(500);
$('#searchByCat').hide(500);
$('#Ingredients').hide(500)
$('#contact').hide(500)
}


//*********   ? Api   *******// 


let areaList = [];
async function getArea() {
    let requst = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let data = await requst.json();
    
    areaList = data.meals
    console.log(areaList);
    displayArea(areaList)
    
}
getArea()

//*********   ? Display    *******// 


function displayArea(areaList){
 let cols =``;
  for(let i=0;i<areaList.length;i++){
  cols +=`
  <div class="col-md-3 p-3">
  <div class="item text-center text-white">
  <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h2>${areaList[i].strArea}</h2>
     </div>
  </div>
  </div>
  `
  }
  
  document.getElementById('AreaBody').innerHTML =cols;
}
  

//*********   ? Ingredients Section   *******// 


let Ingredients = document.getElementById('Ingredients')
function showindecatorsList() {
  Ingredients.classList.remove('d-none');
$('#mealDeatails').hide(500)
$('#home').hide(500);
$('#searchByCat').hide(500);
$('#category').hide(500)
$('#Area').hide(500)
$('#contact')
}


//*********   ? Api *******// 
 

let IngredientsList = [];
async function getIngredients() {
    let requst = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let data = await requst.json();
    
    IngredientsList = data.meals
    console.log(IngredientsList);
    displayIndecators(IngredientsList)
    
}
getIngredients()

//*********   ? Display  *******// 


function displayIndecators(IngredientsList){
 let cols =``;
  for(let i=0;i<20;i++){
  cols +=`
  <div class="col-md-3 p-3">
  <div class="item text-center text-white ">
  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h2>${IngredientsList[i].strIngredient}</h2>
      <p>${IngredientsList[i].strDescription.slice(0,120)}</p>
     </div>
  </div>
  </div>
  `
  }
  
  document.getElementById('IngredientsBody').innerHTML =cols;
}


//*********   ? contact Us Section   *******// 



let contact = document.getElementById('contact')
function showContacts() {
  contact.classList.remove('d-none');
$('#mealDeatails').hide(500)
$('#home').hide(500);
$('#searchByCat').hide(500);
$('#category').hide(500)
$('#Area').hide(500)
$('#Ingredients').hide(500)
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

submitBtn = document.getElementById("submitBtn")


document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})

//*********   ? Validation   *******// 

function inputsValidation() {
  if (nameInputTouched) {
      if (nameValidation()) {
          document.getElementById("nameAlert").classList.replace("d-block", "d-none")

      } else {
          document.getElementById("nameAlert").classList.replace("d-none", "d-block")

      }
  }
  if (emailInputTouched) {

      if (emailValidation()) {
          document.getElementById("emailAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("emailAlert").classList.replace("d-none", "d-block")

      }
  }

  if (phoneInputTouched) {
      if (phoneValidation()) {
          document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

      }
  }

  if (ageInputTouched) {
      if (ageValidation()) {
          document.getElementById("ageAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("ageAlert").classList.replace("d-none", "d-block")

      }
  }

  if (passwordInputTouched) {
      if (passwordValidation()) {
          document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

      }
  }
  if (repasswordInputTouched) {
      if (repasswordValidation()) {
          document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

      }
  }


  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}






//*********   ? Regiex   *******// 


function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}