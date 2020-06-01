const Handlebars = require('../node_modules/handlebars/dist/handlebars')

const nop = function () { }
const gameSearchScript = require('./gameSearch');
const popGamesSearchScript = require('./popGamesSearch');
const gamesSearchScript = require('./gamesSearch');
const groupDetailScript = require('./groupDetail');
const groupsSearchScript = require('./groupsSearch');
const editGroupScript = require('./editGroup');
const add_delGamesScript = require('./add_delGames');
const createGroupScript = require('./createGroup');
//const deleteGroupScript = require('./deleteGroup');
const loginScript = require('./login');
const signupScript = require('./signup');
const noView = function () { 
  return 'no view'
}


const compiledTemplates = {
  welcome: Handlebars.compile(require('./templates/welcome.hbs')),
  gameSearch: Handlebars.compile(require('./templates/gameSearch.hbs')), 
  popGamesResults: Handlebars.compile(require('./templates/results/popGamesResults.hbs')),
  gameResults: Handlebars.compile(require('./templates/results/gameResults.hbs')),
  groupDetail: Handlebars.compile(require('./templates/groupDetail.hbs')), 
  groupsSearch: Handlebars.compile(require('./templates/groupsSearch.hbs')), 
  popGamesSearchScript: Handlebars.compile(require('./templates/popGamesSearch.hbs')),
  editGroup: Handlebars.compile(require('./templates/editGroup.hbs')),
  createGroup: Handlebars.compile(require('./templates/createGroup.hbs')),
  login: Handlebars.compile(require('./templates/login.hbs')),
  signup: Handlebars.compile(require('./templates/signup.hbs')),
  groupDetailResult: Handlebars.compile(require('./templates/results/groupDetailResult.hbs')),
  groupsSearchResult: Handlebars.compile(require('./templates/results/groupsSearchResult.hbs')),
  add_delGames: Handlebars.compile(require('./templates/add_delGames.hbs')),

  gamesSearch: Handlebars.compile(require('./templates/gamesSearch.hbs')), 
  gamesResults: Handlebars.compile(require('./templates/results/gamesResults.hbs')),
  
  utils: Handlebars.compile(require('./templates/results/utils.hbs')),
}

module.exports = {
  welcome: {
    view: compiledTemplates.welcome,
    script: nop
  },
  gameSearch: {
    view: compiledTemplates.gameSearch,
    script: () => gameSearchScript(compiledTemplates.gameResults)
  },
  gamesSearch: {
    view: compiledTemplates.gamesSearch,
    script: () => gamesSearchScript(compiledTemplates.gamesResults)
  },
  groupDetail: {
    view: compiledTemplates.groupDetail,
    script: () => groupDetailScript(compiledTemplates.groupDetailResult)
  },
  groupsSearch: {
    view: compiledTemplates.groupsSearch,
    script: () => groupsSearchScript(compiledTemplates.groupsSearchResult)
  },
  editGroup: {
    view: compiledTemplates.editGroup,
    script: () => editGroupScript()
  },
  login: {
    view: compiledTemplates.login,
    script: () => loginScript()
  },
  signup: {
    view: compiledTemplates.signup,
    script: () => signupScript()
  },

  add_delGames: {
    view: compiledTemplates.add_delGames,
    script: () => add_delGamesScript()
  },
  createGroup: {
    view: compiledTemplates.createGroup,
    script: () => createGroupScript()
  },
  popGamesSearch: {
    view: compiledTemplates.popGamesSearchScript,
    script: () => popGamesSearchScript(compiledTemplates.popGamesResults, compiledTemplates.utils)
  }
}
