import { describe, expect, it } from 'vitest'

import { cn2tw, tw2cn, set } from './index'

describe('hanconvert', () => {
  const charsCN = '这是一段简体字'
  const charsTW = '這是壹段簡體字'

  const mapper = [
    ['水', '💧'],
    ['火', '🔥'],
    ['龙', '🐉']
  ]

  it('cn2tw function', () => {
    const result = cn2tw(charsCN)
    expect(result).eq(charsTW)
  })

  it('tw2cn function', () => {
    const result = tw2cn(charsTW)
    expect(result).eq(charsCN)
  })

  it('set function', () => {
    set(mapper)
    const charsCN = '我最喜欢吃的水果是火龙果'
    const charsTW = '我最喜歡吃的💧果是🔥🐉果'
    const tw = cn2tw(charsCN)
    const cn = tw2cn(charsTW)

    expect(tw).eq(charsTW)
    expect(cn).eq(charsCN)
  })
})
