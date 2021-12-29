export const dropdownVariant = {
  start: {
    opacity: 0,
    y: -10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      type: 'tween',
    },
  },
}

export const modalVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
    transition: { duration: 0.5, type: 'tween' },
  },
  visible: {
    y: '0px',
    opacity: 1,
    transition: { duration: 0.75, type: 'tween' },
  },
}

export const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
