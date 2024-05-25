// Programmer Details
console.log("Appster Developed & Maintained by : Jay Kishan Kharwar")
var clickedCat = "apps"
clickedCat = sessionStorage.getItem("clickedCategory")
console.log(clickedCat)

// Add shadow to header on scroll
function addShadowToHeader() {

    document.addEventListener("scroll", () => {
        document.querySelector("header").classList.add('shadow-md')
    })


}

// Function used to edit some url
function updateURL(CurrentURl, folderName) {
    let str = "";
    for (let i = 0; i < 21; i++) {
        str += CurrentURl[i];
    }
    str += folderName
    for (let i = 21; i < CurrentURl.length; i++) {
        str += CurrentURl[i];
    }
    return str;
}

// Function Responsible for loading all the app cards in particular container
async function LoadApps(CategoryName, category) {
    // Fetch the Category folder data and parse it into text
    let a = await fetch(`/materials/${CategoryName}/${category}/`)
    let res = await a.text();
    let Tempdiv = document.createElement('div')
    Tempdiv.innerHTML = res

    let as = Array.from(Tempdiv.getElementsByTagName("a"))

    // Get the category container
    let container = document.querySelector(`.${category}-container`)

    // Load all the appCards at the container
    as.forEach(async element => {

        let url = (updateURL(element.href, `/materials/${CategoryName}/${category}`))

        // Getting the App Name from the info.json file
        const res = await fetch(url + "info.json")
        const data = await res.json();
        const appName = data.name;


        // Append each app card 
        container.innerHTML = container.innerHTML + `
        <div data-info="${url}"  class="transition-all duration-1000 app-card   flex flex-col   cursor-pointer hover:bg-gray-200 p-3 rounded-md ">
        <div data-info="${url}" class="app-logo">
        <img data-info="${url}"  class="app-logo-img  rounded-3xl shadow-xl w-24 sm:w-44  " src="${url}applogo.webp" alt="">
        </div>

        <div data-info="${url}" class="app-name ">
        ${appName.substring(0, 11)}
        </div>
        </div>
        `


    });


}

// Handle the Category Section click and change category accordingly
async function HandleCategory() {
    // When Games Category click load all the games on the page
    document.querySelectorAll(".cat-games").forEach((element) => {
        element.addEventListener("click", () => {
            const clickedCategory = "games";
            sessionStorage.setItem("clickedCategory", clickedCategory);

            window.location.href = "/index2.html";
        })
    })

    // When Movies Category Click load all the movies on the page
    document.querySelectorAll(".cat-movies").forEach((element) => {
        element.addEventListener("click", () => {
            window.location.href = "pages/constructionPage.html"
        })
    })
    // When Books Category Click load all the Books on the page
    document.querySelectorAll(".cat-books").forEach((element) => {
        element.addEventListener("click", () => {
            window.location.href = "pages/constructionPage.html"
        })
    })
    // When kids Category Click load all the kids-related products on the page
    document.querySelectorAll(".cat-kids").forEach((element) => {
        element.addEventListener("click", () => {
            window.location.href = "pages/constructionPage.html"
        })
    })
}

// Whenever Click on AppCard Redirect user to download Page.
function AppCardClickRedirection() {
    let AppContainer = Array.from(document.querySelectorAll(".appCard-container"))


    AppContainer.forEach(container => {
        container.addEventListener("click", (e) => {
            if (e.target.classList.contains('app-logo-img') || e.target.classList.contains('app-card') || e.target.classList.contains('app-name') || e.target.classList.contains('app-logo')) {

                // Pass What Card is clicked
                console.log(e.target.dataset.info)
                var ClickedAppCard = e.target.dataset.info
                sessionStorage.setItem("ClickedAppCard", ClickedAppCard);

                // Redirect
                window.location.href = "/downloadPage.html";
            }
        })
    })

}

// Search Functainality Implemented
function SearchApps() {
    let searchBar = document.querySelector(".search-bar")

    let Apps = Array.from(document.getElementsByClassName("app-card"))

    searchBar.addEventListener("input", (e) => {
        // Removing Container Title
        Array.from(document.querySelectorAll(".Container-title")).forEach(cont => {
            cont.classList.add("hidden")
        })

        console.log(e.target.value)

        // Remove Apps which does not contains user input
        Apps.forEach(element => {
            let AppName = (element.lastElementChild.innerHTML).toLowerCase()
            if (!AppName.includes((e.target.value).toLowerCase())) {
                element.classList.add("hidden")
            }
        })

        // If User Exits to Search bar 
        if (e.target.value == "") {
            // Display All the Apps
            Apps.forEach(element => {
                element.classList.remove("hidden")
            })

            // Display Container Titles
            Array.from(document.querySelectorAll(".Container-title")).forEach(cont => {
                cont.classList.remove("hidden")
            })
        }
    })



}

// Loading Effect 
async function HandleLoadingDiv() {
    document.querySelector(".Loading").style.display = "none";

}

//  Handle appster share button
async function HanlderAppsterShareButton() {
    const ShareButton = document.querySelector(".share-appster-btn");

    ShareButton.addEventListener("click", async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Share Appster",
                    text: "Dream, Design & Appsterize",
                    url: window.location.href

                })
            }
            catch (err) {
                console.log("Error Sharing!", (err))
            }
        } else {
            alert("To Share the Appster Copy the URL : " + window.location.href);
        }
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

    // Load Apps for each Category Section
    if (clickedCat != null) {
        await LoadApps(clickedCat, "recommended")
        await LoadApps(clickedCat, "educational")
        await LoadApps(clickedCat, "editorsChoice")
    } else {
        await LoadApps("apps", "recommended")
        await LoadApps("apps", "educational")
        await LoadApps("apps", "editorsChoice")

    }

    // Hide the loadig effect after all the loading done
    await HandleLoadingDiv();


    // Add shadow to header on scroll
    addShadowToHeader();

    // Redirection to Donwload page for each app card click
    AppCardClickRedirection()

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

    // Search feature Implemented, call to function after 3 sec when all apps get loaded on the page
    setTimeout(() => {
        SearchApps();
    }, 3000);

    // Handle appster share button functainality
    await HanlderAppsterShareButton();

    await HandleCategory();


}
main();