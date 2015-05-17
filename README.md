# Airfnf

[Heroku link][heroku]

[heroku]: http://airfnf.herokuapp.com/

## Minimum Viable Product
Airfnf is a clone of Airbnb built on Rails and Backbone.

Users can:
- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create listings
- [ ] Request to book listings
- [ ] Approve bookings
- [ ] Review guests
- [ ] Review hosts

Anyone can:
- [ ] Search for listings by Location, Date, and Guest Count
- [ ] Filter search further by Room Type, Price Range, and Size
- [ ] View listings
- [ ] Drag the map to reveal local listings

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./Proposal/docs/views.md
[schema]: ./Proposal/docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Listing Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at App Academy. By the end of this phase, users will be able to create listings using a simple form in a Rails view. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Viewing Users and Listings (~2 days)
I will add API routes to serve listing and user data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to view listings and other users, all inside a single Backbone app.

[Details][phase-two]

### Phase 3: Request Creation and Approval  (~1-2 days)
By the end of this phase, users will be able to request to book a listing, and hosts will be able to select a single request while Rails automatically denies all other requests.

[Details][phase-three]

### Phase 4: Searching for Listings and Filtering (~2 days)
I'll need to add a `search` route to the Listings controller. On the
Backbone side, there will be a `SearchResults` composite view has `ListingsIndex` subview. This view will use plain old `listings`
collections, but it will fetch from the new `search` route. The view will also be able to be filtered further. I will use Geocoder to implement map functionality.

[Details][phase-four]

### Phase 5: Reviewing Guests and Hosts (~2 days)
I'll start by creating a Rails Review model. Then, I'll create Backbone Review models and collections and create Review subviews. By the end of this phase, hosts and guests will be able to review each other using a simple form in a Rails view.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Repopulate local listings upon scrolling the map
- [ ] Logo
- [ ] Require sign-in only for certain actions
- [ ] Save listing to a wish list
- [ ] View wish lists on user profiles
- [ ] Instant book feature
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead search bar

[phase-one]: ./Proposal/docs/phases/phase1.md
[phase-two]: ./Proposal/docs/phases/phase2.md
[phase-three]: ./Proposal/docs/phases/phase3.md
[phase-four]: ./Proposal/docs/phases/phase4.md
[phase-five]: ./Proposal/docs/phases/phase5.md
