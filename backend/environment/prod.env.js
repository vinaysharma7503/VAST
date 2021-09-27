exports.prodEnvironment = () => {

    const keys = {
        db_root: 'mongodb+srv://vast:vast@cluster0.ra7xb.mongodb.net/vast?authSource=admin&replicaSet=atlas-4dkrg5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
        jwt_secret: "vast"
    }
    return keys
}