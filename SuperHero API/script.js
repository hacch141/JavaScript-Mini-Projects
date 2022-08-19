const superhero_token = '734261094471967'
const base_URL = `https://superheroapi.com/api.php/${superhero_token}`
const newHeroButton = document.getElementById('newHeroButton')
const heroImageDiv = document.getElementById('heroImage')
const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

const getSuperhero = (id) => {
  fetch(`${base_URL}/${id}`) 
  .then(response => response.json()) 
  .then(json => {
    console.log(json)
    showHeroInfo(json)
  }) 
}

const getSearchSuperHero = (name) => {
  console.log(searchInput.value)
  fetch(`${base_URL}/search/${name}`)
  .then(response => response.json())
  .then(json => {
    const hero = json.results[0]
    showHeroInfo(hero)
  })
}

const randomHero = () => {
  const numberOfHeros = 731
  return Math.floor(Math.random()*numberOfHeros)+1
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}

const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`
  const img = `<img src="${character.image.url}" height="200" width="200"/>`
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join(' ')
  
  heroImageDiv.innerHTML = `${name}${img}${stats}`

  return stats.join(' ')
}

newHeroButton.onclick = () => {
  getSuperhero(randomHero())
}

searchButton.onclick = () => {
  getSearchSuperHero(searchInput.value)
}
