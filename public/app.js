window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.autocompleter.add(m.data); 
    };
  }
};
$(document).ready(function(){
  App.initialize();
});


App.Routers.Main = Backbone.Router.extend({
  
  routes: {
    "" : "main"
  },

  main: function (event) {
    console.log("main route activated");
    var view = new App.Views.Search();
    $("#container").html(view.render().el);
  }

});


App.Views.Search = Backbone.View.extend({

  id: "search",

  template: function(){ return "<form><input type='text' id='search_bar'>Type in search here</input></form>"},

  events: {
    'keyup #search_bar': 'search'
  },

  render: function(){
    $(this.el).html(this.template());
    return this;
  },

  search: function(){
    var word = $("#search_bar").val();
    App.autocompleter.complete(word);
    var result = App.autocompleter.complete(word);
    var div = "<div>";
    $.each(result, function(index, item) {
    //   $("#results").append(new App.Views.Results({model: item}));
    div+=("<li><a href=\"http://en.wikipedia.org/wiki/"+item+"\">"+item+"</a></li>");
    })
    div += "</div>";
    $("#results").html(div);
  },

})


// App.Views.Results = Backbone.View.extend({

//   id: "result",
  
//   template: function(){return "<li class='link'><a href=\"http://en.wikipedia.org/wiki/"+this.model.title+"\">"+this.model.title"</a></li>"},
  
//   render: function() {
//     $(this.el).html(this.template());
//     return this;
//   }

// })


