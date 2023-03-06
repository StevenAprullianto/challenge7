const subTitle = document.getElementById('subTitle');
const title = document.getElementById('title');
const imageSlider = document.getElementById('imageSlider');
//var x = window.matchMedia("(max-width: 768px)");
//var xMob = window.matchMedia("(max-width: 768px)")

function myFunction() {
    if (window.innerWidth === 768) { 
        subTitle.classList.remove('col-3')
        subTitle.classList.add('col-5');

        title.classList.remove('col-3')
        title.classList.add('col-5');

        imageSlider.classList.remove('col-9')
        imageSlider.classList.add('col-7');
    }else if(window.innerWidth === 480){

        subTitle.classList.remove('col-3')
        subTitle.classList.add('col-12');

        title.classList.remove('col-3')
        title.classList.add('col-12');

        imageSlider.classList.remove('col-9')
        imageSlider.classList.add('col-12');
    }else {
        
    }
}

console.log("asdasd")

myFunction() // Call listener function at run time
//x.addEventListener(myFunction) // Attach listener function on state changes