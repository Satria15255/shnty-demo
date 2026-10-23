export const animationVariants = {
	fadeIn: {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	},

	slideUp: {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
	},

	slideDown: {
		hidden: { opacity: 0, y: -30 },
		visible: { opacity: 1, y: 0 },
	},

	slideLeft: {
		hidden: { opacity: 0, x: 30 },
		visible: { opacity: 1, x: 0 },
	},

	scaleIn: {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1 },
	},
};
