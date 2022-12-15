const Comment = require("../models/Comment");
const User = require("../models/User");

const controller = {
	create: async (req, res) => {
		let id = req.body.userId;
		let { comment, userId, date, photo } = req.body;

		try {
			let user = await User.findOne({ _id: id });
			userId = user._id;

			let comments = await (
				await Comment.create({ comment, userId, date, photo })
			).populate("userId", {
				photo: 1,
				name: 1,
			});
			res.status(201).json({
				response: comments,
				success: true,
				message: "the comment was successfully created",
			});
		} catch (error) {
			res.status(400).json({
				success: false,
				message: error.message,
			});
		}
	},
	read: async (req, res) => {
		let comments;

		let query = {};
		if (req.query.order) {
			order = {
				date: req.query.order,
			};
		}

		try {
			comments = await Comment.find(query)
				.sort({ date: "asc" })
				.populate("userId", {
					photo: 1,
					name: 1,
				});
			res.json({ success: true, response: comments });
		} catch (error) {
			console.log(error);
			res.status(500).json();
		}
	},

	update: async (req, res) => {
		let { id } = req.params;
		try {
			let one = await Comment.findOneAndUpdate({ _id: id }, req.body, {
				new: true,
			});
			if (one) {
				res.status(200).json({
					id: one._id,
					success: true,
					message: "The comment was successfully modified",
				});
			} else {
				res.status(404).json({
					success: false,
					message: "The comment was not found",
				});
			}
		} catch (error) {
			res.status(400).json({
				success: false,
				message: error.message,
			});
		}
	},

	destroy: async (req, res) => {
		let { id } = req.params;
		try {
			let comment = await Comment.findOneAndDelete({ _id: id });
			if (comment) {
				res.status(200).json({
					res: comment,
					success: true,
					message: "The comment was successfully deleted",
				});
			} else {
				res.status(404).json({
					res: comment,
					success: false,
					message: "The comment was not found",
				});
			}
		} catch (error) {
			res.status(400).json({
				success: false,
				message: error.message,
			});
		}
	},

	reportComment: async (req, res) => {
		let Id = req.user.id;
		let { id } = req.params;

		try {
			let comments = await Comment.findOne({ _id: id });
			if (comments) {
				if (comments.reports.includes(Id)) {
					await Comment.findOneAndUpdate(
						{ _id: comments._id },
						{ $pull: { reports: Id } },
						{ new: true }
					);
					res.status(200).json({
						message: `The comment was removed from reports`,
						success: true,
						reactioned: false,
					});
				} else {
					await Comment.findOneAndUpdate(
						{ _id: comments._id },
						{ $push: { reports: Id } },
						{ new: true }
					);
					res.status(200).json({
						message: `The comment was report`,
						success: true,
						reactioned: true,
					});
				}
			} else {
				res.status(404).json({
					message: "The comment dont exist",
					success: false,
				});
			}
		} catch (error) {
			res.status(400).json({
				message: error.message,
				success: false,
			});
		}
	},

	deleteCommentReport: async (req, res) => {
		let { id } = req.params;
		try {
			let comment = await Comment.findOneAndDelete({ _id: id });
			if (comment) {
				res.status(200).json({
					res: comment,
					success: true,
					message: "The comment was successfully deleted",
				});
			} else {
				res.status(404).json({
					res: comment,
					success: false,
					message: "The comment was not found",
				});
			}
		} catch (error) {
			res.status(400).json({
				message: error.message,
				success: false,
			});
		}
	},
};
module.exports = controller;
