import multer from "multer";
import crypto from "crypto";
import path from "path";

export const userFileStorage = multer.diskStorage({
	destination(req, file, callback) {
		callback(
			null,
			path.resolve(
				__dirname,
				"..",
				"..",
				"..",
				"client",
				"public",
				"assets",
				"users"
			)
		);
	},
	filename(req, file, callback) {
		crypto.randomBytes(16, (err, hash) => {
			if (err) callback(err, err.message);
			const filename = `${hash.toString("hex")}-${file.originalname}`;
			callback(null, filename);
		});
	},
});

export const postFileStorage = multer.diskStorage({
	destination(req, file, callback) {
		callback(
			null,
			path.resolve(
				__dirname,
				"..",
				"..",
				"..",
				"client",
				"public",
				"assets",
				"posts"
			)
		);
	},
	filename(req, file, callback) {
		crypto.randomBytes(16, (err, hash) => {
			if (err) callback(err, err.message);
			const filename = `${hash.toString("hex")}-${file.originalname}`;
			callback(null, filename);
		});
	},
});
