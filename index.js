const container = document.querySelector(".container");
const main = document.querySelector(".main");
const input = document.querySelector("#profile");
const form = document.querySelector("form");

const apiUrl = `https://api.github.com/users/`;

const githubProfile = async function () {
  try {
    const search = decodeURIComponent(input.value);
    if (!search) {
      main.innerHTML = `<p class='error'>please insert value</p>`;
    }
    const res = await fetch(apiUrl + encodeURIComponent(search));
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(" User not found");
      } else {
        throw new Error("Failed to fetch user data");
      }
    }
    const data = await res.json();

    profiles(data);
    await userRepos(search);

    input.value = "";
  } catch (error) {
    console.error(error);
    main.innerHTML = "";
    displayErrorMessage(error.message);
  }
};

const userRepos = async function (search) {
  try {
    const res = await fetch(apiUrl + search + "/repos");
    if (!res) return;
    const data = await res.json();

    repoPage(data);
  } catch (error) {
    console.error(error);
  }
};

function displayErrorMessage(message) {
  const errorMessageElement = document.createElement("p");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("error");
  main.appendChild(errorMessageElement);
}

function profiles(user) {
  const html = `
      <div class="container">
      <div class="git-image">
        <img id="image" src="${user.avatar_url}" alt="user profile" />
        <p class="details"><a href='${
          user.html_url
        }' target='_blank' >go to site</a>
        </p>
      </div>
      <div class="git-details">
        <h2 class="name">${user && user.name ? user.name : user.login}</h2>
        <p class="details">${
          user && user.bio ? user.bio : "bio not available 📝"
        }
        </p>
        <div class="follow">
          <div class="followers side">
            <span class="span" id="followers">${user.followers}</span>
            <span>Followers</span>
          </div>
          <div class="following side">
            <span class="span" id="following">${user.following}</span>
            <span>Following</span>
          </div>
          <div class="repos side">
            <span class="span" id="repos-follow">${user.public_repos}</span>
            <span>Repos</span>
          </div>
        </div>
        
        <div class="repos_container">
        </div>
      </div>
    </div>
  `;
  main.insertAdjacentHTML("afterbegin", html);
}

const repoPage = (repos) => {
  const repo_list = document.querySelector(".repos_container");
  const reposSlice = repos.slice(0, 14);

  reposSlice.forEach((repo) => {
    const reposEl = document.createElement("a");
    reposEl.classList.add("link");
    reposEl.href = repo.html_url;
    reposEl.target = "_blank";
    reposEl.innerText = repo.name;

    repo_list.appendChild(reposEl);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  main.style.display = "flex";
  githubProfile();
});
