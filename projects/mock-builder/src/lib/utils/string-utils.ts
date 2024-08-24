export class StringUtils {
	public static isEmpty(str: string) {
		return str.trim() === '';
	}

	public static isNotEmpty(str: string) {
		return !this.isEmpty(str);
	}
}
