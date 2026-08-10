/* One reveal, shared by every page.
 *
 * Elements marked .reveal fade up as they enter. Siblings inside the same
 * group stagger, which is what makes a grid read as one gesture rather than
 * six independent animations.
 *
 * Anything already on screen at load is revealed immediately: a hero that
 * fades in after you can already see it just looks broken. */

;(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const targets = () => [...document.querySelectorAll('.reveal:not(.is-in)')]

  if (reduce.matches || !('IntersectionObserver' in window)) {
    targets().forEach(el => el.classList.add('is-in'))
    return
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-in')
      obs.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 })

  function register() {
    targets().forEach(el => {
      // Stagger within a group, capped so long lists do not crawl.
      const siblings = [...(el.parentElement?.children || [])].filter(n => n.classList?.contains('reveal'))
      const index = Math.min(siblings.indexOf(el), 5)
      if (index > 0) el.style.setProperty('--reveal-delay', `${index * 70}ms`)

      const box = el.getBoundingClientRect()
      if (box.top < window.innerHeight * 0.92) el.classList.add('is-in')
      else observer.observe(el)
    })
  }

  register()
  // Sections are swapped in by the router, so newly shown content needs picking up.
  window.addEventListener('hashchange', () => requestAnimationFrame(register))
  reduce.addEventListener('change', e => { if (e.matches) targets().forEach(el => el.classList.add('is-in')) })
})()
