# Phase 4: Reviewing Guests and Hosts

## Rails
### Models
ReviewFromGuest
ReviewFromHost

### Controllers
Api::ReviewFromGuestsController
Api::ReviewFromHostsController

### Views
listings/review_from_guests.json.jbuilder
users/review_from_hosts.json.jbuilder
users/review_from_guests.json.jbuilder

## Backbone
### Models
ReviewFromGuest
ReviewFromHost

### Collections
ReviewFromGuests
ReviewFromHosts

### Views
* ReviewsShow (composite view, contains ReviewsFromGuests/Hosts subviews)
* ListingReviewsShow (subview of ListingShow)

## Gems/Libraries
