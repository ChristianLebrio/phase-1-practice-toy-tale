let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyCollection = document.getElementById("toy-collection");
  fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

    data.forEach(element => {
      const card = document.createElement(`div`);
      card.className = "card";
      card.innerHTML = `<h2>${element.name}</h2>
      <img src="${element.image}" class="toy-avatar" />
      <p>${element.likes} Likes</p>
      <button class="like-btn" id="${element.id}">Like ❤️</button>
      `;
      toyCollection.append(card);
      let likeButton = card.querySelector('button')
      let likesElement = card.querySelector('p')
      console.log(likeButton)
      likeButton.addEventListener('click', () => {
        element.likes = element.likes + 1
        fetch(`http://localhost:3000/toys/${element.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(element)
        })
        .then(res => res.json())
        .then(data => {
          likesElement.innerText = `${element.likes} Likes`
        })
        
        
      })
    });
  })

  const form = document.querySelector("form")
  form.addEventListener('submit', event => {
    event.preventDefault()
    let newToy = {}
    newToy.image = event.target[1].value
    newToy.name = event.target[0].value
    newToy.likes = 0
    //console.log(newToy)


    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy) 
    })
    .then(res => res.json())
    .then(data => {
      const card = document.createElement(`div`);
      card.className = "card";
      card.innerHTML = `<h2>${data.name}</h2>
      <img src="${data.image}" class="toy-avatar" />
      <p>${data.likes} Likes</p>
      <button class="like-btn" id="${data.id}">Like ❤️</button>
      `;
      toyCollection.append(card);
      let likeButton = card.querySelector('button')
      let likesElement = card.querySelector('p')
      likeButton.addEventListener('click', () => {
        data.likes = data.likes + 1
        fetch(`http://localhost:3000/toys/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
          likesElement.innerText = `${data.likes} Likes`
        })
    })
  })
  })


});
