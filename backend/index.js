const app = require('./server/server');
const PORT = 5000

app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`);
})