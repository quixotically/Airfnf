# Airfnf

[Live version](http://www.airfnf.us/)

## Description
Airfnf is a website inspired by Airbnb, built on Rails and Backbone.

Search for listings in any location in the world, and when you find one you like, create an account and request to book it! You can filter listings further by Room Type, Price Range, and Accommodates. Hint: search New York and Richmond to find listings. As a host, all the requests for a listing will show up on your profile. Just click "Approve" on the one you want to approve, and all other requests will automatically be denied.

## Languages and dependencies

This project was written in Ruby, JavaScript, and jQuery, with the Rails and Backbone.js frameworks. Rails used a JSON API to send data to the Backbone frontend. Paperclip was used for uploading photos, and AWS was used for file storage.

## Implementation details

### Search

For each search, I fetch the collection of listings only once to improve runtime. After receiving this top level collection, I store this on my app's namespace and create a second collection for each filter applied. By having a second collection and creating it from the top level collection, I don't have to worry about users removing filters.

### Approving requests

In Rails, a request to approve a listing was accomplished using a transaction. In this transaction, the chosen request was approved while all others for the same listing were denied.

### Flash messages

I created a top-level method that accepts a message or an array of messages and a message type as arguments. Message type will determine whether the success or the error class is added to the HTML element, which affect styling. The function then renders the appropriate HTML, but only for a short time since I set a timeout. At timeout, I add back the hidden class and remove the error or success classes. I give the messages a fixed position and a positive z-index so that the user will be almost guaranteed to see them.

## Next Steps

- [ ] favicon
- [ ] Repopulate local listings upon scrolling the map
- [ ] Typeahead search bar
