  let calendar = document.querySelector('.v-calendar');

  $(".calendar").on('click', function () {
		$(".v-calendar").addClass('mini');
	});

	var sections = $('section')
	  , nav = $('.calendar');

	$(".v-info").on('scroll', function () {
		if ($(".v-info").scrollTop() > 0) {
			$(".v-calendar").addClass('mini');
		} else {
			$(".v-calendar").removeClass('mini');
    }

    let calendarRect = calendar.getBoundingClientRect();
	  let curPos = calendarRect.top + calendarRect.height;

	  sections.each(function() {
	    let rect = this.getBoundingClientRect();
	    let style = window.getComputedStyle(this);
	    let top = rect.top - parseInt(style['margin-top'], 10);
	    let bottom = rect.bottom;
		
      if (curPos >= top && curPos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
      }
	  });
	});
	
	nav.find('a').on('click', function () {
	  var $el = $(this)
		, id = $el.attr('href');
	  
	  $(".v-info").animate({
		  scrollTop: $(id).offset().top
	  }, 500);
	  
	  return false;
	});