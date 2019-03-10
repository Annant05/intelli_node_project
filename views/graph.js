(function ($) {
    // USE STRICT
    "use strict";
    // dont delete
    try {

        //pie chart
        var ctx = document.getElementById("usagePieChart");
        if (ctx) {
            ctx.height = 200;
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [40, 80],
                        backgroundColor: [
                            "rgba(0, 123, 255,0.9)",
                            "rgba(0, 123, 255,0.7)",
                            "rgba(0,0,0,0.07)"
                        ],
                        hoverBackgroundColor: [
                            "rgba(0, 123, 255,0.9)",
                            "rgba(0, 123, 255,0.7)",
                            "rgba(0,0,0,0.07)"
                        ]

                    }],
                    labels: [
                        "Home",
                        "Office",
                    ]
                },
                options: {
                    legend: {
                        position: 'top',
                        labels: {
                            fontFamily: 'Poppins'
                        }

                    },
                    responsive: true
                }
            });
        }


    } catch (error) {
        console.log(error);
    }

    // dont delete
    try {

        // single bar chart
        var ctx = document.getElementById("costBarChart");
        if (ctx) {
            ctx.height = 180;
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Estimated Cost",
                            data: [10, 20, 30, 15, 20, 60],
                            borderColor: "rgba(0, 123, 255, 0.9)",
                            borderWidth: "0",
                            backgroundColor: "rgba(0, 123, 255, 0.5)"
                        }
                    ]
                },
                options: {
                    legend: {
                        position: 'top',
                        labels: {
                            fontFamily: 'Poppins'
                        }

                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontFamily: "Poppins"

                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontFamily: "Poppins"
                            }
                        }]
                    }
                }
            });
        }

    } catch (error) {
        console.log(error);
    }

})(jQuery);


(function ($) {
    // USE STRICT
    "use strict";
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 900,
        outDuration: 900,
        linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'page-loader',
        loadingInner: '<div class="page-loader__spin"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) {
            window.location.href = url;
        }
    });


})(jQuery);


(function ($) {
    // USE STRICT
    "use strict";

    // Scroll Bar
    try {
        const jscr1 = $('.js-scrollbar1');
        if (jscr1[0]) {
            const ps1 = new PerfectScrollbar('.js-scrollbar1');
        }
    } catch (error) {
        console.log(error);
    }

})(jQuery);

(function ($) {
    // USE STRICT
    "use strict";

    // Dropdown
    try {
        var menu = $('.js-item-menu');
        var sub_menu_is_showed = -1;

        for (var i = 0; i < menu.length; i++) {
            $(menu[i]).on('click', function (e) {
                e.preventDefault();
                $('.js-right-sidebar').removeClass("show-sidebar");
                if (jQuery.inArray(this, menu) === sub_menu_is_showed) {
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = -1;
                } else {
                    for (let i = 0; i < menu.length; i++) {
                        $(menu[i]).removeClass("show-dropdown");
                    }
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = jQuery.inArray(this, menu);
                }
            });
        }
        $(".js-item-menu, .js-dropdown").click(function (event) {
            event.stopPropagation();
        });

        $("body,html").on("click", function () {
            for (let i = 0; i < menu.length; i++) {
                menu[i].classList.remove("show-dropdown");
            }
            sub_menu_is_showed = -1;
        });

    } catch (error) {
        console.log(error);
    }

    const wW = $(window).width();
    // Right Sidebar
    const right_sidebar = $('.js-right-sidebar');
    const sidebar_btn = $('.js-sidebar-btn');

    sidebar_btn.on('click', function (e) {
        e.preventDefault();
        for (let i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
        }
        sub_menu_is_showed = -1;
        right_sidebar.toggleClass("show-sidebar");
    });

    $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
        event.stopPropagation();
    });

    $("body,html").on("click", function () {
        right_sidebar.removeClass("show-sidebar");

    });


    // Sublist Sidebar
    try {
        const arrow = $('.js-arrow');
        arrow.each(function () {
            const that = $(this);
            that.on('click', function (e) {
                e.preventDefault();
                that.find(".arrow").toggleClass("up");
                that.toggleClass("open");
                that.parent().find('.js-sub-list').slideToggle("250");
            });
        });

    } catch (error) {
        console.log(error);
    }


    try {
        // Hamburger Menu
        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            $('.navbar-mobile').slideToggle('500');
        });
        $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
            const dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
            $(this).toggleClass('active');
            $(dropdown).slideToggle('500');
            return false;
        });
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    // Load more
    try {
        const list_load = $('.js-list-load');
        if (list_load[0]) {
            list_load.each(function () {
                const that = $(this);
                that.find('.js-load-item').hide();
                const load_btn = that.find('.js-load-btn');
                load_btn.on('click', function (e) {
                    $(this).text("Loading...").delay(1500).queue(function (next) {
                        $(this).hide();
                        that.find(".js-load-item").fadeToggle("slow", 'swing');
                    });
                    e.preventDefault();
                });
            })

        }
    } catch (error) {
        console.log(error);
    }

})(jQuery);
