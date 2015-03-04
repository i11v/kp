/* global SAILPLAY */
;(function (window, document, $, sailplay, Promise, PM) {
  /**
   * Today
   * @const
   */
  var TODAY = (function (date) { return [date.getDate(), date.getMonth(), date.getFullYear()].join(''); }(new Date()));

  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1)
      , sURLVariables = sPageURL.split('&')
      , sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1];
      }
    }
  }

  var PARTNER_ID = getUrlParameter('partner_id');
  var AUTH_HASH = getUrlParameter('auth_hash');

  PM.addAuthorizedUrl([
    'http://localhost:3000',
    'http://my-kupivip.ru:8080',
    'http://kupivip.ru',
    'http://sailplay.ru'
  ]);

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
    ],
    '322015': [
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
    ],
    '422015': [
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
   * User info
   */
  var userInfo = (function () {
    var historyItemTmpl = function (entry) {
      var tpl = '<div class="history-bl-item">' +
                    '<div class="his-item-text">' + entry.name + '</div>' +
                    '<div class="his-item-date">' + entry.date + '</div>' +
                    '<div class="his-item-value">' + (entry.points > 0 ? ('+' + entry.points) : entry.points) + '</div>' +
                '</div>';

      return tpl;
    };

    return {
      show: function (data) {
        var user = {
              name: data[0].user.name,
              points: data[0].user_points.total
            }
          , history = data[1].map(function (item) {
              var date = new Date(item.action_date)
                , day = date.getDate()
                , month = date.getMonth() + 1
                , entry = {};

              entry.date = (day < 10 ? '0' + day : day) + '.' + (month < 10 ? '0' + month : month) + '.' + date.getFullYear();
              entry.name = entry.name ? entry.name : 'Начисление баллов';
              entry.points = item.points_delta;

              return entry;
            });

        console.log(data[0]);

        $('[data-history-list]').html(history.map(function (item) { return historyItemTmpl(item); }).join(''));
        $('[data-user-name]').text(user.name);
        $('[data-total-points]').text(user.points);
        $('[data-root-welcome]').addClass('show-slide-1-complete');
      }
    }
  }());

  /**
   * Cookie manager
   */
  var cookie = (function () {
    return {
      write: function (name, value, days) {
        var expires = ''
          , date;

        if (days) {
          date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
      },

      read: function (name) {
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
      },

      erase: function (name) {
        this.write(name, "", -1);
      }
    };
  }());

  /**
   * SailPlay API
   */
  var api = (function () {
    var partnerId, authHash;

    return {
      init: function (id) {
        partnerId = id;

        return new Promise(function (resolve, reject) {
          sailplay.send('init', { partner_id: id });

          sailplay.on('init.success', resolve);
          sailplay.on('init.error', reject);
        });
      },

      login: function (hash) {
        authHash = hash;

        return new Promise(function (resolve, reject) {
          sailplay.send('login', hash);

          sailplay.on('login.success', resolve);
          sailplay.on('login.error', reject);
        });
      },

      userInfo: function () {
        return new Promise(function (resolve, reject) {
          sailplay.send('load.user.info');

          sailplay.on('load.user.info.success', resolve);
          sailplay.on('load.user.info.error', reject);
        });
      },

      userHistory: function () {
        return new Promise(function (resolve, reject) {
          sailplay.send('load.user.history');

          sailplay.on('load.user.history.success', resolve);
          sailplay.on('load.user.history.error', reject);
        });
      },

      setTags: function (tags) {
        return new Promise(function (resolve, reject) {
          sailplay.send('tags.add', tags);

          sailplay.on('tags.add.success', resolve);
          sailplay.on('tags.add.auth.error', reject);
          sailplay.on('tags.add.error', reject);
        });
      },

      loadLeaderboard: function () {
        return new Promise(function (resolve, reject) {
          sailplay.send('leaderboard.load');

          sailplay.on('leaderboard.load.success', resolve);
          sailplay.on('leaderboard.load.error', reject);
        });
      }
    }
  }());

  /**
   * Quiz
   */
  var quiz = (function () {
    var todayQuiz = QUIZ_DATA[TODAY]
      , answersCount = todayQuiz.length
      , correctAnswersCount = 0
      , $testRoot = $('[data-test-root]')
      , step = 2;

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


    return {
      render: function () {
        var questionsHtml = ''
          , answerIdx = 0;

        for (; answerIdx < answersCount; answerIdx++) {
          questionsHtml += answerTmpl(answerIdx + 1, todayQuiz[answerIdx].pic, todayQuiz[answerIdx].question);
        }

        $(questionsHtml).insertAfter('[data-test-cover]');
      },

      setAnswers: function (idx) {
        var variants = todayQuiz[idx].variants;

        $('.test-btn.first').text(variants[0]);
        $('.test-btn.second').text(variants[1]);
        $('.test-btn.third').text(variants[2]);
        $('.test-btn.fourth').text(variants[3]);
      },

      start: function () {
        $testRoot
          .removeClass('show-test-1')
          .addClass('show-test-2')
          .addClass('show-buttons');

        $('.type-nav-1').addClass('complete');
        this.setAnswers(0);
        api.setTags(['Начал тест'])
      },

      next: function (answer) {
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

          this.finish(correctAnswersCount);
        } else {
          $('.type-nav-' + (step)).addClass('complete');
          this.setAnswers(step - 1);
          $testRoot.addClass('show-test-' + ++step);
        }

        setTimeout(function () {
          $testRoot.addClass('show-buttons');
        }, 400);
      },

      finish: function (count) {
        $('[data-correct-anwers-count]').text(count);
        $('[data-plural-count]').text(count === 1 ? 'вопрос' : count > 4 ? 'вопросов' :  'вопроса');

        $testRoot
          .removeClass('show-test-1')
          .addClass('show-test-7');
      }
    }
  }());

  /**
   * Fortune cookie
   */
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

  var leaderboard = (function () {
    var entry = function (place, name, points) {
      var tpl = '<div class="lider-item">' +
                    '<div class="lider-item__number">' + place + '</div>' +
                    '<div class="lider-item__name">' + name + '</div>' +
                    '<div class="lider-item__points">' + points + '</div>' +
                '</div>';

      return tpl;
    };

    var table = function (data) {
      return data.slice(0, 8).map(function (item) {
        return entry(item.rank, item.full_name, item.score)
      }).join('');
    };

    return {
      render: function (data) {
        var members = data.members.members
          , board = [members.slice(0, 8), members.slice(8, 16), members.slice(16, 24), members.slice(24, 32)];

        $('[data-leaderboard-first][data-leaderboard-left]').html(table(members.slice(0, 8)));
        $('[data-leaderboard-first][data-leaderboard-right]').html(table(members.slice(8, 16)));
        $('[data-leaderboard-second][data-leaderboard-left]').html(table(members.slice(16, 24)));
        $('[data-leaderboard-second][data-leaderboard-right]').html(table(members.slice(24, 32)));
      }
    }
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
    .on('click', '[data-auth]', function (e) {
      e.preventDefault();

      PM.postMessage('http://my-kupivip.ru:8080', 'auth', 'SAILPLAY_AUTH');
    })
    .on('click', '[data-reg]', function (e) {
      e.preventDefault();

      PM.postMessage('http://my-kupivip.ru:8080', 'reg', 'SAILPLAY_REG');
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

  if (!!PARTNER_ID && !!AUTH_HASH) {
    api.init(PARTNER_ID)
      .then(function (res) {
        return api.login(AUTH_HASH).then(function () {
          Promise.all([api.userInfo(), api.userHistory()]).then(userInfo.show);
        });
      })
      .then(api.loadLeaderboard)
      .then(leaderboard.render)
      .catch(console.error.bind(console));
  }

}(window, document, window.jQuery, window.SAILPLAY, vow.Promise, PM));
