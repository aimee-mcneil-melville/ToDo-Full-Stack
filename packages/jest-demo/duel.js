module.exports = {
  disarmOnly,
  defendYourself
}

function disarmOnly () {
  return 'EXPELLIARMUS!'
}

function defendYourself (spell) {
  if (spell === 'Avada Kedevara') {
    return disarmOnly()
  }

  return 'Stupefy!'
}
