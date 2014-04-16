# Personal Gist Catalog

Have you ever tried to go back and find that one excellent gist you made a couple years back? Yeah, it's
not really easy. What if you could run a simple little local catalog of all your gists? And what if
it not only supported searching on the description, but also allowed tagging of gists? And you could
pull up all gists belonging to a specific tag? Wouldn't that be nice? I sure think so.

(Let's just pretend [gistboxapp](http://www.gistboxapp.com/) is overkill, k? Great.)

## Pre-requisites

1. MongoDB installed and running
2. ruby >= 2.0.0

## Installation

1. Clone the repo somewhere handy.
2. Run `bundle install` to make sure you've got all the necessary jewelery.
3. Put your GitHub user name in the appropriate place in `secret-sample.rb`.
4. Create a **Personal access token** in your [GitHub applications preferences](https://github.com/settings/applications),
paste it in the appropriate place in `secret-sample.rb`, and rename the file to `secret.rb`.
5. Run the app by typing `ruby app.rb` in your console.

## Caching Gists

Before using the app, you'll need to pull down your gists from GitHub to cache them in your local
MongoDB. Just click the *Cache Those Gists* button. After a couple seconds, you should see your
gists listed. Private gists have a gold background.

You can click the *Cache Those Gists* button again later to pull down any gists that may have been
created since you last used the app.

## Editing Gists

Clicking the *Edit* button in a gist listing will populate the form on the right. (The *ID* and
*GitHub ID* fields are there for debugging purposes.) You can edit the description, which will
update both your local copy of the gist *and* the actual gist on GitHub. Don't clear this field
and hit *Edit Gist* by accident!

## Coming Soon ##

1. Add categories (think tags) to gists by adding them line by line in the *Categories*
box.

2. Search gists by either category or description.

3. Show all gists in a given category by clicking the category name.
