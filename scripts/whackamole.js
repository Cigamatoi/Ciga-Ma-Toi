// whackamole.js placeholder
<script>
    document.addEventListener("DOMContentLoaded", function() {
      const hammer = document.getElementById("hammer");
      const whackContainer = document.getElementById("whack-a-mole-container");

      if (whackContainer) {
        whackContainer.addEventListener("mousemove", (e) => {
          hammer.style.left = `${e.clientX}px`;
          hammer.style.top = `${e.clientY}px`;
          hammer.style.display = "block";
        });

        whackContainer.addEventListener("click", () => {
          hammer.style.transform = "translate(-50%, -50%) rotate(-45deg) scale(1.2)";
          setTimeout(() => {
            hammer.style.transform = "translate(-50%, -50%) rotate(0deg) scale(1)";
          }, 100);
        });

        whackContainer.addEventListener("mouseleave", () => {
          hammer.style.display = "none";
        });
      }
    });
