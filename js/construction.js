// Add shadow to header on scroll
function addShadowToHeader() {

    document.addEventListener("scroll", () => {
        document.querySelector("header").classList.add('shadow-md')
    })


}

async function main(){

// Hamburger functionality  
document.querySelector(".header-hamburger").addEventListener("click", () => {
    if (document.querySelector(".hamburger").classList.contains("hidden")) {
        document.querySelector(".hamburger").classList.replace("hidden", "block")

    } else {
        document.querySelector(".hamburger").classList.replace("block", "hidden")
    }
})

document.querySelector("main").addEventListener("click", () => {
    document.querySelector(".hamburger").classList.replace("block", "hidden")
})

document.querySelector(".hamburger-close-btn").addEventListener("click", () => {
    document.querySelector(".hamburger").classList.replace("block", "hidden")
})

// Redirect to home page if anyone click on appster logo
document.querySelector(".logo").addEventListener("click", () => {
    // Redirect to index.html
    window.location.href = "/index.html"
})
// Redirect to home page if anyone click on Go Home Button
document.querySelector(".go-home-btn").addEventListener("click", () => {
    // Redirect to index.html
    window.location.href = "/index.html"
})


// Add shadow to header on scrolling
addShadowToHeader();


}

main();