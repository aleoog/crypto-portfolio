import * as userService from '../services/user.service.js';

export const getUser = async (req, res) => {
    try {

        const user = await userService.getById(req.params.id_user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const findOne = async (req, res) => {
    try {
        // console.log('Email recibido:', req.params.email);

        const user = await userService.findOne(req.params.email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
