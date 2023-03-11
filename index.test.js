import { describe, expect, it } from 'vitest'

import { s2t, t2s, set } from './index'

describe('hanconvert', () => {
  const charsCN = '这是一段简体字'
  const charsTW = '這是壹段簡體字'

  it('s2t function', () => {
    const result = s2t(charsCN)
    expect(result).eq(charsTW)
  })

  it('t2s function', () => {
    const result = t2s(charsTW)
    expect(result).eq(charsCN)
  })

  it('set function', () => {
    const mapper = [
      ['水', '💧'],
      ['火', '🔥'],
      ['龙', '🐉']
    ]
    set(mapper)
    const charsCN = '我最喜欢吃的水果是火龙果'
    const charsTW = '我最喜歡吃的💧果是🔥🐉果'
    const tw = s2t(charsCN)
    const cn = t2s(charsTW)

    expect(tw).eq(charsTW)
    expect(cn).eq(charsCN)
  })
})
