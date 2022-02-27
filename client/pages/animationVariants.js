export const addEventVariants = {
  hidden: {
    opacity: 0,
    x: '100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: [0, 1, 0.5, 1],
    transition: { type: 'tween', duration: 1.2 },
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 },
  },
}

export const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', delay: 0.2, duration: 0.6 },
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 },
  },
}

export const profileVariants = {
  hidden: {
    opacity: 0,
    x: '100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', mass: 0.5 },
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut', duration: 0.5 },
  },
}

export const leftVariant = {
  hidden: {
    x: '-100vw',
  },
  visible: {
    x: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.5,
    },
  },
  exit: {
    x: '-150vh',
    transition: { ease: 'easeOut', duration: 0.5 },
  },
}

export const rightVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
  exit: {
    x: '150vh',
    transition: { ease: 'easeOut', duration: 0.5 },
  },
}

export const getStartButtonVariants = {
  hover: {
    scale: 1.1,
    textShadow: '0px 0px 8px rgb(255,255,255)',
    boxShadow: '5px 5px #ADC2A9, 10px 10px #D3E4CD, 15px 15px #77D970',
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
}

export const formButtonVariants = {
  hover: {
    scale: 1.1,
    textShadow: '0px 0px 8px rgb(255,255,255)',
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
}

export const cardVariant1 = {
  hidden: {
    y: '-100vw',
  },
  visible: {
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1.5,
    },
  },
  transition: {
    duration: 2,
  },
}
