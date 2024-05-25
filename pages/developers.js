console.log("Appster: Developed & Maintained by Jay kishan kharwar")

// Loading Effect 
async function HandleLoadingDiv() {

    document.querySelector(".Loading").style.display = "none";

}

// Add shadow to header on scroll
function addShadowToHeader() {

    document.addEventListener("scroll", () => {
        document.querySelector("header").classList.add('shadow-md')
    })


}


async function main() {

    // Logo rotation effect in Snipper .
    setInterval(() => {

        if (document.querySelector(".loader-logo").style.rotate == "360deg") {

            document.querySelector(".loader-logo").style.rotate = "0deg";
        } else {

            document.querySelector(".loader-logo").style.rotate = "360deg";
        }

    }, 900)

    // Add shodow to header section on scrolling 
    addShadowToHeader();

    // Hamburger functionality implemented
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


    await HandleLoadingDiv();
}

main();