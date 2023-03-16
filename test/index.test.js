import { describe, expect, it } from 'vitest'

import { s2t, t2s, Trie } from '../src/zhconver'

describe('hanconvert', () => {
  it('s2t function', () => {
    const charsS = '这是一段简体字'
    const charsT = '這是壹段簡體字'
    expect(s2t(charsS)).eq(charsT)
  })

  it('t2s function', () => {
    const charsS = '这是一段简体字'
    const charsT = '這是壹段簡體字'
    expect(t2s(charsT)).eq(charsS)
  })

  it('custom Trie', () => {
    const trie = new Trie()
    trie.insert('水', '💧')
    trie.insert('火', '🔥')
    trie.insert('龙', '🐉')
    trie.insert('💧', '水')
    trie.insert('🔥', '火')
    trie.insert('🐉', '龙')

    const charsS = '我最喜欢吃的水果是火龙果'
    const charsT = '我最喜欢吃的💧果是🔥🐉果'
    expect(s2t(charsS, trie)).eq(charsT)
    expect(t2s(charsT, trie)).eq(charsS)
  })

  it('more custom Trie', () => {
    const trie = new Trie()
    trie.insert('水', '💧')
    trie.insert('火', '🔥')
    trie.insert('龙', '🐉')
    trie.insert('电视', '電視')
    trie.insert('电梯', '電梯')
    trie.insert('出租车', '計程車')
    trie.insert('公交车', '公車')
    trie.insert('公文包', '公事包')
    trie.insert('公共场所', '公共場所')

    trie.insert('💧', '水')
    trie.insert('🔥', '火')
    trie.insert('🐉', '龙')
    trie.insert('電視', '电视')
    trie.insert('電梯', '电梯')
    trie.insert('計程車', '出租车')
    trie.insert('公車', '公交车')
    trie.insert('公事包', '公文包')
    trie.insert('公共場所', '公共场所')

    const TVS = '电电视'
    const TVT = '电電視'
    expect(s2t(TVS, trie)).eq(TVT)
    expect(t2s(TVT, trie)).eq(TVS)

    const homeTVS = '我喜欢的电视节目马上就要播出了，我现在得坐公交车回家看电视'
    const homeTVT = '我喜欢的電視节目马上就要播出了，我现在得坐公車回家看電視'
    expect(s2t(homeTVS, trie)).eq(homeTVT)
    expect(t2s(homeTVT, trie)).eq(homeTVS)

    const charsS = '我最喜欢吃的水果是火龙果'
    const charsT = '我最喜欢吃的💧果是🔥🐉果'
    expect(s2t(charsS, trie)).eq(charsT)
    expect(t2s(charsT, trie)).eq(charsS)

    const busCharS = '我在坐公交车'
    const busCharT = '我在坐公車'
    expect(s2t(busCharS, trie)).eq(busCharT)
    expect(t2s(busCharT, trie)).eq(busCharS)

    const elevatorCharS = '我在坐电梯'
    const elevatorCharT = '我在坐電梯'
    expect(s2t(elevatorCharS, trie)).eq(elevatorCharT)
    expect(t2s(elevatorCharT, trie)).eq(elevatorCharS)

    const publicCharS = '在公交车这样的公共场所，禁止吸烟'
    const publicCharT = '在公車这样的公共場所，禁止吸烟'
    expect(s2t(publicCharS, trie)).eq(publicCharT)
    expect(t2s(publicCharT, trie)).eq(publicCharS)
  })
})
