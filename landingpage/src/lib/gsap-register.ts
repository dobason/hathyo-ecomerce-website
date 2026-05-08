import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Đăng ký plugin MỘT LẦN duy nhất
gsap.registerPlugin(TextPlugin, ScrollTrigger);

export { gsap };
