import gsap from "gsap";

gsap.config({trialWarn: false});
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitText);
let split = new SplitText("p",{ type: "lines" });

function makeItHappen(){
    split.lines.forEach((lol) =>

{
    gsap.to(lol, {
        backgroundPositionX: 0,
        ease: "none",
        scrollTrigger:{
            trigger: target,
            markers: true,
            scrub: 0.5,
            start: "top center",
            end: "bottom center"
        }
    });
});
}

let someDelay = 
gsap.delayedCall(0.2, newTriggers).pause();


function newTriggers(){
    ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
    });
    split.split();
    makeItHappen();
}

makeItHappen();