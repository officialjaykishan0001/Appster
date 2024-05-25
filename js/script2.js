// Programmer Details
console.log("Appster Developed & Maintained by : Jay Kishan Kharwar")

var ClickedAppCard = sessionStorage.getItem("ClickedAppCard");
console.log(ClickedAppCard);


// Add shadow to header on scroll
function addShadowToHeader() {

    document.addEventListener("scroll", () => {
        document.querySelector("header").classList.add('shadow-md')
    })


}

// Function to Implement donwload facilities
function InstallApkfile() {
    document.querySelector(".install-app").firstElementChild.href = ClickedAppCard + "app.apk";


}

// Whenever Click on AppCard Redirect user to download Page.
function similiarAppCardClick() {
    smApps = Array.from(document.querySelectorAll(".sm-app-card"))
    smApps.forEach(element => {
        element.addEventListener("click", (e) => {


            var ClickedsmAppCard = e.target.dataset.info
            sessionStorage.setItem("ClickedAppCard", ClickedsmAppCard)
            // Redirect to download Page
            window.location.href = "/downloadPage.html"
        })
    });
}


// Function to load some similiar apps
async function loadSimiliarApps() {
    // Get the folder url
    let folder = ClickedAppCard.substring(0, ClickedAppCard.length - 3)

    // Edge case solved
    if (folder[folder.length - 1] == 'a') {
        folder = folder.substring(0, folder.length - 1)
    }


    // Fetch data from folder url
    let res = await fetch(folder)
    let a = await res.text()

    // Put all data inside a 'div
    let div = document.createElement('div')

    div.innerHTML = a

    // For Folders we have extaract data from each subfolder of the form (a1,a2,a3....a'i') 
    for (let i = 1; i <= Array.from(div.getElementsByTagName('a')).length; i++) {
        if (`${folder}a${i}/` == ClickedAppCard) {
            continue;
        }
        // Fetch data from info.json and parse it as json file
        const res = await fetch(folder + `a${i}/` + "info.json")
        const a = await res.json()

        // Add similiar apps (apps cards) into the container
        document.querySelector(".similiar-apps-container").innerHTML += `
        <div data-info="${folder}a${i}/"  class="sm-app-card   flex gap-2 items-center hover:bg-gray-200 p-3 cursor-pointer rounded-md ">
                    <div class="sm-app-icon">
                        <img class=" w-20 rounded-lg " src="${folder}a${i}/applogo.webp" alt="">
                    </div>
                    <div class="font-medium">
                        <div class="sm-app-name ">
                            ${a.name}
                        </div>
                        <div class="sm-app-rating">
                            4.5 &starf;
                        </div>
                    </div>
                </div>
        `
    }
}



// Loading Effect 
async function HandleLoadingDiv() {

    document.querySelector(".Loading").style.display = "none";

}

// Handle Undefined ClickedAppCard
async function HandleUndefAppCardClick() {
    confirm("Something went Wrong")
    setTimeout(() => {
        window.location.href = "/index.html"
    }, 5000)

}

// Handle appster share button
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


    //Handle Situation where the clicked app  is undefined
    if (ClickedAppCard === "undefined") {
        await HandleUndefAppCardClick();
    }

    // laod app name and icons
    const res = await fetch(ClickedAppCard + 'info.json')
    const a = await res.json()
    document.querySelector(".app-name").innerHTML = a.name

    Array.from(document.querySelectorAll(".app-icon-img")).forEach(ele => {

        ele.src = ClickedAppCard + "applogo.webp"
    })

    document.querySelector(".app-web-link").innerHTML = "www." + a.name.substring(0, 10).replaceAll(" ", "") + ".com"


    // Load the Similiar Apps
    await loadSimiliarApps()

    // Handle All install procedure
    InstallApkfile();

    // App Card click 
    setTimeout(() => {
        similiarAppCardClick()

    }, 2000);

    // Hide the loadig effect after all the loading done
    await HandleLoadingDiv();



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


    // Add shadow to header on scrolling
    addShadowToHeader();

    // Handle the appster share button
    await HanlderAppsterShareButton();
}

main()
