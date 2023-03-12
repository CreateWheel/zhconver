import { describe, expect, it } from 'vitest'

import { s2t, t2s, set } from './index'

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

  it('set function', () => {
    const mapper = [
      ['水', '💧'],
      ['火', '🔥'],
      ['龙', '🐉']
    ]
    set(mapper)

    const charsS = '我最喜欢吃的水果是火龙果'
    const charsT = '我最喜歡吃的💧果是🔥🐉果'
    expect(s2t(charsS)).eq(charsT)
    expect(t2s(charsT)).eq(charsS)

    // reset mapper table
    const resetMaper = [
      ['水', '水'],
      ['火', '火'],
      ['龙', '龍']
    ]
    set(resetMaper)
  })

  it('set trie function', () => {
    const mapper = [
      ['水', '💧'],
      ['火', '🔥'],
      ['龙', '🐉'],
      ['电视', '電視'],
      ['电梯', '電梯'],
      ['出租车', '計程車'],
      ['公交车', '公車'],
      ['公文包', '公事包'],
      ['公共场所', '公共場所']
    ]
    set(mapper)

    const TVS = '电电视'
    const TVT = '電電視'
    expect(s2t(TVS, true)).eq(TVT)
    expect(t2s(TVT, true)).eq(TVS)

    const homeTVS = '电电视' || '我喜欢的电视节目马上就要播出了，我现在得坐公交车回家看电视'
    const homeTVT = '電電視' || '我喜歡的電視節目馬上就要播出了，我現在得坐公車回家看電視'
    expect(s2t(homeTVS, true)).eq(homeTVT)
    expect(t2s(homeTVT, true)).eq(homeTVS)

    const charsS = '我最喜欢吃的水果是火龙果'
    const charsT = '我最喜歡吃的💧果是🔥🐉果'
    expect(s2t(charsS, true)).eq(charsT)
    expect(t2s(charsT, true)).eq(charsS)

    // reset mapper table
    const resetMaper = [
      ['水', '水'],
      ['火', '火'],
      ['龙', '龍']
    ]
    set(resetMaper)

    const busCharS = '我在坐公交车'
    const busCharT = '我在坐公車'
    expect(s2t(busCharS, true)).eq(busCharT)
    expect(t2s(busCharT, true)).eq(busCharS)

    const elevatorCharS = '我在坐电梯'
    const elevatorCharT = '我在坐電梯'
    expect(s2t(elevatorCharS, true)).eq(elevatorCharT)
    expect(t2s(elevatorCharT, true)).eq(elevatorCharS)

    const publicCharS = '在公交车这样的公共场所，禁止吸烟'
    const publicCharT = '在公車這樣的公共場所，禁止吸煙'
    expect(s2t(publicCharS, true)).eq(publicCharT)
    expect(t2s(publicCharT, true)).eq(publicCharS)
  })
})
