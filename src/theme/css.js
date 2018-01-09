
let $content = $('<div class="l-content" style="height: 0; visibility: hidden"></div>');
$('body').append($content);

let $style = $('<style></style>');
$('head').append($style);

$(window).resize(() => {
  css();
});
css();

export default function css() {
  let vw = document.body.clientWidth;
  let contentWidth = $content.width();

  /*$style.html(`
    .carousel--view-process .owl-item > *{
      width: ${processWidth/3}px
    }
    .carousel--view-process .owl-item:nth-child(5) > *{
      width: ${2*processWidth/3}px
    }
    @media (min-width: ${BREAKPOINTS.maxPhone + 1}px) {
      .carousel--view-gallery .carousel_item {
       
      }
      .carousel--view-gallery .slick-prev, .carousel--view-gallery .slick-next {
          left: ${Math.round(vw/2 - contentWidth/6) - 1}px;
      }
    }
    @media (max-width: ${BREAKPOINTS.maxPhone}px) {
      .carousel--view-gallery .carousel_item {
        width: ${vw - 50}px;
        transform: none;
      }
    }
  `);*/
}