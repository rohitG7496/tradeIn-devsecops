import cookie from "react-cookies";
import { pathToRegexp } from "path-to-regexp";

export const setTokenInCookies = (name, token, days) => {
	const today = new Date();
	const expiresAccess = new Date();
	expiresAccess.setDate(today.getDate() + days);
	cookie.save(name, token, {
		expires: expiresAccess,
	});
};

export const TimeTextManipulation = (times) => {
	let timeArray = times.match(/("[^"]+"|[^"\s]+)/g);
	for (let j = 0; j < timeArray.length; j++) {
		if (timeArray[j] === "second" || timeArray[j] === "seconds") {
			timeArray[j] = "sec ";
		}
		if (timeArray[j] === "minutes" || timeArray[j] === "minute") {
			timeArray[j] = "min ";
		}
		if (timeArray[j] === "minutes," || timeArray[j] === "minute,") {
			timeArray[j] = "min, ";
		}
		if (timeArray[j] === "hours" || timeArray[j] === "hour") {
			timeArray[j] = "hr ";
		}
		if (timeArray[j] === "hours," || timeArray[j] === "hour,") {
			timeArray[j] = "hr, ";
		}
		if (timeArray[j] === "days" || timeArray[j] === "day") {
			timeArray[j] = "d ";
		}
		if (timeArray[j] === "days," || timeArray[j] === "day,") {
			timeArray[j] = "d, ";
		}
		if (timeArray[j] === "weeks" || timeArray[j] === "week") {
			timeArray[j] = "w ";
		}
		if (timeArray[j] === "weeks," || timeArray[j] === "week,") {
			timeArray[j] = "w, ";
		}
		if (timeArray[j] === "month" || timeArray[j] === "months") {
			timeArray[j] = "m ";
		}
		if (timeArray[j] === "month," || timeArray[j] === "months,") {
			timeArray[j] = "m, ";
		}
		if (timeArray[j] === "year" || timeArray[j] === "years") {
			timeArray[j] = "y ";
		}
		if (timeArray[j] === "year," || timeArray[j] === "years,") {
			timeArray[j] = "y, ";
		}
		if (timeArray[j] === "January") {
			timeArray[j] = " jan";
		}
		if (timeArray[j] === "February") {
			timeArray[j] = " feb";
		}
		if (timeArray[j] === "March") {
			timeArray[j] = " mar";
		}
		if (timeArray[j] === "April") {
			timeArray[j] = " apr";
		}
		if (timeArray[j] === "June") {
			timeArray[j] = " jun";
		}
		if (timeArray[j] === "July") {
			timeArray[j] = " jul";
		}
		if (timeArray[j] === "August") {
			timeArray[j] = " aug";
		}
		if (timeArray[j] === "September") {
			timeArray[j] = " sep";
		}
		if (timeArray[j] === "October") {
			timeArray[j] = " oct";
		}
		if (timeArray[j] === "November") {
			timeArray[j] = " nov";
		}
		if (timeArray[j] === "December") {
			timeArray[j] = " dec";
		}
	}
	return timeArray.join("");
};

export const countModifier = (number) => {
	if (number < 1000) {
		return number;
	} else {
		var v = number / 100;
		v = Math.floor(v);
		v = v / 10;
		v = v + "k";
		return v;
	}
};

export const isMobileOrTabletDevice = () => {
	let check = false;

	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);

	return check;
};

export const getFormattedPath = (pathname, routePath) => {
	if (!routePath) return false;
	const regexp = pathToRegexp(routePath, [], { sensetive: true });
	if (regexp.exec(pathname)) return true;
	return false;
};

export const getCategories = () => {
	return {
		Electronics: [
			"Laptops",
			"Power Banks",
			"Pen drives & Storage",
			"Tablets",
			"Computer & Accessories",
			"Headphones & earphones",
			"Speakers",
			"Camera & accessories",
			"Gaming accessories",
		],
		Mobile: ["Mobile", "Mobile Accessories"],
		Appliances: [
			"Televisions",
			"Kitches Appliances",
			"Air conditioners",
			"Refrigerators",
			"Washing machine",
			"Microwaves",
			"Chimneys",
			"Dishwashers",
			"Cooler",
		],
		"Men's Fashion": [
			"Clothing",
			"Footware",
			"Watches",
			"Bags",
			"Wallets",
			"Luggage",
			"Sunglasses",
			"Accessories",
		],
		"Women's Fashion": [
			"Clothing",
			"Footware",
			"Watches",
			"Fashion & Jewellery",
			"Hanbags & clutches",
			"Sunglasses",
		],
		Home: [
			"kitchen & appliances",
			"Furniture",
			"Home Decor",
			"Indoor Lighting",
			"Art & Crafts",
			"Garden & Outdoors",
		],
		"Sports & Fitness": ["Cycle", "Exercies & Fitness", "Sports accessories"],
		"Baby Products": ["Clothing", "Footware", "School bags", "Toys and Games"],
		Vehicles: [
			"Two wheelers & accessories",
			"Four wheelers & accessories",
			"others",
		],
		Others: ["Stationary Products", "Arts & Handicrafts", "Beauty"],
	};
};
export const getColors = () => {
	return [
		"Black",
		"Blue",
		"Grey",
		"White",
		"Red",
		"Green",
		"Brown",
		"Beige",
		"Orange",
		"Yellow",
		"Purple",
		"Pink",
		"Gold",
		"Silver",
	];
};
export const getBookGenres = () => {
	return [
		"Art",
		"Biography",
		"Business",
		"Christian",
		"Comics",
		"Contemporary",
		"Cooking",
		"Crime",
		"Fantasy",
		"Fiction",
		"History",
		"Horror",
		"Memoir",
		"Mystery",
		"Nonfiction",
		"Philosophy",
		"Poetry",
		"Psychology",
		"Religion",
		"Science",
		"Suspense",
		"Spirituality",
		"Sports",
		"Thriller",
		"Travel",
		"Classics",
	];
};
