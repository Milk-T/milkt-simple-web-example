$(function(){

  var template = $('#example-template').text();
  var templateFn = _.template(template);

  var stance = new MilkT(getItemInfo, 3);
  stance.send({itemId:27783})
        .done(function(data){
          console.log(data)
          var dom = templateFn(data)
          $('#milkt-wrap').append(dom)
        })
})


