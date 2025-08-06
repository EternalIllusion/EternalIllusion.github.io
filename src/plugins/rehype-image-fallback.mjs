import { visit } from "unist-util-visit";

export default function rehypeImageFallback(options = {}) {
	const {
		enable = true,
		originalDomain = "eterill.xyz",
		fallbackDomain = "eterill.xyz",
	} = options;

	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName === "img" && node.properties && node.properties.src) {
				const src = node.properties.src;

				// 检查是否启用回退功能并且是来自指定域名的图片
				if (enable && typeof src === "string" && src.includes(originalDomain)) {
					// 生成备用 URL
					const fallbackSrc = src.replace(originalDomain, fallbackDomain);

					// 添加 onerror 属性
					node.properties.onerror = `this.onerror=null; this.src='${fallbackSrc}';`;
				}
			}
		});
	};
}
