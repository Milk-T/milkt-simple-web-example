$(function(){

  var template = $('#example-template').text();
  var templateFn = _.template(template);

  // var demo = new MilkT(demoSayHello, 3)
  // demo.send({name: 'michael'})
  //     .done(function(data){
  //       console.log(data)
  //     })

  var stance = new MilkT(getItemInfo, 3);
  stance.send({itemId:27783})
        .done(function(data){
          console.log(data)
          var dom = templateFn(data)
          $('#milkt-wrap').append(dom)
        })
})


