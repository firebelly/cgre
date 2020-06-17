from fabric.api import *
import os

env.hosts = ['cgre.firebelly.co']
env.user = 'firebelly'
env.remotepath = '/home/firebelly/webapps/cgre-staging'
env.git_branch = 'master'
env.warn_only = True

def production():
  env.hosts = ['cgre.com']
  env.user = 'cgre'
  env.remotepath = '/home/cgre/apps/cgre-production'
  env.git_branch = 'master'

def devsetup():
  print("Installing composer, yarn...\n")
  local('composer install')
  local('yarn')
  local('cp .env-example .env')
  print("OK DONE! Hello? Are you still awake?\nEdit your .env file with local credentials\nRun `yarn start` to compile & watch assets")

def deploy(composer='y', assets='y'):
  update()
  if composer != 'n':
    composer_install()
  # build and sync production assets
  if assets != 'n':
    local('yarn build:production')
    run('mkdir -p ' + env.remotepath + '/web/assets/dist')
    put('web/assets/dist', env.remotepath + '/web/assets/')

def update():
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))

def composer_install():
  with cd(env.remotepath):
    run('~/bin/composer install')
