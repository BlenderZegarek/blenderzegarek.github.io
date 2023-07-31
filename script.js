function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

window.onload = function () {

    const reposjson = httpGet("https://api.github.com/users/blenderzegarek/repos")
    const repos = JSON.parse(reposjson)

    const projectsgrid = document.getElementById("projectsgrid")
    const loading = document.getElementById('loading')

    repos.forEach(element => {

        const card = `
            <a id="project1" class="projectmain" href="${element.html_url}">
                <div class="project">
                    <h2>${element.name}</h2>
                    <p>${ (element.description != null) ? element.description : "" }</p>
                    <div class="projectfooter">
                        <p class="projectstars"><i class="bi bi-star-fill"></i> ${element.stargazers_count}</p>
                        <p class="projectlang"><i class="bi bi-code-slash"></i> ${element.language}</p>
                        <p class="projectviewers"><i class="bi bi-eye-fill"></i> ${element.watchers_count}</p>
                    </div>
                </div>
            </a>
        `

        projectsgrid.insertAdjacentHTML("beforeend", card)

    });

    loading.remove();

// ========== //

    let els = document.getElementsByClassName("project")

    for (let el of els) {

        const height = el.clientHeight
        const width = el.clientWidth

        el.addEventListener("mousemove", handleMove)


        function handleMove(e) {
            
            const xVal = e.layerX
            const yVal = e.layerY

            const yRotation = 5 * ((xVal - width / 2) / width)
            const xRotation = -5 * ((yVal - height / 2) / height)
            
            const string = "perspective(500px) scale(1.05) rotateX(" + xRotation + "deg) rotateY(" + yRotation + "deg)"
            
            el.style.transform = string
            
            setTimeout(() => {  el.style.transition = "none"; }, 150);
            
        }

        el.addEventListener("mouseout", function() {
            el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
        })

        el.addEventListener("mousedown", function() {
            el.style.transform = 'perspective(500px) scale(0.95) rotateX(0) rotateY(0)'
        })

        el.addEventListener("mouseup", function() {
            el.style.transform = 'perspective(500px) scale(1.05) rotateX(0) rotateY(0)'
        })
        
    }
    
}


