export const getCoins = async (req, res) => {};

export const addCoin = async (req, res) => {
    try {
        // const holding = await portfolioService.create(
        //     ...req.body,
        //     user: req.user.id_user
        // );

        res.status(201).json({ success: true, data: holding });
    } catch (error) {
        
    }
};

export const removeCoin = async (req, res) => {};

