var CustomFixtureAdapter = DS.FixtureAdapter.extend({
  fixturesForType: function(type) {
    if (!type.FIXTURES) {
      type.FIXTURES = [];
		}
    return this._super(type);
  },
  createRecord: function(store, type, record) {
    var adapter = this;
    return this._loadRelationships(record).then(function() {
      return adapter._super(store, type, record);
    });
  },
  updateRecord: function(store, type, record) {
    var adapter = this;
    return this._loadRelationships(record).then(function() {
      return adapter._super(store, type, record);
    });
  },
  deleteRecord: function(store, type, record) {
    var adapter = this;
    return this._loadRelationships(record).then(function() {
      return adapter._super(store, type, record);
    });
  },
  _loadRelationships: function(record) {
    var relationshipPromises = {};
 
    record.eachRelationship(function(key, _) {
      relationshipPromises[key] = record.get(key);
    });
 
    return Ember.RSVP.hash(relationshipPromises);
  },
  toString: function() {
    return "CustomFixtureAdapter: " + this._super();
  }
});

DS.CustomFixtureAdapter = CustomFixtureAdapter;