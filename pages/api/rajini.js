const Rajini = (req, res) => {

    const data = req.body;

    if(req.method == "POST")
        return res.status(202).json({
            message: "successfully Added...",
            data
        });
    else
        return res.status(200).json({
            method: req.method
        });

};

export default Rajini;