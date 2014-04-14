# <3 http://addyosmani.com/blog/building-backbone-js-apps-with-ruby-sinatra-mongodb-and-haml/

require 'sinatra'
require 'mongo'
require 'open-uri'
require 'net/http'
require 'json'

require './secret.rb'

DB = Mongo::Connection.new.db('gists_db')

get '/' do
  erb :index, :attr_wrapper => '"', :locals => {}
end

get '/api/populate' do
  tmp = open('https://api.github.com/users/jpetto/gists', http_basic_authentication: [TOKEN, 'x-oauth-basic']).read

  # if tmp is over 10KB it's a Tempfile, otherwise it's a string
  gist_data = (tmp.is_a?(Tempfile)) ? JSON.parse(tmp.read) : JSON.parse(tmp)

  gist_data.to_json
end

get '/api/gists' do
  # get a local gist
  DB.collection('gists').find.to_a.map{|t| from_bson_id(t)}.to_json
end

# test call to make sure updating github works
get '/api/test' do
  uri = URI('https://api.github.com/gists/10336308')

  req = Net::HTTP::Patch.new(uri)
  req.basic_auth TOKEN, 'x-oauth-basic'

  form_data = { 'description' => 'ASWM: CW/HW - Basic Backbone Todo List!' }.to_json

  req.body = form_data

  res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) do |http|
    http.request(req)
  end

  case res
  when Net::HTTPSuccess, Net::HTTPRedirection
    error = 'yay!'
  else
    error = res.value
  end

  error
end

post '/api/gists' do
  # store gist in local db
  oid = DB.collection('gists').insert(JSON.parse(request.body.read.to_s))

  { :_id => oid.to_s }.to_json
end

put '/api/gists/:id' do
  # store payload
  payload = JSON.parse(request.body.read.to_s)

  remote_error = ''

  # get the local gist
  gist = DB.collection('gists').find_one(to_bson_id(params[:id]))

  # update local gist
  DB.collection('gists').update({ '_id' => to_bson_id(params[:id]) }, { '$set' => payload.reject{|k,v| k == '_id'} })

  # update remote gist if description changed
  if payload['description'] != gist['description']
    uri = URI('https://api.github.com/gists/' + gist['github_id'])

    req = Net::HTTP::Patch.new(uri)
    req.basic_auth TOKEN, 'x-oauth-basic'

    # only update description
    gist_data = { 'description' => payload['description'] }.to_json

    req.body = gist_data

    res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) do |http|
      http.request(req)
    end

    case res
    when Net::HTTPSuccess, Net::HTTPRedirection
      # all good
    else
      remote_error = res.value
    end
  end

  # maybe return the updated document from mongo as well?
  { :remote_error => remote_error }.to_json
end

def to_bson_id(id)
  BSON::ObjectId.from_string(id)
end

def from_bson_id(obj)
  obj.merge({ '_id' => obj['_id'].to_s })
end
