(() => {
  const root = document.querySelector('.capsule')
  if (!root) return

  const resident = {
    id: 'mara-venn',
    name: root.querySelector('[data-resident-name]')?.textContent.trim() || 'Mara Venn',
  }

  const LOCAL_RESPONSES = Object.freeze({
    'ask-lanterns': {
      reply: 'The blue one is my favorite. It flickers when rain is thinking about arriving, so I check it before I check the sky.',
      mood: 'brightly observant',
      trace: 'a lantern story shared',
    },
    'quiet-walk': {
      reply: 'I know a path behind the spice stalls where the market gets quiet. We can take our time there.',
      mood: 'softly hopeful',
      trace: 'a slower path offered',
    },
    'leave-note': {
      reply: 'I will keep that. Small notes have a way of finding their way back to us later.',
      mood: 'thoughtful',
      trace: 'a note left at Lantern Row',
    },
    message: {
      reply: 'I am glad you stopped by. I will carry that thought with me while the market lights come on.',
      mood: 'warmly present',
      trace: 'a small hello remembered',
    },
  })

  const actions = [...root.querySelectorAll('[data-action]')]
  const thread = root.querySelector('[data-thread]')
  const emptyThread = root.querySelector('[data-thread-empty]')
  const form = root.querySelector('[data-message-form]')
  const input = root.querySelector('[data-message-input]')
  const status = root.querySelector('[data-channel-status]')
  const turnCount = root.querySelector('[data-turn-count]')
  const mood = root.querySelector('[data-resident-mood]')
  let turns = 0

  const endpoint = () => {
    const configured = root.dataset.endpoint || (typeof window !== 'undefined' && window.THIRDWURLD_CAPSULE_ENDPOINT)
    return typeof configured === 'string' ? configured.trim() : ''
  }

  const setStatus = (message, type = '') => {
    if (!status) return
    status.textContent = message
    status.classList.toggle('is-fallback', type === 'fallback')
    status.classList.toggle('is-server', type === 'server')
  }

  const localResponse = action => LOCAL_RESPONSES[action] || LOCAL_RESPONSES.message

  const getResponse = async (action, message = '') => {
    const configuredEndpoint = endpoint()
    if (!configuredEndpoint) {
      setStatus('No server endpoint configured · local simulation active.', 'fallback')
      return localResponse(action)
    }

    try {
      const response = await fetch(configuredEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ residentId: resident.id, action, message }),
      })
      if (!response.ok) throw new Error(`Endpoint returned ${response.status}`)
      const data = await response.json()
      if (!data || typeof data.reply !== 'string') throw new Error('Endpoint response missing reply')
      setStatus('Connected to the configured capsule endpoint.', 'server')
      return {
        reply: data.reply,
        mood: typeof data.mood === 'string' ? data.mood : localResponse(action).mood,
        trace: typeof data.trace === 'string' ? data.trace : 'a moment shared',
      }
    } catch (error) {
      setStatus('Server unavailable · local simulation used instead.', 'fallback')
      return localResponse(action)
    }
  }

  const appendMessage = (author, copy, meta, residentMessage = false) => {
    if (!thread) return
    emptyThread?.remove()
    const item = document.createElement('div')
    item.className = `message${residentMessage ? ' is-resident' : ''}`
    const mark = document.createElement('span')
    mark.className = 'message-mark'
    mark.textContent = residentMessage ? 'MV' : 'YOU'
    const body = document.createElement('div')
    const text = document.createElement('p')
    text.textContent = copy
    const label = document.createElement('small')
    label.textContent = `${author} · ${meta}`
    body.append(text, label)
    item.append(mark, body)
    thread.append(item)
    thread.scrollTop = thread.scrollHeight
  }

  const updateResident = response => {
    if (mood && response.mood) mood.textContent = response.mood
  }

  const runInteraction = async (action, message = '') => {
    if (turns >= 3) {
      setStatus('Preview limit reached · the private world is not connected.', 'fallback')
      return
    }
    actions.forEach(button => { button.disabled = true })
    if (form) form.querySelector('button').disabled = true
    setStatus('Mara is considering a response · bounded preview active.', 'fallback')
    const label = message || actions.find(button => button.dataset.action === action)?.querySelector('strong')?.textContent || 'A note'
    appendMessage('you', label, 'just now')
    const response = await getResponse(action, message)
    appendMessage(resident.name, response.reply, response.trace, true)
    updateResident(response)
    turns += 1
    if (turnCount) turnCount.textContent = `${turns} turns shown`
    if (turns >= 3) {
      actions.forEach(button => { button.disabled = true })
      if (form) form.querySelector('button').disabled = true
      setStatus('Three-turn preview complete · the private world is not connected.', 'fallback')
      return
    }
    actions.forEach(button => { button.disabled = false })
    if (form) form.querySelector('button').disabled = false
  }

  actions.forEach(button => {
    button.addEventListener('click', () => runInteraction(button.dataset.action))
  })

  form?.addEventListener('submit', event => {
    event.preventDefault()
    const message = input?.value.trim()
    if (!message) {
      input?.focus()
      return
    }
    if (input) input.value = ''
    runInteraction('message', message)
  })

  setStatus('No server endpoint configured · local simulation ready.', 'fallback')
})()
