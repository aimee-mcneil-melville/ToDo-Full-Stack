module.exports = {
  disarmOnly: disarmOnly,
  defendYourself: defendYourself
}

function disarmOnly () {
  return 'EXPELLIARMUS!'
}

function defendYourself (spell) {
  if (spell === 'Avada Kedevara') {
    return disarmOnly()
  } else {
    return 'Stupefy!'
  }
}
