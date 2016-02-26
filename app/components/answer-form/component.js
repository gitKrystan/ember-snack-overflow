import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],
  answerFormIsVisible: false,
  warnNeedsAuthor: false,
  warnNeedsContent: false,
  stopSubmit: false,

  hideAnswerForm() {
    this.set('answerFormIsVisible', false);
  },

  actions: {
    showAnswerForm() {
      this.set('answerFormIsVisible', true);
    },
    hideAnswerForm() {
      this.hideAnswerForm();
    },

    saveAnswer() {
      var inputAuthor = this.get('author');
      var inputContent = this.get('content');

      if (!inputAuthor) {
        this.set('warnNeedsAuthor', true);
        this.set('stopSubmit', true);
      }

      if (!inputContent) {
        this.set('warnNeedsContent', true);
        this.set('stopSubmit', true);
      }

      if (this.get('stopSubmit')) {
        return this.set('stopSubmit', false);
      } else {
        var params = {
          author: inputAuthor,
          content: inputContent,
          question: this.get('question'),
          dateCreated: new Date().getTime()
        };

        this.set('author', '');
        this.set('content', '');

        this.sendAction('saveAnswer', params);
        this.hideAnswerForm();
      }
    }
  }
});
