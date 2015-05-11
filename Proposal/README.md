# Airbnb Clone

[Heroku link][heroku]

[heroku]: 

## Minimum Viable Product
Airbnb Clone is a clone of Airbnb built on Rails and Backbone.

Users can:
- [ ] Create accounts
- [ ] Create sessions (log in)
  [ ] Create listings
  [ ] Approve bookings
  [ ] Review guests
  [ ] Request to book listings
  [ ] Review hosts

Anyone can:
- [ ] Search for listings by Location, Date, and Guest Count
- [ ] Filter search further by Room Type, Price Range, and Size
- [ ] View listings
- [ ] Drag the map to reveal local listings

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Listing Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create listings using a simple form in a Rails view. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Viewing Users and Listings (~2 days)
I will add API routes to serve listing and user data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to view listings and other users, all inside a single Backbone app. I also plan to integrate Filepicker for file upload so users can add images to their profiles and listings.

[Details][phase-two]

### Phase 3: Request Creation and Approval  (~1-2 days)
By the end of this phase, users will be able to request to book a listing, and hosts will be able to select a single request while Rails automatically denies all other requests.

[Details][phase-three]

### Phase 4: Reviewing Guests and Hosts (~2 days)
I'll start by creating ReviewFromGuest and ReviewFromHost models, since each type of review contains differing data. Then, I'll create Backbone models and collections of each type of review and create review subviews. By the end of this phase, hosts will be able to create reviews of guests using a simple form in a Rails view. Guests will be able to create reviews of listings, which belong to hosts.

[Details][phase-four]

### Phase 5: Searching for Listings and Filtering (~2 days)
I'll need to add a `search` route to the Listings controller. On the
Backbone side, there will be a `SearchResults` composite view has `ListingsIndex` subview. This view will use plain old `listings`
collections, but it will fetch from the new `search` route. The view will also be able to be filtered further.


[Details][phase-five]

### Bonus Features (TBD)
  [ ] Repopulate local listings upon scrolling the map
  [ ] Save listing to a wish list
  [ ] View wish lists on user profiles
  [ ] Instant book feature
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
