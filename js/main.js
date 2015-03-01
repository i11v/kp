/* global SAILPLAY, SP, USER_EMAIL */
;(function (window, document, $, sailplay, Promise, userEmail) {
  /**
   * Today
   * @const
   */
  var TODAY = (function (date) { return [date.getDate(), date.getMonth(), date.getFullYear()].join(''); }(new Date()));

  var FORTUNE_DATA = {
    '122015': 'У вас на этой неделе все будет хорошо! ;)',
    '222015': '2 марта у вас все будет хорошо! ;)',
    '322015': '3 марта у вас все будет хорошо! ;)',
    '422015': '4 марта у вас все будет хорошо! ;)',
    '522015': '5 марта у вас все будет хорошо! ;)'
  };

  /**
   * Cookie manager
   * @type {{write, read, erase}}
   */
  var cookie = (function () {
    var _write = function (name, value, days) {
      var expires = ''
        , date;

      if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }

      document.cookie = name + "=" + value + expires + "; path=/";
    };

    var _read = function (name) {
      var nameEQ = name + "="
        , cookiesArray = document.cookie.split(';')
        , i, cookie;

      for (i = 0; i < cookiesArray.length; i++) {
        cookie = cookiesArray[i];

        while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(nameEQ) == 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }

      return null;
    };

    var _erase = function (name) {
      _write(name, "", -1);
    };

    return {
      write: _write,
      read: _read,
      erase: _erase
    };
  }());

  /**
   * SailPlay API
   *
   * @type {{init, login, userInfo, userHistory, setTags, getTags}}
   */
  var api = (function () {
    var partnerId, authHash, instance, user;

    return {
      init: function (id) {
        partnerId = id;

        return instance ? instance : new Promise(function (resolve, reject) {
          sailplay.send('init', { partner_id: id });

          sailplay.on('init.success', resolve);
          sailplay.on('init.error', reject);
        });
      },

      login: function (hash) {
        authHash = hash;

        return user ? user : new Promise(function (resolve, reject) {
          sailplay.send('login', hash);

          sailplay.on('login.success', resolve);
          sailplay.on('login.error', reject);
        });
      },

      userInfo: function () {
        return instance.then(user).then(function () {
          return new Promise(function (resolve, reject) {
            sailplay.send('load.user.info');

            sailplay.on('load.user.info.success', resolve);
            sailplay.on('load.user.info.error', reject);
          });
        })
      },

      userHistory: function () {
        return instance.then(user).then(function () {
          return new Promise(function (resolve, reject) {
            sailplay.send('load.user.history');

            sailplay.on('load.user.history.success', resolve);
            sailplay.on('load.user.history.error', reject);
          });
        });
      },

      setTags: function (tags) {
        window.SP.tags({
          action: 'add',
          tags: tags,
          email: userEmail
        })
      },

      getTags: function (cb) {
        window.SP.tags({
          action: 'list',
          email: userEmail,
          callback: cb
        })
      }
    }
  }());

  var quiz = (function () {
    var data = {
      '122015': {
        '1': {
          pic: 'img/slide4/image-2.png',
          question: 'ЧТО ИЗОБРАЖЕНО НА ФОТО?',
          variants: ['Броги', 'Сникерсы', 'Челси', 'Челси'],
          answer: 'Броги'
        },
        '2': {
          pic: 'img/slide4/image-2.png',
          question: 'ЧТО ИЗОБРАЖЕНО НА ФОТО?',
          variants: ['Броги', 'Сникерсы', 'Челси', 'Челси'],
          answer: 'Сникерсы'
        },
        '3': {
          pic: 'img/slide4/image-2.png',
          question: 'ЧТО ИЗОБРАЖЕНО НА ФОТО?',
          variants: ['Броги', 'Сникерсы', 'Челси', 'Челси'],
          answer: 'Челси'
        },
        '4': {
          pic: 'img/slide4/image-2.png',
          question: 'ЧТО ИЗОБРАЖЕНО НА ФОТО?',
          variants: ['Броги', 'Сникерсы', 'Челси', 'Челси'],
          answer: 'Дерби'
        }
      }
    };

    return {
      init: function () {
        // Init
      }
    }
  }());

  var fortune = (function () {
    return {
      show: function () {
        var $parent = $('[data-root-cookie]');

        $parent.addClass('hide-cookie-all');

        window.setTimeout(function () {
          $parent.addClass('show-cookie');
        }, 600);
      },

      read: function () {
        api.setTags(['Прочитал предсказание']);
        cookie.write('fortune', 'read', 1);
      }
    };
  }());

  var $body = $('body');

  // common slider
  $(document.body).addClass('scroll-enabled');

  var slideAnchors = [
      'slide-1',
      'slide-2',
      'slide-3',
      'slide-4',
      'slide-5',
      'slide-6',
      'slide-7'
    ]
    , bottomArrowTexts = [
      'Призы',
      'Зарабатывайте баллы',
      'Предсказания дня',
      'Викторина',
      'Наши лидеры',
      'Наши лидеры',
      ''
    ]
    , bodyClasses = [
      'body-slide-1',
      'body-slide-2',
      'body-slide-3',
      'body-slide-4',
      'body-slide-5',
      'body-slide-6',
      'body-slide-7'
    ];

  function setBottomArrowText(index) {
    $('[data-next-slide]')
      .text(bottomArrowTexts[index-1]);
  }

  function setRightNavigationActiveState(index) {
    var sideBarLinks = $('[data-navigation-container] .main-nav-item').removeClass('selected');

    sideBarLinks.eq(index - 1).addClass('selected');
  }

  setBottomArrowText(1);

  $('[data-scroll-container]').fullpage({
    anchors: slideAnchors,
    verticalCentered: false,
    easing: 'linear',
    scrollingSpeed: 300,
    css3: true,
    touchSensitivity: 0,
    onLeave: function (lastIndex, index) {
      currentSlideIndex = index;
      $(document.body).removeClass(bodyClasses.join(' ')).addClass(bodyClasses[index-1]);
      setBottomArrowText(index);
      setRightNavigationActiveState(index);
    }
  });

  $body
    .on('click', '[data-next-slide]',  function (e) {
      $.fn.fullpage.moveSectionDown();
      e.preventDefault();
    })
    .on('click', '[data-slide-num]', function (e) {
      var slideNum = parseInt($(this).attr('data-slide-num'));
      $.fn.fullpage.moveTo(slideNum);
      e.preventDefault();
    });


  // for 1 slide
  var $welcome = $('[data-root-welcome]');

  $body
    .on('click', '[data-reg-next]', function(e){
      $welcome
        .addClass('show-slide-1-complete');

      e.preventDefault();
    })
    .on('click', '[data-btn-history]', function(e){
      $welcome
        .addClass('show-slide-1-history');

      e.preventDefault();
    })
    .on('click', '[data-btn-close-history]', function(e){
      $welcome
        .removeClass('show-slide-1-history');

      e.preventDefault();
    })
    .on('click', '.sidebar__link', function(e){
      var $this = $(this),
        $target = $($this.attr('href'));

      if ($this.hasClass('selected')) return;

      $this
        .addClass('selected')
        .siblings().removeClass('selected');

      $target
        .show()
        .siblings().hide();

      e.preventDefault();
    })
    .on('click', '[data-reg-final]', function(e){
      $welcome.addClass('show-final');

      e.preventDefault();
    })
    .on('click', '.registration-popup__close', function(e){
      $(this).closest('.registration-popup').hide();
      e.preventDefault();

    })
    .on('click', '[data-show-popup]', function(e){
      $('.popup-what').show();
      e.preventDefault();
    })
    .on('click', '.popup-what__close', function(e){
      $(this).closest('.popup-what').hide();
      e.preventDefault();
    });

  $('[data-btn-hover]')
    .hover(
    function(){
      $('.more-link').addClass('high-link');
    },
    function(){
      $('.more-link').removeClass('high-link');
    }
  );

  $('#select1').selectize({
    create: false
  });

  $('#select22').selectize({
    create: false
  });

  $('#select3').selectize({
    create: false
  });


  // for 2 slide
  var $rootGift = $('[data-gift-root]')
    , timer;

  $('[data-gift-hover]')
    .hover(
    function () {
      var slideNumber = $(this).data('gift-hover');

      $rootGift
        .removeClass('show-start-point')
        .addClass('show-point-' + slideNumber);
    },
    function () {
      var slideNumber = $(this).data('gift-hover');

      $rootGift
        .removeClass('show-point-' + slideNumber)
        .removeClass('show-point-buttons')
        .addClass('show-start-point');
    }
  )
    .on('click', '[data-show-app-buttons]', function(e){
      $rootGift.addClass('show-point-buttons');

      e.preventDefault();
    });


  // for 3 slide
  $('[data-cookie-text]').text(FORTUNE_DATA[TODAY]);

  if (cookie.read('fortune') !== null) {
    fortune.show();
  }

  $body.on('click', '[data-cookie]', function (e) {
    e.preventDefault();

    fortune.show();
    fortune.read();
  });

  // for 4 slide
  var step = 1
    , $testRoot = $('[data-test-root]');

  $body
    .on('click', '[data-test-start], [data-test-btn]', function(e){
      $testRoot
        .removeClass('show-test-' + step)
        .removeClass('show-buttons');

      step += 1;
      $testRoot.addClass('show-test-' + step);
      $('.type-nav-' + (+step-2)).addClass('complete');

      setTimeout( function(){
        $testRoot.addClass('show-buttons');
      }, 400);

      e.preventDefault();
    });

  //api.init(1272).then(function () { return api.login('b07b23c438a21edb81da09ce58dfcab56a8d056b'); }).then(function (res) {
  //  console.log(res);
  //});

}(window, document, window.jQuery, window.SAILPLAY, vow.Promise, window.USER_EMAIL));
