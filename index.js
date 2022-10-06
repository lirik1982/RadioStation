

//переключение по передачам
function getbroadselect(selectObject) {
  var value = selectObject.value;
  var y = document.getElementsByClassName('broadcast-list is-visible');

  var target1 = y[0];
  var target2 = document.querySelectorAll('.broadcast-list')[value];

  target1.classList.remove('is-visible');
  target2.classList.add('is-visible');
}

//переключение по плейлистам
function getplayselect(selectObject) {
  var value = selectObject.value;
  var y = document.getElementsByClassName('playlists-list is-visible');

  var target1 = y[0];
  var target2 = document.querySelectorAll('.playlists-list')[value];

  target1.classList.remove('is-visible');
  target2.classList.add('is-visible');
}




document.addEventListener("DOMContentLoaded", function () {


  //плавная прокрутка к якорю
  var $page = $('html, body');
  $('a[href*="#"]').click(function () {
    $page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
  });


  //Обработка нажатий...............
  let doc = document.querySelector('.body');
  doc.addEventListener('click', check);
  function check(e) {
    const path = e.currentTarget.dataset.path;
    console.log(e.target.id);
    switch (e.target.id) {
      case "header-top-buttons__enter":
        console.log("Активируем меню входа");
        document.querySelector("#enterform").classList.add("is-visible");
        e.stopImmediatePropagation();
        break;
      case "header-gray__enter":
        console.log("Активируем меню входа");
        document.querySelector("#enterform").classList.add("is-visible");
        e.stopImmediatePropagation();
        break;
      case "header-top-buttons__seach":
        console.log("Нажата иконка поиска");
        document.querySelector('#header-top-seachform').classList.toggle("is-active");
        break;
      case "header-top-buttons__seach-ico":
        console.log("Нажата иконка поиска");
        document.querySelector('#header-top-seachform').classList.toggle("is-active");
        break;
      case "header-bottom-interactive-wrapper":
        console.log("Нажата строка что в эфире");
        document.querySelector('#header-bottom-interactive').classList.toggle("is-visible");
        document.querySelector('#header-bottom-interactive-wrapper__ico').classList.toggle("rotate-element");
        break;
      case "seach_input":
        console.log("Нажато поле поиска");
        break;
      case "header__burger":
        console.log("Нажат burger");
        document.querySelector('#header-top-navbar').classList.toggle("is-visible");
        document.querySelector('#header-bottom-navbar').classList.toggle("is-visible");
        break;
      case "header__burger-ico":
        console.log("Нажат burger");
        document.querySelector('#header-top-navbar').classList.toggle("is-visible");
        document.querySelector('#header-bottom-navbar').classList.toggle("is-visible");
        break;

      case "close__burger":
        console.log("Закрыть burger");
        document.querySelector('#header-top-navbar').classList.remove("is-visible");
        document.querySelector('#header-bottom-navbar').classList.remove("is-visible");
        break;

      case "cast-btn":
        console.log("Нажата показать еще");
        document.querySelectorAll('.cast-listitem').forEach(function (castitem) {
          castitem.classList.add("is-visible");
        });
        document.querySelector('#cast-btn').classList.remove("is-visible");
        break;

      default:
        console.log("Нет совпадений - закрываем открытые");
        document.querySelector('#header-top-seachform').classList.remove("is-active");
        document.querySelector('#header-top-navbar').classList.remove("is-visible");
        document.querySelector('#header-bottom-navbar').classList.remove("is-visible");
        document.querySelector('#header-bottom-interactive').classList.remove("is-visible");
        document.querySelector('#header-bottom-interactive-wrapper__ico').classList.remove("rotate-element");
        break;

    }
  }


  //аккордеон в разделе "гости"
  $(function () {
    $("#accordion").accordion({
      heightStyle: "content",
      icons: false,
      collapsible: true,
      active: 0,
      header: '.guests-listitem-header'
    });

    $(".refresh").click(function () {
      $("#accordion").accordion({
        collapsible: true,
        active: false
      });
    })
  });


  //скроллинг радиокнопок на маленьких разрешениях
  const scrollContainer = document.querySelector(".playlists-radioframe");
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
  });
  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });
  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    scrollContainer.scrollLeft = scrollLeft - walk;
  });



  $(".playlists-listitem").keypress(function (e) {
    if (e.keyCode == 13) {
      if (jQuery(this).children('.playlists-listitem__playbtn').hasClass('playing')) {
        $('.stopwave').fadeOut();
        jQuery(this).children('.playlists-listitem__playbtn').removeClass('playing');
        $("#favicon").attr("href", "img/favicon.png");
        //останавливаем проигрыватель
        jQuery('#my-hidden-player').get(0).pause();
      } else {
        //если данная мелодия не проигрывается в текущий момент
        //выключаем все остальные кнопки
        jQuery('.wave').removeClass('playing');
        //добавляем класс ON
        jQuery(this).children('.playlists-listitem__playbtn').addClass('playing');
        $('.stopwave').fadeIn();
        $("#favicon").attr("href", "img/icons8-проиграть-запись.gif");

        var pl = jQuery('#my-hidden-player').get(0);
        //останавливаем текущую мелодию
        pl.pause();
        //устанавливаем новый источник
        pl.src = jQuery(this).children('.playlists-listitem__playbtn').attr('data-src');
        //включаем проигрывание
        pl.play();
      }
    }
  });


  $(".playlists-listitem").click(function () {
    if (jQuery(this).children('.playlists-listitem__playbtn').hasClass('playing')) {
      $('.stopwave').fadeOut();
      jQuery(this).children('.playlists-listitem__playbtn').removeClass('playing');
      $("#favicon").attr("href", "img/favicon.png");
      //останавливаем проигрыватель
      jQuery('#my-hidden-player').get(0).pause();
    } else {
      //если данная мелодия не проигрывается в текущий момент
      //выключаем все остальные кнопки
      jQuery('.wave').removeClass('playing');
      //добавляем класс ON
      jQuery(this).children('.playlists-listitem__playbtn').addClass('playing');
      $('.stopwave').fadeIn();
      $("#favicon").attr("href", "img/icons8-проиграть-запись.gif");

      var pl = jQuery('#my-hidden-player').get(0);
      //останавливаем текущую мелодию
      pl.pause();
      //устанавливаем новый источник
      pl.src = jQuery(this).children('.playlists-listitem__playbtn').attr('data-src');
      //включаем проигрывание

      //Avoid the Promise Error
      setTimeout(function () {
        pl.play();
      }, 150);
    }
  });



  jQuery('.wave').bind("click", function (event) {
    if (!jQuery(this).hasClass('playlists-listitem__playbtn')) {
      if (jQuery(this).hasClass('playing')) {
        //если данная мелодия уже проигрывается
        //снимаем флаг ON

        $('.stopwave').fadeOut();
        jQuery(this).removeClass('playing');
        $("#favicon").attr("href", "img/favicon.png");

        //останавливаем проигрыватель
        jQuery('#my-hidden-player').get(0).pause();
      } else {
        //если данная мелодия не проигрывается в текущий момент
        //выключаем все остальные кнопки
        jQuery('.wave').removeClass('playing');
        //добавляем класс ON
        jQuery(this).addClass('playing');
        $('.stopwave').fadeIn();
        $("#favicon").attr("href", "img/icons8-проиграть-запись.gif");

        var pl = jQuery('#my-hidden-player').get(0);
        //останавливаем текущую мелодию
        pl.pause();
        //устанавливаем новый источник
        pl.src = jQuery(this).attr('data-src');
        //включаем проигрывание
        //Avoid the Promise Error
        setTimeout(function () {
          pl.play();
        }, 150);

      }
    } else {

      //если нажата кнопка внутри блока playlists

      if (jQuery(this).children('.playlists-listitem__playbtn').hasClass('playing')) {
        $('.stopwave').fadeOut();
        jQuery(this).children('.playlists-listitem__playbtn').removeClass('playing');
        $("#favicon").attr("href", "img/favicon.png");
        //останавливаем проигрыватель
        jQuery('#my-hidden-player').get(0).pause();
      } else {
        //если данная мелодия не проигрывается в текущий момент
        //выключаем все остальные кнопки
        jQuery('.wave').removeClass('playing');
        //добавляем класс ON
        jQuery(this).children('.playlists-listitem__playbtn').addClass('playing');
        $('.stopwave').fadeIn();
        $("#favicon").attr("href", "img/icons8-проиграть-запись.gif");

        var pl = jQuery('#my-hidden-player').get(0);
        //останавливаем текущую мелодию
        pl.pause();
        //устанавливаем новый источник
        pl.src = jQuery(this).children('.playlists-listitem__playbtn').attr('data-src');
        //включаем проигрывание

        //Avoid the Promise Error
        setTimeout(function () {
          pl.play();
        }, 150);
      }

    }
  });

  jQuery('.stopwave').bind("click", function (event) {
    jQuery('.wave').removeClass('playing');
    $('.stopwave').fadeOut();
    $("#favicon").attr("href", "img/favicon.png");

    var pl = jQuery('#my-hidden-player').get(0);
    //останавливаем текущую мелодию
    pl.pause();
  });







  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() != 0) {
        $('#toTop').fadeIn();
      } else {
        $('#toTop').fadeOut();
      }
    });
    $('#toTop').click(function () {
      $('body,html').animate({ scrollTop: 0 }, 800);
    });
  });




  const element = document.querySelector("#custom-select");
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
    placeholder: true,
    itemSelectText: '',
  });
  document.querySelector('.choices__item--selectable').textContent = "Дмитрий Гутенберг";



  //Обработка нажатий на форме авторизации вне контейнера...............

  $('#enderform').hasClass('not-hidden')
  {
    let form = document.querySelector('.enterform');
    form.addEventListener('click', check);
    function check(z) {
      const path = z.currentTarget.dataset.path;
      console.log(z.target.id);
      switch (z.target.id) {
        case "enterform__close-btn":
          console.log("Нажата кнопка закрытия формы");
          document.querySelector("#enterform").classList.remove("is-visible");
          break;

        case "enterform__close-img":
          console.log("Нажата иконка кнопки закрытия формы");
          document.querySelector("#enterform").classList.remove("is-visible");
          break;

        case "enterform__button":
          console.log("Нажата кнопка войти");
          //          document.querySelector("#enterform").classList.remove("not-hidden");
          break;

        default:
          console.log("Нет совпадений");
          break;
      }
    }
  }



  const swiper = document.querySelector('#about-swiper');
  let { clientWidth } = document.body;
  let yourSlider;

  const swiperInit = () => {
    console.log('winsize=' + clientWidth);
    if (clientWidth > 1319) {
      const yourSlider = new Swiper('.about-swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,

        // пагинация
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // навигация
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } else if (clientWidth >= 1023) {
      const yourSlider = new Swiper('.about-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,

        // пагинация
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // навигация
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    else if (clientWidth >= 767) {
      const yourSlider = new Swiper('.about-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,

        // пагинация
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // навигация
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    else if (clientWidth < 768) {
      const yourSlider = new Swiper('.about-swiper', {
        slidesPerView: 2,
        spaceBetween: 13,
        loop: true,

        // пагинация
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // навигация
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }


  const resizeSwiper = () => {
    if (clientWidth !== document.body.clientWidth) {
      clientWidth = document.body.clientWidth;

      if (yourSlider) {
        yourSlider.destroy();
      }

      swiperInit();
    }
  }
  swiperInit();
  window.addEventListener('resize', resizeSwiper);



  const validation__enter = new JustValidate('.enterform');
  validation__enter
    .addField('#enter__login', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Логин слишком короткий',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Логин слишком длинный',
      },
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      }
    ])
    .addField('#enter__password', [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      }
    ]);

  const validation__about = new JustValidate('.about-form');
  validation__about
    .addField('#about__message', [
      {
        rule: 'minLength',
        value: 10,
        errorMessage: 'Поподробнее',
      },
      {
        rule: 'maxLength',
        value: 300,
        errorMessage: 'Сообщение слишком длинное',
      },
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
    ])

    .addField('#about__name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя слишком короткое',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Имя слишком длинное',
      },
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
    ])
    .addField('#about__email', [
      {
        rule: 'required',
        errorMessage: 'Введите Email',
      },
      {
        rule: 'email',
        errorMessage: 'Проверьте Email',
      }
    ])

    .onSuccess((event) => {
      validation__about.form.submit();
    });


  const $btn = document.querySelector('#about-form__button'),
    $checkbox = document.querySelector('#about-cb');

  $checkbox.addEventListener('change', () => {
    if ($checkbox.checked) {
      $btn.disabled = false;
    }
    else {
      $btn.disabled = true;
    }
  });



  $(document).ready(function () {
    $(".guests-item").hide(); // Скрытое содержимое
    $(".guests-item.is-on").fadeIn(); // Показ первого контента таба
  });



  document.querySelectorAll('.guests-listitem-content__link').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (e) {
      $('.guests-item').hide('slow');
      const path = e.currentTarget.dataset.path;
      document.querySelectorAll('.guests-listitem-content__link').forEach(function (btn) {
        btn.classList.remove('is-on');
      });
      e.currentTarget.classList.add('is-on');
      document.querySelectorAll('.guests-item').forEach(function (tabsBtn) {
        tabsBtn.classList.remove('is-on');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('is-on');
      $('.guests-item.is-on').fadeIn('slow');

      if (clientWidth < 768)
        document.querySelector('#guests-info').scrollIntoView({ behavior: 'smooth' })
    });
  });



});
