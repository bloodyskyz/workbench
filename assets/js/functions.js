$( document ).ready(function() {
	smoothScroll(200);
	workBelt();
	workLoad();
	clientStuff();
	$("header h1").fitText(1, {minFontSize:'20px', maxFontSize:'72px'});
	$(".biglink").fitText(1.5);

});

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event){
		var target = $( $(this).attr('href') );
		if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, duration);
		}
	});

}

function workBelt() {
	$('.thumb-unit').click(function(){
		$('.work-belt').css('left', '-100%');
		$('.work-container').show();
	});

	$('.work-return').click(function(){
		$('.work-belt').css('left', '0%');
		setTimeout(function() {$('.work-container').hide()}, 450);
	});
}

function workLoad(){
	$.ajaxSetup({cache: true});
	$('.thumb-unit').click(function(){
		var $this = $(this);
		newTitle = $this.find('strong').text();
		newFolder = $this.data('folder');
		var spinner='<div class="loader">Loading...</div>';
		var newHTML='work/'+newFolder+'.html';
		$('.project-title').text(newTitle);
		$('.project-load').html(spinner).load(newHTML);
	});
}

function clientStuff(){
	$('.client-unit').first().addClass('active-client');
	$('.client-logo').first().addClass('active-client');
	$('.clients-mobile-nav span').first().addClass('active-client');

	$('.client-logo, .clients-mobile-nav span').click(function(){
		var $this =  $(this);
		var siblings = $this.parent().children();
		var position = siblings.index($this);

		$('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
		$('.client-logo').removeClass('active-client').eq(position).addClass('active-client');
		$('.clients-mobile-nav span').removeClass('active-client').eq(position).addClass('active-client');

	});

	$('.client-control-next, .client-control-prev').click(function(){
		var $this = $(this);
		var curActive = $('.clients-belt').find('.active-client');
		var position = $('.clients-belt').children().index(curActive);
		var clientNum = $('.client-unit').length;
		
		var next = (position+1)%clientNum;
		if($this.hasClass('client-control-prev'))
			next = (position-1)%clientNum;
		$('.active-client').removeClass('active-client');
		$('.client-unit').eq(next).addClass('active-client');
		$('.client-logo').eq(next).addClass('active-client');
		console.log(next, curActive);
		
	});
};


(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );












