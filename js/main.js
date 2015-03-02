/* global SAILPLAY, SP, USER_EMAIL */
;(function (window, document, $, sailplay, Promise, userEmail) {
  /**
   * Today
   * @const
   */
  var TODAY = (function (date) { return [date.getDate(), date.getMonth(), date.getFullYear()].join(''); }(new Date()));

  /**
   * Fortune data
   * @type {Object}
   */
  var FORTUNE_DATA = {
    '122015': 'У вас на этой неделе все будет хорошо! ;)',
    '222015': '2 марта у вас все будет хорошо! ;)',
    '322015': '3 марта у вас все будет хорошо! ;)',
    '422015': '4 марта у вас все будет хорошо! ;)',
    '522015': '5 марта у вас все будет хорошо! ;)'
  };

  /**
   * Quiz data
   * @type {Object}
   */
  var QUIZ_DATA = {
    '122015': [
      {
        pic: 'img/slide4/image-2.png',
        question: 'Что изображено на фото?',
        variants: ['Броги', 'Сникерсы', 'Челси', 'Дерби'],
        answer: 'Броги'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Что изображено на фото?',
        variants: ['Броги', 'Сникерсы', 'Челси', 'Дерби'],
        answer: 'Сникерсы'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Что изображено на фото?',
        variants: ['Броги', 'Сникерсы', 'Челси', 'Дерби'],
        answer: 'Челси'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Что изображено на фото?',
        variants: ['Броги', 'Сникерсы', 'Челси', 'Дерби'],
        answer: 'Дерби'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Что изображено на фото?',
        variants: ['Броги', 'Сникерсы', 'Челси', 'Дерби'],
        answer: 'Дерби'
      }
    ],
    '222015': [
      {
        pic: 'img/slide4/image-2.png',
        question: 'Какой сегодня день недели?',
        variants: ['Понедельник', 'Вторник', 'Среда', 'Четверг'],
        answer: 'Понедельник'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Какой сегодня день недели?',
        variants: ['Пятница', 'Понедельник', 'Суббота', 'Воскресенье'],
        answer: 'Понедельник'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Какой сегодня день недели?',
        variants: ['Среда', 'Вторник', 'Понедельник', 'Воскресенье'],
        answer: 'Понедельник'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Какой сегодня день недели?',
        variants: ['Понедельник', 'Воскресенье', 'Вторник', 'Суббота'],
        answer: 'Понедельник'
      },
      {
        pic: 'img/slide4/image-2.png',
        question: 'Какой сегодня день недели?',
        variants: ['Понедельник', 'Воскресенье', 'Вторник', 'Суббота'],
        answer: 'Понедельник'
      }
    ]
  };

  /**
   * Answer template
   * @param {number} num
   * @param {string} pic
   * @param {string} question
   * @returns {string}
   */
  var answerTmpl = function (num, pic, question) {
    var tpl = '<div class="test-bl__item-' + (num + 1) + '">' +
                  '<div class="test-bl__img" style="background-image: url(' + pic + ');"></div>' +
                  '<div class="test-bl__text">' +
                      '<h1 class="test-bl__text-title">' + question + '</h1>' +
                      '<div class="test-bl__text-descr">' +
                          'Участвуйте в викторине от KupiVip. Каждый день будут появляться новые вопросы на интересные темы.<br/>' +
                          'За правильные ответы Вы будете получать 10 баллов' +
                      '</div>' +
                  '</div>' +
              '</div>';

    return tpl;
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
    var todayQuiz = QUIZ_DATA[TODAY]
      , answersCount = todayQuiz.length
      , correctAnswersCount = 0
      , $testRoot = $('[data-test-root]')
      , step = 2;

    var _render = function () {
      var questionsHtml = ''
        , answerIdx = 0;

      for (; answerIdx < answersCount; answerIdx++) {
        questionsHtml += answerTmpl(answerIdx + 1, todayQuiz[answerIdx].pic, todayQuiz[answerIdx].question);
      }

      $(questionsHtml).insertAfter('[data-test-cover]');
    };

    var _setAnswers = function (idx) {
      var variants = todayQuiz[idx].variants;

      $('.test-btn.first').text(variants[0]);
      $('.test-btn.second').text(variants[1]);
      $('.test-btn.third').text(variants[2]);
      $('.test-btn.fourth').text(variants[3]);
    };

    var _start = function () {
      $testRoot
        .removeClass('show-test-1')
        .addClass('show-test-2')
        .addClass('show-buttons');

      $('.type-nav-1').addClass('complete');
      _setAnswers(0);
      api.setTags(['Начал тест'])
    };

    var _next = function (answer) {
      var index = step - 2;

      $testRoot
        .removeClass('show-test-' + step)
        .removeClass('show-buttons');

      if (todayQuiz[index].answer === answer) {
        correctAnswersCount++;
        api.setTags(['Правильно ответил на вопрос']);
      }

      if (step > answersCount) {
        cookie.write('quiz', correctAnswersCount, 1);
        api.setTags(['Прошёл тест']);

        _finish(correctAnswersCount);
      } else {
        $('.type-nav-' + (step)).addClass('complete');
        _setAnswers(step - 1);
        $testRoot.addClass('show-test-' + ++step);
      }

      setTimeout(function () {
        $testRoot.addClass('show-buttons');
      }, 400);
    };

    var _finish = function (count) {
      $('[data-correct-anwers-count]').text(count);
      $('[data-plural-count]').text(count === 1 ? 'вопрос' : count > 4 ? 'вопросов' :  'вопроса');

      $testRoot
        .removeClass('show-test-1')
        .addClass('show-test-7');
    };

    return {
      render: _render,
      setAnswers: _setAnswers,
      start: _start,
      next: _next,
      finish: _finish
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
  var quizCookie = cookie.read('quiz');

  if (quizCookie !== null) {
    quiz.finish(parseInt(quizCookie));
  } else {
    quiz.render();
  }

  $body.on('click', '[data-test-start]', function (e) {
    e.preventDefault();

    quiz.start();
  });

  $body
    .on('click', '[data-test-btn]', function (e) {
      e.preventDefault();

      quiz.next($(this).text());
    });

  //api.init(1272).then(function () { return api.login('b07b23c438a21edb81da09ce58dfcab56a8d056b'); }).then(function (res) {
  //  console.log(res);
  //});

}(window, document, window.jQuery, window.SAILPLAY, vow.Promise, window.USER_EMAIL));
