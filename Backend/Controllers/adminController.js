const Packages = require('../Models/PackagesModel');

const adminController = {
    postPackages: async (req, res) => {
        const { title, description, price, availableDates, image } = req.body;

        if (!title || !description || !price || !availableDates || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const newPackage = new Packages({
                title,
                description,
                price,
                availableDates,
                image,
            });

            await newPackage.save();

            res.status(201).json({
                message: "Package created successfully",
                data: newPackage,
            });
        } catch (error) {
            console.error("Error creating package:", error.message);
            res.status(500).json({ message: "Error creating package", error: error.message });
        }
    },

    PackagesUpdate: async (req, res) => {
        const { id } = req.params;
        const { title, description, price, availableDates, image } = req.body;

        const existingPackage = await Packages.findById(id);
        if (!existingPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        try {
            existingPackage.title = title || existingPackage.title;
            existingPackage.description = description || existingPackage.description;
            existingPackage.price = price || existingPackage.price;
            existingPackage.availableDates = availableDates || existingPackage.availableDates;
            existingPackage.image = image || existingPackage.image;

            await existingPackage.save();

            res.status(200).json({
                message: "Package updated successfully",
                data: existingPackage,
            });
        } catch (error) {
            console.error("Error updating package:", error.message);
            res.status(500).json({ message: "Error updating package", error: error.message });
        }
    },

    PackagesDelete: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedPackage = await Packages.findByIdAndDelete(id);

            if (!deletedPackage) {
                return res.status(404).json({ message: "Package not found" });
            }

            res.status(200).json({
                message: "Package deleted successfully",
                data: deletedPackage,
            });
        } catch (error) {
            console.error("Error deleting package:", error.message);
            res.status(500).json({ message: "Error deleting package", error: error.message });
        }
    },
};

module.exports = adminController;
