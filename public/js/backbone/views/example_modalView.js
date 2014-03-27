var exModalView = Backbone.View.extend({

  initialize: function(){
    this.template = _.template(tpl.get('modal_example'));
  },

  onRender: function() {
    this.mdModal = $('.md-modal');
    this.mdModal.css({
      width: 'auto'
    });
  }

});