import { useDark, useToggle } from "@vueuse/core";

export const isDark = useDark({
  selector: "html",
  attribute: "theme",
  valueDark: "dark",
  valueLight: "light",
});

const toggleDark = useToggle(isDark);

export const toggleTheme = (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  // 兼容性处理
  if (!document.startViewTransition) {
    toggleDark();
    return;
  }
  const transition = document.startViewTransition(async () => {
    toggleDark();
  });

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-in",
        pseudoElement: isDark.value ? "::view-transition-old(root)" : "::view-transition-new(root)",
      }
    );
  });
};
