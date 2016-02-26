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

    saveQuestion() {
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
          notes: this.get('notes') || '',
          dateCreated: new Date().getTime(),
          dateUpdated: new Date().getTime()
        };

        this.set('author', '');
        this.set('content', '');
        this.set('notes', '');

        this.sendAction('saveQuestion', params);
        this.hideQuestionForm();
      }
    }
  }
});
