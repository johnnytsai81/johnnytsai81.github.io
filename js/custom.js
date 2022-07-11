$(document).ready(function () {
	mainTitle();
	lazyImg();
	lazyVideo();
	cardInit();
	// $('.work-card-1').one('click', function () {
	// 	galleryStart1();
	// });
	// $('.work-card-2').one('click', function () {
	// 	galleryStart2();
	// });
	galleryBlog();
	initlightGallery();
	fadeInImg();
	fadeUpWord();
	fadeInUp();
	fadeOutWord();
	deleteDash();
	openMenu();
	scrollDown();
	zoomIn();
	copyCode();
	addCategoryLink();
});

$(window).on('load', function () {
	// 過場效果
	$('#loading').css('opacity', '0');
	$('.loading-easein').addClass("fadein-end");
});

// 首頁標題動畫效果
function mainTitle() {
	$('.banner-title').each(function () {
		$(this).on('inview', function (event, isInView) {
			if (isInView) {
				$(this).children('span').addClass("fadein-end");
			}
		});
	});
}

// 圖片延遲載入
function lazyImg() {
	const watcher = new IntersectionObserver(onEnterView)
	const lazyImages = document.querySelectorAll('img.lazy')
	for (let image of lazyImages) {
		watcher.observe(image) // 開始監視
	}

	function onEnterView(entries, observer) {
		for (let entry of entries) {
			if (entry.isIntersecting) {
				// 監視目標進入畫面
				const img = entry.target
				img.setAttribute('src', img.dataset.src) // 把值塞回 src
				img.removeAttribute('data-src')
				observer.unobserve(img) // 取消監視
			}
		}
	}
}

// 影片延遲載入
function lazyVideo() {
	$('video.lazy').each(function () {
		$(this).on('inview', function (event, isInView) {
			if (isInView) {
				var dataSrc = $(this).attr('data-src');
				$(this).attr('src', dataSrc);
				$(this).removeAttr('data-src')
			}
		});
	});
}

/* 幻燈片 */
function initlightGallery() {
	$("#lightgallery-1, #lightgallery-2").lightGallery({
		autoplayControls: false,
		exThumbImage: 'data-src',
		share: false,
		zoom: false,
		download: false,
		showThumbByDefault: false
	});
};


//圖往右滑的效果
function fadeInImg() {
	$('.fadein-img').each(function () {
		$(this).on('inview', function (event, isInView) {
			if (isInView) {
				$(this).addClass("fadein-end");
			}
		});
	});
}

//區塊向上滑的效果
function fadeInUp() {
	$('.fadeInUp').each(function () {
		$(this).on('inview', function (event, isInView) {
			if (isInView) {
				$(this).addClass("fadein-end");
			}
		});
	});
}

//放大的效果
function zoomIn() {
	$('.zoomIn').each(function () {
		$(this).on('inview', function (event, isInView) {
			if (isInView) {
				$(this).addClass("fadein-end");
			}
		});
	});
}

// 輪播圖字往上出現的效果
function fadeUpWord() {
	$('.fadeup-word, .fadeup-line, .fadeup-process').each(function () {
		$(this).on('inview', function (event, isInView) {
			if (isInView) {
				$(this).addClass("fadein-end");
			}
		});
	});
}

// 輪播圖字等過場結束才執行的效果
function fadeOutWord() {
	var visibleTime = 0;
	var visibleTime = setInterval(function () {
		if ($('#loading').css('opacity') == 0) {
			clearInterval(visibleTime);
		};
	}, 100);
}

// 點按卡片會出現彈跳視窗
function cardInit() {
	$('.work-card, .close-btn').on('click', function (event) {
		if ($(event.target).hasClass('show') || $(event.target).hasClass('new-window')) {
			$('.work-card').removeClass('show');
			$('html').css('overflow', 'auto');
		} else {
			$(this).addClass('show');
			$('html').css('overflow', 'hidden');
		};
	});
}



function galleryStart1() {
	var galleryThumbs = new Swiper(".home-work-thumb-1", {
		effect: "slide",
		slidesPerView: 3.5,
		slidesPerGroup: 1,
		spaceBetween: 16,
		observer: true,
		observeParents: true,
		freeMode: false,
		centeredSlides: true,
		centeredSlidesBounds: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
		lazy: {// 加了上面的 centeredSlides，則要加這一段，這樣下一張圖才不會因為不是可視狀態導致圖片不會載入
			loadOnTransitionStart: true,
			loadPrevNext: true,
			loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
		},
		breakpoints: {
			/* 不同斷點的slide設定 */
			576: {
				slidesPerView: 7, slidesPerGroup: 1, spaceBetween: 16,
				lazy: {
					loadOnTransitionStart: true,
					loadPrevNext: true,
					loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
				}
			},
			1024: {
				slidesPerView: 7, slidesPerGroup: 1, spaceBetween: 16,
				lazy: {
					loadOnTransitionStart: true,
					loadPrevNext: true,
					loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
				}
			}
		}
	});

	var galleryTop = new Swiper(".home-work-top-1", {
		speed: 600,
		effect: "slide",
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 16,
		observer: true,
		observeParents: true,
		lazy: {// 加了上面的 centeredSlides，則要加這一段，這樣下一張圖才不會因為不是可視狀態導致圖片不會載入
			loadOnTransitionStart: true,
			loadPrevNext: true,
			loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
		},
		navigation: {
			nextEl: ".swiper-button-next.swiper-button-next-1",
			prevEl: ".swiper-button-prev.swiper-button-prev-1",
		},
		thumbs: {
			swiper: galleryThumbs,
		}
	});

	console.log(galleryThumbs.slides.length)
	if (galleryThumbs.slides.length > galleryThumbs.params.slidesPerView) {
		galleryTop.on('slideChangeTransitionStart', function () {
			galleryThumbs.slideTo(galleryTop.activeIndex);
		});
	}
	else {
		galleryThumbs.$wrapperEl.addClass('justify-center');
		galleryThumbs.params.centeredSlides = false;
		galleryThumbs.params.centeredSlidesBounds = false;
		galleryThumbs.params.initialSlide = 0;
	}
};

function galleryStart2() {
	var galleryThumbs = new Swiper(".home-work-thumb-2", {
		effect: "slide",
		slidesPerView: 3.5,
		slidesPerGroup: 1,
		spaceBetween: 16,
		observer: true,
		observeParents: true,
		freeMode: false,
		centeredSlides: true,
		centeredSlidesBounds: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
		lazy: {// 加了上面的 centeredSlides，則要加這一段，這樣下一張圖才不會因為不是可視狀態導致圖片不會載入
			loadOnTransitionStart: true,
			loadPrevNext: true,
			loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
		},
		breakpoints: {
			/* 不同斷點的slide設定 */
			576: {
				slidesPerView: 7, slidesPerGroup: 1, spaceBetween: 16,
				lazy: {
					loadOnTransitionStart: true,
					loadPrevNext: true,
					loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
				}
			},
			1024: {
				slidesPerView: 7, slidesPerGroup: 1, spaceBetween: 16,
				lazy: {
					loadOnTransitionStart: true,
					loadPrevNext: true,
					loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
				}
			}
		}
	});

	var galleryTop = new Swiper(".home-work-top-2", {
		speed: 600,
		effect: "slide",
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 16,
		observer: true,
		observeParents: true,
		lazy: {// 加了上面的 centeredSlides，則要加這一段，這樣下一張圖才不會因為不是可視狀態導致圖片不會載入
			loadOnTransitionStart: true,
			loadPrevNext: true,
			loadPrevNextAmount: 1 // 這個值要跟 slidesPerGroup 相同
		},
		navigation: {
			nextEl: ".swiper-button-next.swiper-button-next-1",
			prevEl: ".swiper-button-prev.swiper-button-prev-1",
		},
		thumbs: {
			swiper: galleryThumbs,
		}
	});

	console.log(galleryThumbs.slides.length)
	if (galleryThumbs.slides.length > galleryThumbs.params.slidesPerView) {
		galleryTop.on('slideChangeTransitionStart', function () {
			galleryThumbs.slideTo(galleryTop.activeIndex);
		});
	}
	else {
		galleryThumbs.$wrapperEl.addClass('justify-center');
		galleryThumbs.params.centeredSlides = false;
		galleryThumbs.params.centeredSlidesBounds = false;
		galleryThumbs.params.initialSlide = 0;
	}
};

function galleryBlog() {
	var swiper3 = new Swiper("#home-blog", {
		slidesPerView: 1.2,
		slidesPerGroup: 1,
		spaceBetween: 20,
		speed: 600,
		autoplay: false,
		observer: true,
		observeParents: true,
		watchOverflow: true,
		pagination: {
			el: ".swiper-pagination-2",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next.swiper-button-next-2",
			prevEl: ".swiper-button-prev.swiper-button-prev-2",
		},
		breakpoints: {
			769: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 20
			},
			// when window width is >= 640px
			1025: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 20
			}
		}
	});
};

// 修正類別有空格造成網址錯誤
function deleteDash() {
	$('.line-hover, .arrow-hover').each(function () {
		var newText = $(this).children('span').text().replace('-', ' ');
		$(this).children('span').text(newText);
	});

	$('.category-title').each(function () {
		var newText = $(this).text().replace('-', ' ');
		$(this).text(newText);
	});
}

// 按menu按鈕時顯示open-menu
function openMenu() {
	$(window).on("resize", function () {
		doResize();
	}).resize();
	function doResize() {
		if ($(window).innerWidth() < 1024) {
			$('.burger-btn').on('click', function () {
				$(this).toggleClass('show');
				$(this).next().toggleClass('show');
			});
		}
	}
}

// 按scroll時自動往下
function scrollDown() {
	$('.scroll-btn-wrap').on('click', function () {
		$("html").animate(
			{
				scrollTop: $(".who-am-i").offset().top
			},
			800 //speed
		);
	});
}

// 把分類list改成下拉式選單
function selectList() {
	var listdata = $('.category-list').get(0).outerHTML;
	$(window).on("resize", function () {
		doResize();
	}).resize();
	function doResize() {

		if ($(window).innerWidth() < 1024) {

			$('.category-list-group li').each(function () {
				var listnumber = $(this).children('.category-list-count').text();
				$(this).children('.category-list-link').html(function () {
					return $(this).text() + '&nbsp;&nbsp;&nbsp;' + '(' + listnumber + ')';
				});

				var listlink = $(this).children('.category-list-link').attr('href');
				$(this).attr('value', listlink);

				var listname = $(this).children('.category-list-link').text();
				$(this).text(listname);

				var listhtml = $(this).get(0).outerHTML;
				listhtml = listhtml.replace(/^<li/, "<option");
				listhtml = listhtml.replace(/\/li>$/, "/option>");
				$(this).replaceWith(listhtml);
			});
			if ($('.category-list-first-item').length == 0) {
				$('.category-list').prepend('<option class="category-list-item category-list-first-item">全部</option>');
			}

			$('.category-list-group ul').each(function () {
				var html = $(this).get(0).outerHTML;
				html = html.replace(/^<ul/, "<select");
				html = html.replace(/\/ul>$/, "/select>");
				$(this).replaceWith(html);
			});

			$('.category-list').on("change", function () {
				location = this.value;
			});
		}
		else {
			$('.category-list').replaceWith(listdata);
		}
	}
}

// 新增code複製按鈕
function copyCode() {
	var snippets = document.querySelectorAll('figure.highlight');
	var htmlCopyButton = `
	<button class="codecopy-btn tooltipped tooltipped-sw" aria-label="複製">
	  <span class="icon-copy"></span>
	</button>`;
	snippets.forEach(snippet => {
		var parent = snippet.parentNode;
		var wrapper = document.createElement('div');

		parent.replaceChild(wrapper, snippet);
		wrapper.appendChild(snippet);

		wrapper.classList.add('code-highlight');
		wrapper.firstChild.insertAdjacentHTML('beforebegin', htmlCopyButton);

		var lang = (snippet.classList[1] || 'code').toUpperCase();
		wrapper.setAttribute('data-lang', lang);
	});
	var clipboard = new ClipboardJS('.codecopy-btn', {
		target: trigger => {
			return trigger.nextSibling;
		},
	});
	clipboard.on('success', e => {
		e.trigger.setAttribute('aria-label', '已複製!');
		e.clearSelection();
	});
	var btns = document.querySelectorAll('.codecopy-btn');

	btns.forEach(btn => {
		btn.addEventListener('mouseleave', e => {
			e.target.setAttribute('aria-label', '複製');
			e.target.blur();
		});

		btn.addEventListener('click', e => {
			e.preventDefault();
		});
	});
}

// 目錄列表可以點擊整個區塊
function addCategoryLink() {
	$(".category-list-item").on('click', function () {
		window.location = $(this).find("a").attr("href");
		return false;
	});
}

// 載入雲端字型
WebFontConfig = {
	google: {
		families: ['Lato:300,400,500,700,900']
	}
};