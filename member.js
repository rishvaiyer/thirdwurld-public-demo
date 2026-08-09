(() => {
  const tabs = [...document.querySelectorAll('[data-member-step]')]
  const panels = [...document.querySelectorAll('[data-member-panel]')]

  const showStep = id => {
    panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.memberPanel === id))
    tabs.forEach(tab => {
      const active = tab.dataset.memberStep === id
      tab.classList.toggle('is-active', active)
      tab.setAttribute('aria-current', String(active))
    })
  }

  tabs.forEach(tab => tab.addEventListener('click', () => showStep(tab.dataset.memberStep)))
  showStep('welcome')
})()
