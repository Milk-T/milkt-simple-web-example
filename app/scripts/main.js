$(function(){

  var template = $('#milkt-sayhello-template').text();
  var templateFn = _.template(template);

  var demo = new MilkT(companyLineList, 4)
  demo.send({
    check:'GOVERNMENT',
    condition:'COMMENT', 
    coordinate:JSON.stringify({
      latitude:31.909628,
      longitude:118.78152
    }),
    cityCode:'310100',
    page:JSON.stringify({
      pageNum:0,
      pageSize:10
    })
  })
      .done(function(data){
        // var dom = templateFn(data)
        // $('#milkt-wrap').append(dom)
        console.log(data)
      })

  // var stance = new MilkT(getItemInfo, 3);
  // stance.send({itemId:27783})
  //       .done(function(data){
  //         console.log(data)
  //         var dom = templateFn(data)
  //         console.log(dom)
  //         $('#milkt-wrap').append(dom)
  //       })
})


