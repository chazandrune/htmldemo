jQuery(function () {
    window.particlesJS && particlesJS("particles-js", {
        particles: {
            color: "#000",
            shape: "circle",  // "circle", "edge" or "triangle"
            opacity: 0.2,
            size: 10,
            size_random: !0,
            nb: 80,
            line_linked: {
                enable_auto: 1,
                distance: 200,
                color: "#ddd",
                opacity: 1,
                width: 1,
                condensed_mode: {
                    enable: !1,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: !0,
                speed: 0.5
            }
        },
        interactivity: {
            enable: !0,
            mouse: {
                distance: 1
            },
            detect_on: "canvas",  // "canvas" or "window"
            mode: "grab",
            line_linked: {
                opacity: .35
            },
            events: {
                onclick: {
                    enable: 0,
                    mode: "push",  // "push" or "remove" (particles)
                    nb: 3
                }
            }
        },
		/* Retina Display Support */
        retina_detect: !0
    })
})