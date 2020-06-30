const Handlebars = require('handlebars/dist/handlebars.min.js')
//console.log(Handlebars)
const nop = function () { }
const tvshowSearchScript = require('./tvshowSearch');
const poptvshowsSearchScript = require('./poptvshowsSearch');
const tvshowsSearchScript = require('./tvshowsSearch');
const groupDetailScript = require('./groupDetail');
const groupsSearchScript = require('./groupsSearch');
const editGroupScript = require('./editGroup');
const add_deltvshowsScript = require('./add_deltvshows');
const createGroupScript = require('./createGroup');
//const deleteGroupScript = require('./deleteGroup');
const loginScript = require('./login');
const signupScript = require('./signup');
const rankScript = require('./rank_show');
const noView = function () { 
  return 'no view'
}


const compiledTemplates = {
  welcome:Handlebars.compile(require('./templates/welcome.hbs')),//(require('./templates/welcome.hbs'))),
  tvshowSearch: Handlebars.compile(require('./templates/tvshowSearch.hbs')), 
  poptvshowsResults: Handlebars.compile(require('./templates/results/poptvshowsResults.hbs')),
  tvshowResults: Handlebars.compile(require('./templates/results/tvshowResults.hbs')),
  groupDetail: Handlebars.compile(require('./templates/groupDetail.hbs')), 
  groupsSearch: Handlebars.compile(require('./templates/groupsSearch.hbs')), 
  poptvshowsSearchScript: Handlebars.compile(require('./templates/poptvshowsSearch.hbs')),
  editGroup: Handlebars.compile(require('./templates/editGroup.hbs')),
  createGroup: Handlebars.compile(require('./templates/createGroup.hbs')),
  login: Handlebars.compile(require('./templates/login.hbs')),
  signup: Handlebars.compile(require('./templates/signup.hbs')),
  groupDetailResult: Handlebars.compile(require('./templates/results/groupDetailResult.hbs')),
  groupsSearchResult: Handlebars.compile(require('./templates/results/groupsSearchResult.hbs')),
  add_deltvshows: Handlebars.compile(require('./templates/add_deltvshows.hbs')),

  tvshowsSearch: Handlebars.compile(require('./templates/tvshowsSearch.hbs')), 
  tvshowsResults: Handlebars.compile(require('./templates/results/tvshowsResults.hbs')),
  rank_show: Handlebars.compile(require('./templates/rank_show.hbs')),
  utils: Handlebars.compile(require('./templates/results/utils.hbs')),
}

module.exports = {
  welcome: {
    view: compiledTemplates.welcome,
    script: nop
  },
  tvshowSearch: {
    view: compiledTemplates.tvshowSearch,
    script: () => tvshowSearchScript(compiledTemplates.tvshowResults)
  },
  tvshowsSearch: {
    view: compiledTemplates.tvshowsSearch,
    script: () => tvshowsSearchScript(compiledTemplates.tvshowsResults)
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

  add_deltvshows: {
    view: compiledTemplates.add_deltvshows,
    script: () => add_deltvshowsScript()
  },
  createGroup: {
    view: compiledTemplates.createGroup,
    script: () => createGroupScript()
  },
  poptvshowsSearch: {
    view: compiledTemplates.poptvshowsSearchScript,
    script: () => poptvshowsSearchScript(compiledTemplates.poptvshowsResults, compiledTemplates.utils)
  },
  rank_show:{
    view: compiledTemplates.rank_show,
    script: () => rankScript()

  }
}
