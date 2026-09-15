declare module "nue-glow" {
	export interface GlowOptions {
		language?: string;
		prefix?: boolean;
		mark?: boolean;
		numbered?: boolean;
	}

	export function glow(
		str: string | string[],
		opts?: string | GlowOptions,
	): string;
}
