const Packages=require('../Models/PackagesModel')

const packageController={
    getAllPackages:async(req,res)=>{
        try {
            const packages = await Packages.find({});
            res.status(200).json({ message: "Available packages", data: packages });
        } catch (error) {
            console.error("Error fetching packages:", error.message);
        }
    },
    getSpecificPackages:async(req,res)=>{
        try {
            const {id}=req.params;
            const package = await Packages.findById(id);

            if (!package) {
                return res.status(404).json({ message: "Package not found" });
            }

            res.status(200).json({
                message: "Package retrieved successfully",
                data: package
            });
        } catch (error) {
            console.error("Error fetching specific package:", error.message);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "Invalid package ID format" });
            }

            res.status(500).json({
                message: "Failed to retrieve package",
                error: error.message
            });
        }
    }

}

module.exports=packageController;