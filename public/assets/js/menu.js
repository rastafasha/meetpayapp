$(function(){
   $('#mostrar-menu').on('click',function(){
       $('.menu-principal').toggleClass('mostrar-menu-principal');
       $('#top').toggleClass('visible');
   });
});


$(function(){
   $('#pin').on('click',function(){
       $('.quehacer').toggleClass('mostrar-quehacer');
       $('.mostrar-quehacer2').toggleClass('quehacer2');
       $('.mostrar-quehacer3').toggleClass('quehacer3');
   });
});
$(function(){
   $('#pin2').on('click',function(){
       $('.quehacer2').toggleClass('mostrar-quehacer2');
       $('.mostrar-quehacer').toggleClass('quehacer');
       $('.mostrar-quehacer3').toggleClass('quehacer3');
   });
});

$(function(){
   $('#pin3').on('click',function(){
       $('.quehacer3').toggleClass('mostrar-quehacer3');
       $('.mostrar-quehacer').toggleClass('quehacer');
       $('.mostrar-quehacer2').toggleClass('quehacer2');
       
   });
});





$(function(){
   $('.dragg').on('click',function(){
       $('.traking').toggleClass('mostrar-traking');
       $('.infotrack').animate({bottom: '40%'}), 14000;
       
   });
});
