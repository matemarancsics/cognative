gsap.registerPlugin(Draggable, InertiaPlugin);

gsap.set("#circle", { transformOrigin: "50% 50%" });

Draggable.create("#circle", {
  type: "rotation",
  inertia: true,
  drag: function () {
    var offset = $(this).offset();
    console.log(offset);
    var xPos = offset.left;
    var yPos = offset.top;
    $("#posX").text("x: " + xPos);
    $("#posY").text("y: " + yPos);
  },
});
