# Airfnf

[Heroku link][heroku]

[heroku]: http://airfnf.herokuapp.com/

## Minimum Viable Product
Airfnf is a clone of Airbnb built on Rails and Backbone.

Users can:
- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create listings
- [x] Request to book listings
- [x] Approve bookings
- [ ] Review guests
- [ ] Review hosts

Anyone can:
- [x] Search for listings by Location
- [x] Filter search further by Room Type, Price Range, and Accommodates
- [x] View listings
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
collections, but it will fetch from the new `search` route. The view will also be able to be filtered further.

[Details][phase-four]

### Phase 5: Maps, Filepicker, and Oauth (~2 days)
I'll start by looking up the Google Maps API to implement map functionality into my SearchResults view. Then, I'll use Filepicker to enable users to upload their own listings and profile pictures. Lastly, I will enable users to sign in through third party sites like Twitter.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Repopulate local listings upon scrolling the map
- [x] Logo
- [ ] Modal view for user sign in and sign up
- [ ] Require sign-in only for certain actions
- [ ] Save listing to a wish list
- [ ] View wish lists on user profiles
- [ ] Instant book feature
- [ ] Multiple sessions/session management
- [x] User avatars
- [ ] Typeahead search bar

[phase-one]: ./Proposal/docs/phases/phase1.md
[phase-two]: ./Proposal/docs/phases/phase2.md
[phase-three]: ./Proposal/docs/phases/phase3.md
[phase-four]: ./Proposal/docs/phases/phase4.md
[phase-five]: ./Proposal/docs/phases/phase5.md
