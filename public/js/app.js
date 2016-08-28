function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sidemenu = function () {
    function sidemenu() {
        _classCallCheck(this, sidemenu);

        this.sidemenuContainerEl = document.querySelector('.js-sidemenu-container');
        this.sidemenuEl = document.querySelector('.js-sidemenu');
        this.sidemenuShowEl = document.querySelector('.js-sidemenu-show');
        // this.sidemenuHideEl = document.querySelector('.js-sidemenu-hide');
        this.showSideMenu = this.showSideMenu.bind(this);
        this.hideSideMenu = this.hideSideMenu.bind(this);
        this.blockClick = this.blockClick.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.update = this.update.bind(this);

        this.startX = 0;
        this.currentX = 0;
        this.touchingSideNav = false;

        this.addEventListeners();
    }

    sidemenu.prototype.addEventListeners = function addEventListeners() {
        this.sidemenuShowEl.addEventListener('click', this.showSideMenu);
        // this.sidemenuHideEl.addEventListener('click', this.hideSideMenu);
        this.sidemenuContainerEl.addEventListener('click',this.hideSideMenu);
        this.sidemenuEl.addEventListener('click', this.blockClick);
        this.sidemenuContainerEl.addEventListener('touchstart', this.onTouchStart);
        this.sidemenuContainerEl.addEventListener('touchmove', this.onTouchMove);
        this.sidemenuContainerEl.addEventListener('touchend', this.onTouchEnd);
    };

    sidemenu.prototype.showSideMenu = function showSideMenu() {
        this.sidemenuContainerEl.classList.add('tr-sidemenu-animatable');
        this.sidemenuContainerEl.classList.add('tr-show-sidemenu');
        this.sidemenuContainerEl.addEventListener('transitionend', this.onTransitionEnd);
    };

    sidemenu.prototype.hideSideMenu = function hideSideMenu() {
        this.sidemenuContainerEl.classList.add('tr-sidemenu-animatable');
        this.sidemenuContainerEl.classList.remove('tr-show-sidemenu');
        this.sidemenuContainerEl.addEventListener('transitionend', this.onTransitionEnd);
    };

    sidemenu.prototype.onTransitionEnd = function onTransitionEnd(evt) {
        this.sidemenuContainerEl.classList.remove('tr-sidemenu-animatable');
        this.sidemenuContainerEl.removeEventListener('transitionend', this.onTransitionEnd);
    };

    sidemenu.prototype.blockClick = function blockClick(evt) {
        evt.stopPropagation();
    };

    sidemenu.prototype.onTouchStart = function onTouchStart(evt) {
        if (!this.sidemenuContainerEl.classList.contains('tr-show-sidemenu')) return;
        this.startX = evt.touches[0].pageX;
        this.currentX = this.startX;
        this.touchingSideNav = true;
        requestAnimationFrame(this.update);
    };

    sidemenu.prototype.onTouchMove = function onTouchMove(evt) {
        if (!this.touchingSideNav) return;

        this.currentX = evt.touches[0].pageX;
        var translateX = Math.min(0, this.currentX - this.startX);

        if (translateX < 0) {
            evt.preventDefault();
        }
    };

    sidemenu.prototype.onTouchEnd = function onTouchEnd(evt) {
        if (!this.touchingSideNav) return;

        this.touchingSideNav = false;

        var translateX = Math.min(0, this.currentX - this.startX);
        // console.log(translateX);
        this.sidemenuEl.style.transform = '';

        if (translateX < -50) {
            this.hideSideMenu();
        } else {
            this.showSideMenu();
        }
    };

    sidemenu.prototype.update = function update() {
        if (!this.touchingSideNav) return;

        requestAnimationFrame(this.update);

        var translateX = Math.min(0, this.currentX - this.startX);
        this.sidemenuEl.style.transform = 'translateX(' + translateX + 'px)';
    };

    return sidemenu;
}();

var sideMenu = new sidemenu();





// $(function() {
// // //    $('.nav-link-active').removeClass('nav-link-active'); 
// //   vardocument.querySelector('nav a[href^="/' + location.pathname.split("/")[1] + '"]',function () {
// //       console.log(this);
// //     //   this.addClass('nav-link-active');
//   })
// });