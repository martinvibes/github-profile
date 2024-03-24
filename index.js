const container = document.querySelector(".container");
const main = document.querySelector(".main");
const input = document.querySelector("#profile");
const form = document.querySelector("form");

const apiUrl = `https://api.github.com/users/`;

const githubProfile = async function () {
  try {
    const search = input.value;
    const res = await fetch(apiUrl + search);
    const data = await res.json();

    profiles(data);

    console.log(data);
    input.value = "";
  } catch (error) {
    console.error(error);
  }
};

function profiles(user) {
  const html = `
      <div class="container">
      <div class="git-image">
        <img id="image" src="${user.avatar_url}" alt="user profile" />
      </div>
      <div class="git-details">
        <h2 class="name">${user.name}</h2>
        <p class="details">${user.bio}
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
        
      </div>
    </div>
  `;
  main.insertAdjacentHTML("afterbegin", html);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.style.display = "flex";
  githubProfile();
});
