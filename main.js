// main Variables


let theInput = document.querySelector('[type="text"]');
let getButton = document.querySelector('.get-buttom');
let repoData = document.querySelector('.show-data');
// Get Repos Function

async function getRepos() {
    if (theInput.value === '') {
        document.querySelector('.info').innerHTML = 'Value Can\'t Be Empty';
        document.querySelector('.info').style = 'color: red; font-weight: bold; font-size: 1.5em;'
    } else {
        let apiLink = `https://api.github.com/users/${theInput.value}/repos`;
        fetch(apiLink).then((res) => jsData = res.json()).then((repos) => {
            // clearing the div
            // let cL = repoData.firstElementChild.classList;
            // for (let i = 0; i < cL.length; i++) {
            //     document.querySelector(`.${cL[i]}`).remove();
            // }
            repoData.innerHTML = '';
            // showing the info
            for (let j = 0; j < repos.length; j++) {
                /*
                make the main div 
                and but the name of the repo in the other div
                 and but this div in the main div
                 */
                let div = document.createElement('div');
                let optDiv = document.createElement('div');
                optDiv.className = 'opt-div';
                div.className = 'repo-all-data';
                let repoName = document.createElement('div');
                repoName.className = 'repo-data';
                let text = document.createTextNode(repos[j].name);
                repoName.appendChild(text);
                div.appendChild(repoName)
                repoData.appendChild(div);
                // make view button
                let viewButton = document.createElement('button');
                viewButton.className = 'view';
                let vBA = document.createElement('a');
                vBA.setAttribute('href', `${repos[j].html_url}`)
                vBA.setAttribute('target', '_blank')
                vBA.innerHTML = 'View Repo';
                viewButton.appendChild(vBA);
                optDiv.appendChild(viewButton);
                div.appendChild(optDiv);
                // make view page button
                if (repos[j].has_pages === true) {
                    let viewPage = document.createElement('button');
                    viewPage.className = 'view-page';
                    let viewPageA = document.createElement('a');
                    viewPageA.setAttribute('href', `https://${theInput.value}.github.io/${repos[j].name}/`);
                    viewPageA.setAttribute('target', '_blank');
                    viewPageA.innerHTML = 'View Page';
                    viewPage.appendChild(viewPageA);
                    optDiv.appendChild(viewPage);
                }
            }
        })
    }
}

getButton.addEventListener('click', getRepos);