const mobileLinks=document.querySelectorAll(".mobile-nav a")
console.log(mobileLinks)


function toggleMenu(){
    document.getElementById("mobileNav").classList.toggle("active")
}

mobileLinks.forEach((link) => {
    link.addEventListener("click",()=>{
        document.getElementById("mobileNav").classList.remove("active")
    })
})


