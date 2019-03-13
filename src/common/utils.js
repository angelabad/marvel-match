function getCharacterStartsWith (startsWith) {
  const request = process.env.VUE_APP_API_URL + 'public/characters?' + '&orderBy=name&nameStartsWith=' + startsWith

  return request
}

function getCharacter (characterId) {
  const request = process.env.VUE_APP_API_URL + 'public/characters/' + characterId

  return request
}

function getCharacterComics (characterId, offset) {
  const request = process.env.VUE_APP_API_URL + 'public/characters/' + characterId + '/comics?limit=100&offset=' + offset

  return request
}

export default {
  getCharacterStartsWith,
  getCharacter,
  getCharacterComics
}
