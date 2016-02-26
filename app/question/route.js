import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('question', params.question_id);
  },

  actions: {
    saveAnswer(params) {
      // var route = this;
      var question = params.question;
      var newAnswer = this.store.createRecord('answer', params);
      question.get('answers').addObject(newAnswer);
      newAnswer.save().then(function() {
        return question.save();
        // route.refresh();
      });
    },

    updateQuestion(params, question) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          question.set(key,params[key]);
        }
      });
      question.save();
    },

    deleteQuestion(question) {
      var route = this;
      var answerDeletions = question.get('answers').map(function(answer) {
        return answer.destroyRecord();
      });
      Ember.RSVP.all(answerDeletions)
         .then(function() {
         return question.destroyRecord();
      }).then(function() {
        route.transitionTo('index');
      });
    }
  }
});
