import { API_URL, API_KEY } from './config.js'

function getCharacterStartsWith (startsWith) {
  const request = API_URL + 'public/characters?' + API_KEY + '&orderBy=name&nameStartsWith=' + startsWith

  return request
}

function getCharacter (characterId) {
  const request = API_URL + 'public/characters/' + characterId + '?' + API_KEY

  return request
}

function getCharacterComics (characterId, offset) {
  const request = API_URL + 'public/characters/' + characterId + '/comics?limit=100&offset=' + offset + '&' + API_KEY

  return request
}

export default {
  getCharacterStartsWith,
  getCharacter,
  getCharacterComics
}
