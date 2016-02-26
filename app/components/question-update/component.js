import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],
  questionFormIsVisible: false,
  warnNeedsAuthor: false,
  warnNeedsContent: false,
  stopSubmit: false,

  hideQuestionForm() {
    this.set('questionFormIsVisible', false);
  },

  actions: {
    showQuestionForm() {
      this.set('questionFormIsVisible', true);
    },
    hideQuestionForm() {
      this.hideQuestionForm();
    },

    updateQuestion(question) {
      if (question.get('author') === '') {
        this.set('warnNeedsAuthor', true);
        this.set('stopSubmit', true);
      }

      if (question.get('content') === '') {
        this.set('warnNeedsContent', true);
        this.set('stopSubmit', true);
      }

      if (this.get('stopSubmit')) {
        return this.set('stopSubmit', false);
      } else {
        var params = {
          author: this.get('author'),
          content: this.get('content'),
          notes: this.get('notes') || '',
          dateCreated: this.get('dateCreated'),
          dateUpdated: new Date().getTime()
        };

        this.set('author', '');
        this.set('content', '');
        this.set('notes', '');

        this.sendAction('updateQuestion', params, question);
        this.hideQuestionForm();
      }
    },

    deleteQuestion(question) {
      this.sendAction('deleteQuestion', question);
    }
  }
});
