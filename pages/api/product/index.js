const Product = (req, res) => {

    const productsFromDB = [
        {
            name: "Sam",
            description: "Also known as Naveen kumar S",
            imageUrl: "https://static.spotboye.com/uploads/Sam_2021-9-14-12-4-12_thumbnail.jpg",
            price: 1000
        },
        {
            name: "Navin",
            description: "3D",
            imageUrl: "https://static.spotboye.com/uploads/Sam_2021-9-14-12-4-12_thumbnail.jpg",
            price: 1000
        },
        {
            name: "Sangeetha",
            description: "3D",
            imageUrl: "https://static.spotboye.com/uploads/Sam_2021-9-14-12-4-12_thumbnail.jpg",
            price: 1000
        },
        {
            name: "Samntha",
            description: "Ruth",
            imageUrl: "https://static.spotboye.com/uploads/Sam_2021-9-14-12-4-12_thumbnail.jpg",
            price: 1000
        }
    ]

    const returnValue = {
        message: "The Products Available in The Shop...",
        products: productsFromDB
    }

    return res.status(200).json(returnValue);
}

export default Product;