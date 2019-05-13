'use strict';
(function () {
  // function loaded() {
  //   document.addEventListener('touchmove', function(e){ e.preventDefault(); });
  //   myScroll = new iScroll('scroller');
  // }
  // document.addEventListener('DOMContentLoaded', loaded);

  var scrollContent;
  var scrollContent2;
  
  function loaded() {
      scrollContent = new iScroll('wrapper');
      scrollContent2 = new iScroll('wrapper2');
  }
  loaded();
  setTimeout(function(){
    $('.form__dropdown-list').hide().css('opacity', '1');
  },500)
  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

  document.addEventListener('DOMContentLoaded', loaded, false);

  CommunicateEmbedded.ready(function () {
    var quiz = [];

    $('.form__dropdown-value').on('touchend', function () {
      var $this = $(this);
      var $thisDropdown = $this.closest('.form__field');
      if ($thisDropdown.hasClass('form__field--disabled') && $thisDropdown.prev('.form__field').hasClass('form__field--disabled')) return;
      $this.siblings('.form__dropdown-list').fadeToggle();
      $thisDropdown.find('.form__dropdown').toggleClass('form__dropdown--opened');
      $('.overlay').toggleClass('overlay--visible');
      $thisDropdown.toggleClass('form__field--active');
      if ($this.closest('.form__field').hasClass('form__field--first')) {
        scrollContent.refresh();    
      } else scrollContent2.refresh();
    });

    $('.form__dropdown-item')
    .on('touchstart', function (e) {
      $(this).attr('data-moved', ''+e.originalEvent.touches[0].pageY+'');
    })
    .on('touchend', function (e) {
      var diff = Math.abs(e.originalEvent.changedTouches[0].pageY - $(this).attr('data-moved'));
      if (diff < 10) {
        var $this = $(e.target);
        var thisPrep = $this.data('preparat');
        var text = $this.text();
        var $thisDropdown = $this.closest('.form__field');
        // если не заполнено первое поле ничего не происходит
        if($thisDropdown.hasClass('form__field--disabled') && $thisDropdown.prev('.form__field').hasClass('form__field--disabled')) return;
        
        // при выборе нового препарата убираем варианты упаковок
        if(!$thisDropdown.find('.form__dropdown-list--boxes').length) $('.form__dropdown-item--visible').removeClass('form__dropdown-item--visible');

        if(!$this.closest('.form__dropdown-list').hasClass('form__dropdown-list--boxes') && text !== $thisDropdown.find('.form__dropdown-value').text()) {
          $thisDropdown.next().addClass('form__field--disabled');
          $('.form__dropdown-list--boxes').siblings('.form__dropdown-value').text('---');
          $('textarea').val('');
          $('.form__row:nth-child(2)').find('textarea').attr('disabled', 'disabled').closest('.form__field').removeClass('form__field-shadowed');
        }

        // отображение выбранного варианта
        $('.form__dropdown-list--boxes').find('.form__dropdown-item[data-preparat-box="'+ thisPrep +'"]').addClass('form__dropdown-item--visible');
        $thisDropdown.removeClass('form__field--disabled').data('value', text).find('.form__dropdown-value').text(text);

        $('.form__dropdown-list').fadeOut();
        $thisDropdown.find('.form__dropdown').removeClass('form__dropdown--opened');
        $thisDropdown.removeClass('form__field--active');
        $('.overlay').removeClass('overlay--visible');

        // если первые два поля заполнены - разблокируются остальные
        if(!$('.form__row').find('.form__field--disabled').length) {
          $('.form__row:nth-child(2)').find('textarea').removeAttr('disabled').closest('.form__field').addClass('form__field-shadowed');
          $('.btn--disabled').removeClass('btn--disabled');
        } 
      }
    });

    $('textarea').on('touchend', function () {
      var $this = $(this);

      if ($this.is(':disabled') && $('.form__field--disabled').length) return;

      if($this.hasClass('form__contacts') && !$this.val().length) {
        $this.val('+7 ')
      }

      if($(this).closest('.form__field').siblings('.form__field').length) $this.removeAttr('disabled').closest('.form__field').addClass('form__field-shadowed');;
    })

    $('textarea').on('focusin', function () {
      $('.container').addClass('scroll-top');
      $('.overlay').addClass('overlay--visible');
      $(this).closest('.form__field').addClass('form__field--active');
    })

    $('textarea').on('focusout', function () {
      var $this = $(this);
      var text = $this.val();
      var $thisDropdown = $this.closest('.form__field');

      $('.container').removeClass('scroll-top');
      $thisDropdown.data('value', text);
      $(this).closest('.form__field').removeClass('form__field--active');
      $('.overlay').removeClass('overlay--visible');
    })

    $('.js-save').on('touchend', function () {
      if($(this).hasClass('btn--disabled')) return;
      setTimeout(function () {
        var name = $('.form').attr('name');
        var obj = {};
        $('.form__field').each(function () {
          var $this = $(this);
          var fieldName = $this.data('name');
          var fieldValue = $this.data('value');
          obj['' + fieldName + ''] = fieldValue;
        })

        quiz.push(obj);
        var answer = JSON.stringify(quiz);
        answer = answer.replace(/:/g, "$$$");

        CommunicateEmbedded.fillQuestionary(name, answer);
        CommunicateEmbedded.setData(name, answer);

        $('.btn').addClass('btn--disabled');
        $('.btn-refresh').addClass('btn-refresh--visible');
      }, 500)
    })

    $('.js-refresh').on('touchend', function () {
      $(this).removeClass('btn-refresh--visible');
      $('.form__dropdown-list').siblings('.form__dropdown-value').text('---');
      $('.form__dropdown-list--boxes').siblings('.form__dropdown-value').text('Заполните предыдущее поле для продолжения');
      $('.form__row').first().find('.form__field').addClass('form__field--disabled');
      $('textarea').val('');
      $('.form__row:nth-child(2)').find('textarea').attr('disabled', 'disabled').closest('.form__field').removeClass('form__field-shadowed');
    })
  });
})();