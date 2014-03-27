var ModalView = Backbone.View.extend({

  initialize: function() {
    this.template = _.template(tpl.get('modal_layout'));
    console.log('new modal');
  },

  events: {
    'click [data-action="close-modal"]': 'close',
    'click #overlay': 'close'
  },

  close: function(e) {
    this.overlay.removeClass('md-overlay md-show');
    this.closeModal.removeClass('md-show');
    this.modal.removeClass('md-show');
    this.modal.removeAttr('style');
    this.$body.removeAttr('style');
    this.contentRegion.close();
  },

  show: function(view) {
    this.view = view;
    this.render();
  },

  onRender: function() {
    this.$body = $('body');
    this.overlay = this.$el.find('#overlay');
    this.closeModal = this.$el.find('[data-action="close-modal"]');
    this.modal = this.$el.find('.md-modal');

    this.contentRegion.show(this.view);

    this.$body.css({
      overflow: 'hidden'
    });

    this.overlay.addClass('md-overlay md-show');
    this.closeModal.addClass('md-show');
    this.modal.addClass('md-show');
  }

  // render: function(){
  //   $(this.el).html(this.template());
  //   return this;
  // }

});