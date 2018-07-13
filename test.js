'use strict'

const { test } = require('ava')
const githubIsStarred = require('.')

test('transitive-bullshit/create-react-library', async (t) => {
  t.true(await githubIsStarred({
    username: 'blaise-hansen',
    repo: 'transitive-bullshit/create-react-library'
  }))
})

test('transitive-bullshit/ffmpeg-concat', async (t) => {
  t.true(await githubIsStarred({
    username: 'transitive-bullshit',
    repo: 'transitive-bullshit/ffmpeg-concat'
  }))
})

test('transitive-bullshit/dummy', async (t) => {
  t.false(await githubIsStarred({
    username: 'blaise-hansen',
    repo: 'transitive-bullshit/dummy'
  }))
})
