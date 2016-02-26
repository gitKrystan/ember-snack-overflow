import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('question', {reload: true})
      .then(function(questions) {
        return questions.sortBy('date').reverse();
      }
    );
  },

  actions: {
    saveQuestion(params) {
      var route = this;
      var newQuestion = this.store.createRecord('question', params);
      newQuestion.save()
      .then(function() {
        route.refresh();
      }).catch(e => {
          console.log(e.errors);
        }
      );
    }
  }
});
