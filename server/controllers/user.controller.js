import * as userService from '../services/user.service.js';

export const getUser = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id_user);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        return res.json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

