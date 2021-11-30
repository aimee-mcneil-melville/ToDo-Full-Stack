export const addEventVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: [0, 1, 0.5, 1],
    transition: { type: 'tween' }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
}

export const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', delay: 0.2, duration: 0.6 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
}

export const profileVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', mass: 0.5 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 }
  }
}

export const leftVariant = {
  hidden: {
    x: '-100vw'
  },
  visible: {
    x: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.5
    }
  },
  exit: {
    x: '-150vh',
    transition: { ease: 'easeOut', duration: 0.5 }
  }
}

export const rightVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  },
  exit: {
    x: '150vh',
    transition: { ease: 'easeOut', duration: 0.5 }
  }
}

export const gardensListVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring'
    }
  }
}
