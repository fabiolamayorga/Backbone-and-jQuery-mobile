// a very simple model with a single property: checked
var FontProperties = Backbone.Model.extend({
    defaults: {
        size : 40,
        bold : false,
        italic : false,
        underline : false,
        red : 0,
        green : 0,
        blue : 0,
        shadow : true,
        text : 'Hello Backbone'
    }
});

var FontView = Backbone.View.extend ({
    events: {
        'change [name="font-size"]': 'onChangeFontSize',
        'change [name="b"]': 'onChangeFontWeight',
        'change [name="i"]': 'onChangeFontStyle',
        'change [name="u"]': 'onChangeTextDecoration',
        'change [name="red"]' : 'onChangeRed',
        'change [name="green"]' : 'onChangeGreen',
        'change [name="blue"]' : 'onChangeBlue',
        'change [name="shadow"]' : 'onChangeShadow',
        'change [name="text"]' : 'onChangeText',

    },

    initialize: function(){
        this.listenTo(this.model, 'change', this.render);
        //console.log(this.model)
    },

    render: function(){
        var changed = this.model.get('size'),
            boldWeight = this.model.get('bold'), 
            italic = this.model.get('italic'),
            underline = this.model.get('underline'),
            red = this.model.get('red'),
            green = this.model.get('green'),
            blue = this.model.get('blue'),
            shadow = this.model.get('shadow'),
            text = this.model.get('text');

        this.$('[name="font-size"] option[value="'+changed+'px"]').prop('selected',true);
        this.$('[name="font-size"]').selectmenu('refresh');
        this.$('[name="b"]').prop('checked', boldWeight).checkboxradio('refresh');
        this.$('[name="i"]').prop('checked', italic).checkboxradio('refresh');
        this.$('[name="u"]').attr('checked', underline).checkboxradio('refresh');
        this.$('[name="red"]').attr('value',red).slider('refresh');
        this.$('[name="green"]').attr('value',green).slider('refresh');
        this.$('[name="blue"]').attr('value',blue).slider('refresh');
        this.$('[name="shadow"]').prop('checked',shadow).flipswitch('refresh');
        this.$('[name="text"]').attr('value',text).textinput('refresh');

        this.$('.preview').html(this.$('[name="text"]').val());
        this.$('.preview').css({
            "font-size" : changed,
            "font-weight" : boldWeight ? 'bold' : 'normal',
            "font-style" : italic ? 'italic' : 'normal',
            "text-decoration" : underline ? 'underline' : 'none',
            "color" : "rgb(" + red +","+ green+","+blue+")",
            "text-shadow" : shadow ? '1px 1px 4px #000' : 'none'
        });
    },

    onChangeFontSize : function(e){
        this.model.set('size', $(e.target).val());
    },

    onChangeFontWeight : function(e){
        this.model.set('bold', $(e.target).prop('checked'));
    },

    onChangeFontStyle : function(e){
        this.model.set('italic', $(e.target).prop('checked'));
    },

    onChangeTextDecoration : function(e){
        this.model.set('underline', $(e.target).prop('checked'));
    },

    onChangeRed : function(e){
        this.model.set('red', $(e.target).val());
    },

    onChangeGreen : function(e){
        this.model.set('green', $(e.target).val());
    },

    onChangeBlue : function(e){
        this.model.set('blue', $(e.target).val());
    },

    onChangeShadow : function(e){
        this.model.set('shadow', $(e.target).prop('checked'));
    },

    onChangeText : function(e){
        this.model.set('text', $(e.target).val());
    },

});

$(document).on('pageinit', '#fontEdit', function () {
    var view = new FontView({
        el: $(this),
        model: new FontProperties()
    });

    // render the view to update the UI
    view.render();
});