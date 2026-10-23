import { motion } from "motion/react";
import { animationVariants } from "./animationVariants";

export default function AnimatedElement({
	children,
	variant = "fadeIn",
	delay = 0,
	duration = 0.7,
	once = true,
	triggerOnView = false,
	className = "",
	...props
}) {
	return (
		<motion.div
			{...props}
			className={className}
			variants={animationVariants[variant]}
			initial="hidden"
			animate={triggerOnView ? undefined : "visible"}
			whileInView={triggerOnView ? "visible" : undefined}
			viewport={{
				once,
				amount: 0.2,
			}}
			transition={{
				duration,
				delay,
				ease: "easeOut",
			}}
		>
			{children}
		</motion.div>
	);
}
