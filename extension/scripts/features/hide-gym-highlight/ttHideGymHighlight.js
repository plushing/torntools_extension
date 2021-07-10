"use strict";

(async () => {
	if (isFlying() || isAbroad()) return;

	featureManager.registerFeature(
		"Hide Gym Highlight",
		"sidebar",
		() => settings.pages.sidebar.hideGymHighlight,
		null,
		hideGymHighlight,
		removeHiddenHighlight,
		{
			storage: ["settings.pages.sidebar.hideGymHighlight"],
		},
		async () => {
			await checkMobile();
		}
	);

	async function hideGymHighlight() {
		await requireSidebar();

		const navGym = document.find("#nav-gym, #nav-jail_gym");
		if (!navGym) return;
		const gymClass = navGym.classList.contains("^=available___");
		if (!gymClass) return;

		const svg = navGym.find("svg");
		if (hasDarkMode()) {
			if (mobile) {
				svg.setAttribute("fill", svg.getAttribute("fill").replace("_green", ""));
				svg.setAttribute("filter", svg.getAttribute("filter").replace("_green", ""));
			} else {
				svg.setAttribute("fill", "url(#sidebar_svg_gradient_regular_mobile)");
				svg.setAttribute("filter", "url(#svg_sidebar_mobile)");
			}
		} else {
			if (mobile) {
				svg.setAttribute("fill", "url(#sidebar_svg_gradient_regular_mobile)");
				svg.setAttribute("filter", "url(#svg_sidebar_mobile)");
			} else {
				svg.setAttribute("fill", "url(#sidebar_svg_gradient_regular_desktop)");
			}
		}

		navGym.classList.removeSpecial("^=available___");
	}

	function removeHiddenHighlight() {
		const navGym = document.find("#nav-gym, #nav-jail_gym");
		const svg = navGym.find("svg");

		if (hasDarkMode()) {
			if (mobile) {
				svg.setAttribute("fill", "url(#sidebar_svg_gradient_regular_green_mobile)");
				svg.setAttribute("filter", "url(#svg_sidebar_green_regular_mobile_green_filter)");
			} else {
				svg.setAttribute("fill", "url(#sidebar_svg_gradient_regular_green_mobile)");
				svg.setAttribute("filter", "url(#svg_sidebar_green_mobile)");
			}
		} else {
			if (mobile) {
				svg.setAttribute("fill", "url(#sidebar_svg_gradient_regular_green_mobile)");
				svg.setAttribute("filter", "url(#svg_sidebar_green_regular_mobile_green_filter)");
			} else {
				svg.setAttribute("fill", "url(#sidebar_svg_gradient_regular_desktop_green)");
			}
		}

		navGym.find("[class*='area-row___']").classList.add("tt-available");
	}
})();
