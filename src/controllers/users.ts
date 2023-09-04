import { Request, Response } from "express";
import User from '../models/user';


export const getUsers = async (req: Request, res: Response) => {

	const users = await User.findAll();

	res.json({
		users,
	})

}

export const getUser = async (req: Request, res: Response) => {

	const { id } = req.params;
	const user = await User.findOne({
		where: {
			id: id
		}
	});

	if (!user) {
		res.status(404).json({
			msg: `the id: ${id} not found`
		})
	}

	res.json({
		user,
	})

}

export const postUser = async (req: Request, res: Response) => {

	const { body } = req;

	try {

		const emailExists = await User.findOne({
			where: {
				email: body.email
			}
		})

		if (emailExists) {
			return res.status(400).json({
				msg: 'The email already exists'
			})
		}

		const user = User.build(body);
		await user.save();

		if (!user) {
			res.status(404).json({
				error: `The user ${body.name} was not created`
			})
		}

		res.json({
			user
		})


	} catch (error) {
		res.status(500).json({
			msg: 'Speak to the admin',
			error: error,
		})
	}

}

export const putUser = async (req: Request, res: Response) => {

	const { id } = req.params;
	const { body } = req;

	try {
		let user;
		user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({
				error: `The user ${id} was not found`
			})
		}

		await User.update(body, {
			where: {
				id: id
			}
		});

		user = await User.findByPk(id);

		res.json({
			user
		})


	} catch (error) {
		res.status(500).json({
			msg: 'Speak to the admin',
			error: error,
		})
	}


}

export const deleteUser = async (req: Request, res: Response) => {

	const { id } = req.params;


	try {

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({
				error: `The user ${id} was not found`
			})
		}

		await user.update({ state: false })


	} catch (error) {
		res.status(500).json({
			msg: 'Speak to the admin',
			error: error,
		})

	}


	res.json({

	})
}


