import { describe, expect, it } from 'vitest'

import * as full from '../src/full'
import * as fullLite from '../src/full.lite'

describe('full', () => {
  it('default type is s2t ?', () => {
    const charsS = '这是一段简体字'
    const charsT = '這是一段簡體字'
    expect(full.convert(charsS)).eq(charsT)
    expect(fullLite.convert(charsS)).eq(charsT.replace('一', '壹'))
  })

  it('type error ?', () => {
    let fullError
    let liteError
    try {
      full.convert('', { type: 'sss' })
    } catch (e) {
      fullError = e.message
    }
    try {
      fullLite.convert('', { type: 'sss' })
    } catch (e) {
      liteError = e.message
    }
    expect(fullError).eq('options.type must be: s2t, s2hk, s2tw, s2twp, s2jp, hk2s, tw2s, twp2s, jp2s')
    expect(liteError).eq('options.type must be: s2t, t2s')
  })

  it('use custom trie', () => {
    const trie = new full.Trie()
    const trieLite = new fullLite.Trie()
    trie.insert('蛋糕', '🎂')
    trieLite.insert('蛋糕', '🎂')
    expect(full.convert('蛋糕', { trie })).eq('🎂')
    expect(fullLite.convert('蛋糕', { trie })).eq('🎂')
  })
})

import * as hk2s from '../src/hk2s'
import * as jp2s from '../src/jp2s'
import * as s2hk from '../src/s2hk'
import * as s2jp from '../src/s2jp'
import * as s2t from '../src/s2t'
import * as s2tw from '../src/s2tw'
import * as s2twp from '../src/s2twp'
import * as tw2s from '../src/tw2s'
import * as twp2s from '../src/twp2s'
describe('other', () => {
  it('default type is s2t ?', () => {
    const charsS = '这是一段简体字'
    const charsT = '這是一段簡體字'
    expect(hk2s.convert(charsT)).eq(charsS)
    expect(jp2s.convert(charsT)).eq(charsS)
    expect(s2hk.convert(charsS)).eq(charsT)
    expect(s2jp.convert(charsS)).eq(charsT)
    expect(s2t.convert(charsS)).eq(charsT)
    expect(s2tw.convert(charsS)).eq(charsT)
    expect(s2twp.convert(charsS)).eq(charsT)
    expect(tw2s.convert(charsT)).eq(charsS)
    expect(twp2s.convert(charsT)).eq(charsS)
  })

  it('type error ?', () => {
    let hk2sError
    let jp2sError
    let s2hkError
    let s2jpError
    let s2tError
    let s2twError
    let s2twpError
    let tw2sError
    let twp2sError
    try {
      hk2s.convert('', { type: 'sss' })
    } catch (e) {
      hk2sError = e.message
    }
    try {
      jp2s.convert('', { type: 'sss' })
    } catch (e) {
      jp2sError = e.message
    }
    try {
      s2hk.convert('', { type: 'sss' })
    } catch (e) {
      s2hkError = e.message
    }
    try {
      s2jp.convert('', { type: 'sss' })
    } catch (e) {
      s2jpError = e.message
    }
    try {
      s2t.convert('', { type: 'sss' })
    } catch (e) {
      s2tError = e.message
    }
    try {
      s2tw.convert('', { type: 'sss' })
    } catch (e) {
      s2twError = e.message
    }
    try {
      s2twp.convert('', { type: 'sss' })
    } catch (e) {
      s2twpError = e.message
    }
    try {
      tw2s.convert('', { type: 'sss' })
    } catch (e) {
      tw2sError = e.message
    }
    try {
      twp2s.convert('', { type: 'sss' })
    } catch (e) {
      twp2sError = e.message
    }

    expect(hk2sError).eq('options.type must be: hk2s')
    expect(jp2sError).eq('options.type must be: jp2s')
    expect(s2hkError).eq('options.type must be: s2hk')
    expect(s2jpError).eq('options.type must be: s2jp')
    expect(s2tError).eq('options.type must be: s2t')
    expect(s2twError).eq('options.type must be: s2tw')
    expect(s2twpError).eq('options.type must be: s2twp')
    expect(tw2sError).eq('options.type must be: tw2s')
    expect(twp2sError).eq('options.type must be: twp2s')
  })

  it('use custom trie', () => {
    const cake = ['蛋糕', '🎂']
    const hk2sTrie = new hk2s.Trie()
    const jp2sTrie = new jp2s.Trie()
    const s2hkTrie = new s2hk.Trie()
    const s2jpTrie = new s2jp.Trie()
    const s2tTrie = new s2t.Trie()
    const s2twTrie = new s2tw.Trie()
    const s2twpTrie = new s2twp.Trie()
    const tw2sTrie = new tw2s.Trie()
    const twp2sTrie = new twp2s.Trie()
    const tries = [hk2sTrie, jp2sTrie, s2hkTrie, s2jpTrie, s2tTrie, s2twTrie, s2twpTrie, tw2sTrie, twp2sTrie]

    for (const trie of tries) {
      trie.insert(cake[0], cake[1])
    }
    expect(hk2s.convert(cake[0], { trie: hk2sTrie })).eq(cake[1])
    expect(jp2s.convert(cake[0], { trie: jp2sTrie })).eq(cake[1])
    expect(s2hk.convert(cake[0], { trie: s2hkTrie })).eq(cake[1])
    expect(s2jp.convert(cake[0], { trie: s2jpTrie })).eq(cake[1])
    expect(s2t.convert(cake[0], { trie: s2tTrie })).eq(cake[1])
    expect(s2tw.convert(cake[0], { trie: s2twTrie })).eq(cake[1])
    expect(s2twp.convert(cake[0], { trie: s2twpTrie })).eq(cake[1])
    expect(tw2s.convert(cake[0], { trie: tw2sTrie })).eq(cake[1])
    expect(twp2s.convert(cake[0], { trie: twp2sTrie })).eq(cake[1])
  })
})
