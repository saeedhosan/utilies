/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Get seo url from a string text
 * @deprecated
 */
export function textToSeo(url: string): string {
	return url
		.toString()
		.replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
		.replace(/\s+/g, "-") // Change whitespace to dashes
		.toLowerCase() // Change to lowercase
		.replace(/&/g, "-and-") // Replace ampersand
		.replace(/[^a-z0-9\\-]/g, "") // Remove anything that is not a letter, number or dash
		.replace(/-+/g, "-") // Remove duplicate dashes
		.replace(/^-*/, "") // Remove starting dashes
		.replace(/-*$/, ""); // Remove trailing dashes
}
export const toSeoUrl = textToSeo;
export const toSeoURL = textToSeo;

/**
 * SEO url to a valid string
 * @param url
 * @returns
 */
export function seoToString(url: string): string {
	return String(url) // Convert to string
		.replace("-", " ") // Change whitespace to dashes
		.toLowerCase() // Change to lowercase
		.replace("-and-", " and ") // Replace ampersand
		.replace(/-+/g, " ") // Remove duplicate dashes
		.replace(/^-*/, "") // Remove starting dashes
		.replace(/-*$/, "")
		.trim(); // Remove trailing dashes
}

/**
 * url to plain text
 */
export const urlToString = seoToString;
export const urlToText = seoToString;
export const slugToText = seoToString;

export const beString = (str: any): string => String(str);

/**
 * clean up starting and ending slash from a string
 */
export const unSlash = (str: string): string => beString(str).replace(/(\/$)|(^\/)/g, "");

/**
 * clean up starting slash from a string
 */
export const unSlashL = (str: string): string => str.replace(/(^\/)/, "");
export const unSlashLeft = unSlashL;
/**
 * clean up last slash from a string
 */
export const unSlashR = (str: string): string => str.replace(/(\/$)/g, "");
export const unSlashEnd = unSlashR;

/**
 * add a slash to the url of endpoint
 */
export const addSlash = (str: string): string => unSlash(str).replace(/$/, "/");
export const addSlashs = (str: string): string => "/" + unSlash(str) + "/";

export function pathArrayToString(path: string | string[]) {
	if (Array.isArray(path)) {
		return path
			.filter(Boolean)
			.filter((text) => text != "")
			.filter((text) => typeof text === "string" || typeof text === "number")
			.map(unSlash)
			.join("/")
			.toString();
	}
	return path;
}

/**
 * string path joing
 * @param paths
 */
export function pathJoin(...paths: any[]): string {
	return [...paths]
		.map(pathArrayToString)
		.filter(Boolean)
		.filter((text) => text != "")
		.filter((text) => typeof text === "string" || typeof text === "number")
		.map(unSlash)
		.join("/")
		.toString();
}
export const urlJoin = pathJoin;
export const path_join = pathJoin;
export const url_join = pathJoin;

/**
 * Query string to javascript object
 * @param query query string
 */
export function queryTojson(query: string): object | null {
	const obj: any = {};
	const qury = query.split("&");
	if (typeof qury === "object" && qury.length > 1) {
		for (let i = 0; i < qury.length; i++) {
			if (qury[i].split("=").length === 2) {
				const q = qury[i].split("=");
				obj[q[0]] = q[1];
			}
		}
		return obj;
	} else {
		return null;
	}
}

export function url(...args: (string | Record<string, any>)[]) {
	// Extract paths and params dynamically
	const paths = args.filter((arg) => typeof arg === "string" || Array.isArray(arg)) as string[];
	const params = args.find((arg) => arg && typeof arg === "object" && !Array.isArray(arg)) as Record<string, any> | undefined;

	try {
		// Combine the paths correctly
		const url = new URL(pathJoin(...paths), window.location.href);

		// Append query parameters if any
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				// If value is null or undefined, we remove the parameter
				if (value == null) {
					url.searchParams.delete(key);
				} else if (Array.isArray(value)) {
					// If value is an array, append all items
					value.forEach((v) => url.searchParams.append(key, v.toString()));
				} else {
					url.searchParams.set(key, value.toString());
				}
			});
		}

		return url.href; // Return the complete URL with parameters
	} catch {
		// Fallback if URL creation fails
		const searchParams = new URLSearchParams();
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
        if (value != null) {
          if (Array.isArray(value)) {
            value.forEach((v: any) => searchParams.append(key, v.toString()));
          } else {
            searchParams.append(key, value.toString());
          }
        }
			});
		}
		// Combine paths and query string
		return "/" + pathJoin(...paths) + (params ? `?${searchParams.toString()}` : "");
	}
}
