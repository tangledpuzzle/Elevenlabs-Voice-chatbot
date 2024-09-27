
/*

$('.clinical__popup-block-scroll-content').each(function () {
	let item = new SimpleBar(this, {
		autoHide: false,
		// scrollbarMaxSize: 30,
		scrollbarTouchEvents: true,
	});
	$(this).data('scrollbar', item);
})

function resetScroll() {
	$('.section-content .simplebar-content-wrapper').animate({scrollTop:0}, 300, 'swing');
}

*/

const mobileBreakpoint = 1000;

function isMobileSize() {
	return document.body.offsetWidth < mobileBreakpoint;
}

function isDesktopSize() {
	return !isMobileSize();
}

const popupHanderls = {
	retryHandler: function () {
		console.log('retryHandler');
	},
};


class PopupWindows {

	constructor() {
		const ctx = this;

		this.page = document.body;
		this.wrapper = document.querySelector('.popup-wrapper');
		this.popups = document.querySelectorAll('.popup-block');

		document.querySelectorAll('.popup-btn').forEach(popupBtn => {
			popupBtn.addEventListener('click', () => {
				const popupSelector = popupBtn.getAttribute('data-selector');
				this.show(popupSelector);
			})
		});

		document.querySelectorAll('.popup-close').forEach(popupClose => {
			popupClose.addEventListener('click', ()=> {
				this.hide();
				const handlerName = popupClose.getAttribute('data-fn');
				if ( handlerName && popupHanderls[handlerName] ) {
					popupHanderls[handlerName]();
				}
			});
		});

	}

	show(popupSelector) {
		const popupBlock = document.querySelector(popupSelector);
		if ( !popupBlock ) {
			return false;
		}
		this.hide();
		this.page.classList.add('scroll-lock');
		this.wrapper.classList.add('is-on');
		popupBlock.classList.add('is-on');
	}

	hide() {
		this.page.classList.remove('scroll-lock');
		this.popups.forEach(popup => popup.classList.remove('is-on'));
		this.wrapper.classList.remove('is-on');
	}

}

class VolumeControl {

	constructor() {
		const ctx = this;

		this.videoItem = document.querySelector('.doctor-avatar__video');
		this.mobileBtn = document.querySelector('.avatar-controls__mobile-btn');
		this.controlContent = document.querySelector('.avatar-controls__content');
		this.volumeMinBtn = document.querySelector('.avatar-controls__min');
		this.volumeMaxBtn = document.querySelector('.avatar-controls__max');
		this.volumeMuteBtn = document.querySelector('.avatar-controls__content-mute');
		this.sliderFill = document.querySelector('.avatar-controls__slider-fill');
		this.sliderBullet = document.querySelector('.avatar-controls__slider-bullet');
		this.rangeControl = document.querySelector('#volume-range');

		this.prevVolume = 10;

		this.volumeMuteBtn.addEventListener('click', () => {
			if ( this.volumeMuteBtn.classList.contains('is-on') ) {
				this.setVolume(this.prevVolume);
			} else {
				this.setVolume(0);
			}
		});

		this.volumeMinBtn.addEventListener('click', () => {
			this.setVolume( (this.videoItem.volume * 100) - 5);
		});
		this.volumeMaxBtn.addEventListener('click', () => {
			this.setVolume( (this.videoItem.volume * 100) + 5);
		});

		this.mobileBtn.addEventListener('click', () => {
			this.mobileBtn.classList.toggle('is-on');
			this.controlContent.classList.toggle('is-on');
		});

		this.videoItem.onvolumechange = () => {
			let newVolume;
			if ( this.videoItem.muted ) {
				newVolume = 0;
			} else {
				newVolume = this.videoItem.volume * 100;
			}
			this.updateControls( newVolume );
		};

		this.rangeControl.oninput = function() {
			ctx.setVolume(this.value);
		}

		this.updateControls(this.videoItem.volume * 100);

		window.addEventListener('resize', () => this.updateControls(this.videoItem.volume * 100));
		window.addEventListener('orientationchange', () => this.updateControls(this.videoItem.volume * 100));

	}

	setVolume(volumeVal) {
		if ( volumeVal >= 100 ) volumeVal = 100;
		if ( volumeVal <= 0 ) volumeVal = 0;

		this.prevVolume = this.videoItem.volume * 100;
		this.videoItem.volume = volumeVal/100;
		this.updateControls(volumeVal);
	}

	updateControls(volumeVal) {

		if ( this.rangeControl.value !== volumeVal ) {
			this.rangeControl.value = volumeVal;
		}

		if ( volumeVal === 0 ) {
			this.volumeMuteBtn.classList.add('is-on');
		} else {
			this.volumeMuteBtn.classList.remove('is-on');
		}

		if ( isDesktopSize() ) {
			//reset mobile val
			this.sliderFill.style.height = ``;
			this.sliderBullet.style.bottom = ``;

			//set desktop val
			this.sliderFill.style.width = `${volumeVal}%`;
			this.sliderBullet.style.left = `${volumeVal}%`;
		} else {
			//reset desktop val
			this.sliderFill.style.width = ``;
			this.sliderBullet.style.left = ``;

			//set mobile val
			this.sliderFill.style.height = `${volumeVal}%`;
			this.sliderBullet.style.bottom = `${volumeVal}%`;
		}
	}

}

document.addEventListener('DOMContentLoaded', () => {
	const popupWindowsInstance = new PopupWindows();
	const volumeControlInstance = new VolumeControl();

	popupWindowsInstance.show('.popup-block--1');

	const messages = document.querySelector('.chat-block__messages');
	if ( messages ) {
		let simpleBarInstance = new SimpleBar(messages, {
			autoHide: false,
			// scrollbarMaxSize: 30,
			scrollbarTouchEvents: true,
		});
		messages['$$simplebar'] = simpleBarInstance;
	}

	document.querySelector('.btn-retry-attempt').addEventListener('click', function () {
		popupWindowsInstance.show('.popup-block--2');
	});

});