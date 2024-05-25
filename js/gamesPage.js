// Programmer Details
console.log("Appster Developed & Maintained by : Jay Kishan Kharwar")


// Handle the Category Section click and change category accordingly
async function HandleCategory() {
    // When Apps Category click load all the Apps on the page
    document.querySelectorAll(".cat-apps").forEach((element) => {
        element.addEventListener("click", () => {
            const clickedCategory = "apps";
            sessionStorage.setItem("clickedCategory", clickedCategory)

            window.location.href = "/index.html";
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


async function main() {
    await HandleCategory();
}

main();