'use strict'

const octokit = require('@octokit/rest')()
const ow = require('ow')

/**
 * Checks if a user has starred a particular GitHub repo.
 *
 * @name githubIsStarred
 * @function
 *
 * @param {object} opts - Config options
 * @param {string} opts.username - GitHub username of user to check
 * @param {string} opts.repo - Full name of GitHub repo to check
 * @param {object} [opts.client] - Optional authenticated `@octokit/rest` client
 *
 * @return {Promise}
 */
module.exports = async (opts) => {
  const {
    client = octokit,
    username,
    repo
  } = opts

  ow(username, ow.string.nonEmpty.label('username'))
  ow(repo, ow.string.nonEmpty.label('repo'))

  let page = 1
  let perPage = 100

  do {
    const { data } = await client.activity.listReposStarredByUser({
      username,
      page,
      per_page: perPage
    })

    if (!data || !data.length) break

    const repos = new Set(data.map((r) => r.full_name))
    if (repos.has(repo)) return true

    ++page
  } while (true)

  return false
}
