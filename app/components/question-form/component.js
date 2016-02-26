import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],
  warnNeedsAuthor: false,
  warnNeedsContent: false,
  stopSubmit: false,

  verifyRequiredFields() {
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
  },

  actions: {
    saveQuestion() {
      this.verifyRequiredFields();

      if (this.get('stopSubmit')) {
        return this.set('stopSubmit', false);
      } else {
        var params = {
          author: this.get('author'),
          content: this.get('content'),
          notes: this.get('notes') || '',
          dateCreated: new Date().getTime()
        };

        this.set('author', '');
        this.set('content', '');
        this.set('notes', '');

        this.sendAction('saveQuestion', params);
      }
    },

    updateQuestion(question) {
      this.verifyRequiredFields();

      if (this.get('stopSubmit')) {
        return this.set('stopSubmit', false);
      } else {
        var params = {
          author: this.get('author'),
          content: this.get('content'),
          notes: this.get('notes') || '',
          dateUpdated: new Date().getTime()
        };

        this.set('author', '');
        this.set('content', '');
        this.set('notes', '');

        this.sendAction('updateQuestion', params, question);
      }
    }
  }
});
