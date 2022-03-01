$(document).ready(function(){
    
    // Load breaking news
    function start(){
    var link = 'https://gnews.io/api/v4/top-headlines?lang=en&token=5c36b3bf4d495d94f65a994727f5052e'
    getInformation(renderInformation,link);
    };
    // When website load
    start();
    // 
    // Search Method
    function search() {
        $("#loadingIcon").css("display","");
        let content = document.getElementById("searchContent").value;
        let link = `https://gnews.io/api/v4/search?q=${content}&lang=en&sortby=publishedAt&token=5c36b3bf4d495d94f65a994727f5052e

        `;
        getInformation(renderInformation,link);
    }
    // Click Searchbutton
    var btn = document.getElementById("searchMethod");
    btn.onclick = search;
    // Get information from sever
    function getInformation(callback, link) {
        fetch(link)
            .then(function (response) {
                return response.json();
            })
            .then(callback);
    };
    // Render receive information
    function renderInformation(information) {
        $("#loadingIcon").css("display","none");
        var newsSelect = document.getElementById("containews");
        var html = ``;
    
        var length = information.totalArticles;
        for (let i = 0; i < length; i++) {
            if (i==6) {
                break;
            }
            let date = new Date(information.articles[i].publishedAt).toISOString().replace(/\.[0-9][0-9][0-9]/, "");
            html += `
                    <div class="container-fluid row">
                        <div class="col col-4 col-sm-4 col-md-4">
                            <img class="img" src="${information.articles[i].image}" alt="anh">
                        </div>
                        <div class="col col-8 col-sm-8 col-md-8">
                            <a href="${information.articles[i].url}" target="_blank">${information.articles[i].title}</a>
                            <h6>${date}</h6>
                            <p>${information.articles[i].content}</p>
                        </div>
                    </div>
            `;
        }
        newsSelect.innerHTML = html;
    }
    
    
});


