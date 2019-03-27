$(document).ready(function() {
  svg4everybody({});

  $('.nav-toggle').on('click', function() {
    $('body').toggleClass('open');
  });

  // Video
  function findVideos() {
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseMediaURL(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
  }

  function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();

  // Menu search
  let searchBtn = $('.user-info__item--search');
  let searchForm = $('.page-header__search');

  searchBtn.on('click', function() {
    searchForm.toggleClass('active');
  })

  $(document).on('click', function(e) {
    if (!searchBtn.is(e.target) && searchBtn.has(e.target).length === 0 && !searchForm.is(e.target) && searchForm.has(e.target).length === 0) {
      searchForm.removeClass('active')
    }
  })

  // Count 
  let count = $('.count');

  count.each(function() {
    if ($(this).text() > 0) {
      $(this).parent().addClass('not-empty');
    } else {
      $(this).parent().removeAttr('href');
    }
  })

  // Filter dropdown

  $('.filter-category__item-title').on('click', function() {
    $(this).parent().toggleClass('active');
  })


  // Filter price range
  var stepsSlider = document.querySelector('.filter-price__line');
  var input0 = document.querySelector('.filter-price__control--from input');
  var input1 = document.querySelector('.filter-price__control--to input');
  var inputs = [input0, input1];

  noUiSlider.create(stepsSlider, {
    start: [20, 80],
    connect: true,
    format: wNumb({
      decimals: 2,
      mark: '.',
      thousand: ' ',
    }),
    range: {
      'min': [0],
      '10%': [10, 1],
      '50%': [80, 5],
      '80%': 150,
      'max': 2000
    }
  });

  stepsSlider.noUiSlider.on('update', function(values, handle) {
    inputs[handle].value = values[handle];
  });

  // Listen to keydown events on the input field.
  inputs.forEach(function(input, handle) {

    input.addEventListener('change', function() {
      stepsSlider.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function(e) {

      var values = stepsSlider.noUiSlider.get();
      var value = Number(values[handle]);

      // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
      var steps = stepsSlider.noUiSlider.steps();

      // [down, up]
      var step = steps[handle];

      var position;

      // 13 is enter,
      // 38 is key up,
      // 40 is key down.
      switch (e.which) {

        case 13:
          stepsSlider.noUiSlider.setHandle(handle, this.value);
          break;

        case 38:

          // Get step to go increase slider value (up)
          position = step[1];

          // false = no step is set
          if (position === false) {
            position = 1;
          }

          // null = edge of slider
          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value + position);
          }

          break;

        case 40:

          position = step[0];

          if (position === false) {
            position = 1;
          }

          if (position !== null) {
            stepsSlider.noUiSlider.setHandle(handle, value - position);
          }

          break;
      }
    });
  });

});
