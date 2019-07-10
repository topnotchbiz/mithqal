import { ok, notFound, serverError } from 'wix-http-functions';
import wixData from 'wix-data';
const jwt = require('jsonwebtoken');

// URL looks like: https://www.mithqal.io/_functions/customer/{token}
export function get_customer(request) {
	let options = {
		"headers": {
			"Content-Type": "application/json"
		}
	};

	// query a collection to find matching items
	return wixData.query("BEP2_Verificiations")
		.eq("_id", request.path[0])
		.find()
		.then((results) => {
			// matching items were found
			if (results.items.length > 0) {

				const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
					"MIIEogIBAAKCAQEAtqce4b22iKMe6Un+Gw9jYhGDdjKYyABtvFtBhdaKo5ieSdoJ\n" +
					"JKWImib3iQQGUA4sxuG1vpQTTeoqVnjesrW5hLm5IR5HUelj+PqHKO2h5zMM21hh\n" +
					"8Tq4WNljf21So7KJQ6YEgws02zobxrldGvt2+XqmnC9ePlv4OvL0u+DJK3J2VB6B\n" +
					"npPrRvTQMyAbp0YBExN7+VmF1ujxRuneWcr24obqTApw50VWuyHuILqasIonVyXk\n" +
					"cBX3Wuecnpd+QB4gTE/zVs1zL06AYf/ki2+xbf2i0WPNCHZiDR7Ge3lMcZJO6s73\n" +
					"vnpD+5qlVUmtNCByXfiLYsGoPjPLkhA9ntCiXwIDAQABAoIBAHY4QOK3WdeiTLWO\n" +
					"MKvvD9I/p6jvIrgAnwYUwpoPvHgapgkC2HwhsAKmSf0i37sdEZpAKNQLH1uEvpZt\n" +
					"cSaWPFdNpidrY5n+x7g03xp8hBgSkLW/xNTPvtWzDpVBewV83x8r6yuuKy3htGyx\n" +
					"OTPnop/i5MeeWQ9fk5EEA6c+3LYDLefZBv1i2kp7vypuXHvJbOovRZqOLEOgoeyB\n" +
					"7jtvHdfBvzUy1HuBahL3FdG+ayRWnABAdfy8HOYVydTk1G8JeYSyTxEdBLKS8RM9\n" +
					"Sw3tejO8+B8UmKKew6DI0Qo6r/uPJC3AQ2RDxZmjULBz3MWJdbfLnCkesGqamp9m\n" +
					"aXDEsdECgYEA2otDc8+BmCMz2FoYXVuPi2Q3djFz7TxXfw+dLm4f9Obo5Hm5psVr\n" +
					"DFNlUhKcmkOBsDSm32jb0t2SMu6V5LlroSEUFRYdyNmvP/F3v2H4z13sX77//mr3\n" +
					"TNV7mT2tCIl7FTLNxizJUpO2tVCdmozjA0r9j2IKcTHhPQWPG4q9xdUCgYEA1fUc\n" +
					"rOTAOWXKWVOq9xLi1o/frmForNW7SOFY9VEccwEcnFhbR9fHEKujNXbZpFYvdm3x\n" +
					"87llnC2Oe2Dnv8QNJ14+g1SKmTWHean8BMtDoa8r80xxpDRqZI72tF/sJEr57qwK\n" +
					"T9m1OpFYtEJlhr/fyNiHG/wcm9b9Uhm7usX0HWMCgYAQ6rDI+SoN7cOonqi+KUU+\n" +
					"Q/6rDn7rwT0An+PJ4Upl+a3Taby+NQ/pP1dbeAdZRZp3WkwEhShm9THI8YD22IeF\n" +
					"THsyeqjJkFgpefaMAPhyjNGsQ6urNPp5nxjXLtgDDilR5cHZ8kOPOdHtzRS2DuvP\n" +
					"qHFiNPOb+YF26MRAHIg+FQKBgEE38yK8o9+bKKAsAdxIlH7E4nEcXjT4/ZrMnjpB\n" +
					"HEPuHdOGl2SB4LszJo/gh50xbExUXUFmzRNbS6hONLZew4exkaqktY7YI1CxwRGR\n" +
					"CC+b3vDN54IfPCMk9QyshKXXePII3SfT/As7TOe9qYb2q/dkEWM1aV8TnKpPD8ty\n" +
					"FeRzAoGASf0Zc3RBq0qrWL6PkxfV9FcmI2q2l6Or48F2jUGta/uRtFLvagUGO4sq\n" +
					"N73nTwIs4ySfDaGPrWRFCGvMVc5LtZO1ZWVkNRlbAMWxre6R4HtGN9qefGkQGc5p\n" +
					"X26wyD4J2xI7+Ebd0TBQQrufX3sWx7TJcqS4G+YWMCZgeLs9pMM=\n" +
					"-----END RSA PRIVATE KEY-----";
				const token = jwt.sign(results.items[0], privateKey, { algorithm: 'RS256' });

				options.body = {
					"customer": token
				};
				return ok(options);
			}

			// no matching items found
			options.body = {
				"error": `token:${request.path[0]} wasn't found`
			};

			return notFound(options);
		})
		.catch((error) => {
			options.body = {
				"error": error
			};

			return serverError(options);
		});
}