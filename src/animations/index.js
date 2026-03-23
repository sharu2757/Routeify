import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Page Transitions
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
}

// Stagger Animations
export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
})

export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
}

export const fadeIn = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
}

// Scale Animations
export const scaleIn = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 200
    }
  }
}

// Slide Animations
export const slideInLeft = {
  hidden: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
}

export const slideInRight = {
  hidden: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
}

// GSAP Scroll Animations
export const initScrollAnimations = () => {
  // Parallax Effect
  gsap.utils.toArray('.parallax').forEach((section) => {
    gsap.to(section, {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })

  // Fade In on Scroll
  gsap.utils.toArray('.fade-scroll').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    })
  })

  // Stagger Cards
  gsap.utils.toArray('.stagger-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out'
    })
  })

  // Scale on Scroll
  gsap.utils.toArray('.scale-scroll').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
  })
}

// Hover Animations
export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 200
    }
  }
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: {
      duration: 0.3
    }
  }
}

// Floating Animation
export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Rotate Animation
export const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear'
  }
}

// Pulse Animation
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Text Reveal Animation
export const textReveal = {
  hidden: {
    y: '100%'
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, -0.05, 0.95]
    }
  }
}

// Counter Animation (for GSAP)
export const animateCounter = (element, start, end, duration = 2) => {
  gsap.fromTo(element,
    { innerText: start },
    {
      innerText: end,
      duration,
      snap: { innerText: 1 },
      ease: 'power2.out'
    }
  )
}

// Magnetic Effect (for buttons)
export const magneticEffect = (event, element) => {
  const { clientX, clientY } = event
  const { left, top, width, height } = element.getBoundingClientRect()
  
  const x = (clientX - (left + width / 2)) * 0.3
  const y = (clientY - (top + height / 2)) * 0.3
  
  gsap.to(element, {
    x,
    y,
    duration: 0.3,
    ease: 'power2.out'
  })
}

export const resetMagneticEffect = (element) => {
  gsap.to(element, {
    x: 0,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
}