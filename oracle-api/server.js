const express = require("express");
const app = express();

const ipcaData = {
	"2020-01": Math.round(0.29 * 100),
	"2020-02": Math.round(0.32 * 100),
	"2020-03": Math.round(0.25 * 100),
	"2020-04": Math.round(0.35 * 100),
	"2020-05": Math.round(0.42 * 100),
	"2020-06": Math.round(0.38 * 100),
	"2020-07": Math.round(0.45 * 100),
	"2020-08": Math.round(0.39 * 100),
	"2020-09": Math.round(0.47 * 100),
	"2020-10": Math.round(0.55 * 100),
	"2020-11": Math.round(0.58 * 100),
	"2020-12": Math.round(0.65 * 100),
	2020: Math.round(8.2 * 100),
	"2021-01": Math.round(0.29 * 100),
	"2021-02": Math.round(0.32 * 100),
	"2021-03": Math.round(0.25 * 100),
	"2021-04": Math.round(0.35 * 100),
	"2021-05": Math.round(0.42 * 100),
	"2021-06": Math.round(0.38 * 100),
	"2021-07": Math.round(0.45 * 100),
	"2021-08": Math.round(0.39 * 100),
	"2021-09": Math.round(0.47 * 100),
	"2021-10": Math.round(0.55 * 100),
	"2021-11": Math.round(0.58 * 100),
	"2021-12": Math.round(0.65 * 100),
	2021: Math.round(9.2 * 100),
	"2022-01": Math.round(0.29 * 100),
	"2022-02": Math.round(0.32 * 100),
	"2022-03": Math.round(0.25 * 100),
	"2022-04": Math.round(0.35 * 100),
	"2022-05": Math.round(0.42 * 100),
	"2022-06": Math.round(0.38 * 100),
	"2022-07": Math.round(0.45 * 100),
	"2022-08": Math.round(0.39 * 100),
	"2022-09": Math.round(0.47 * 100),
	"2022-10": Math.round(0.55 * 100),
	"2022-11": Math.round(0.58 * 100),
	"2022-12": Math.round(0.65 * 100),
	2022: Math.round(10.2 * 100),
	"2023-01": Math.round(0.29 * 100),
	"2023-02": Math.round(0.32 * 100),
	"2023-03": Math.round(0.25 * 100),
	"2023-04": Math.round(0.35 * 100),
	"2023-05": Math.round(0.42 * 100),
	"2023-06": Math.round(0.38 * 100),
	"2023-07": Math.round(0.45 * 100),
	"2023-08": Math.round(0.39 * 100),
	"2023-09": Math.round(0.47 * 100),
	"2023-10": Math.round(0.55 * 100),
	"2023-11": Math.round(0.58 * 100),
	"2023-12": Math.round(0.65 * 100),
	2023: Math.round(10.2 * 100),
	"2024-01": Math.round(0.29 * 100),
	"2024-02": Math.round(0.32 * 100),
	"2024-03": Math.round(0.25 * 100),
	"2024-04": Math.round(0.35 * 100),
	"2024-05": Math.round(0.42 * 100),
	"2024-06": Math.round(0.38 * 100),
	"2024-07": Math.round(0.45 * 100),
	"2024-08": Math.round(0.39 * 100),
	"2024-09": Math.round(0.47 * 100),
	"2024-10": Math.round(0.55 * 100),
	"2024-11": Math.round(0.58 * 100),
	"2024-12": Math.round(0.65 * 100),
	2024: Math.round(11.2 * 100),
};

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/health", (req, res) => {
	res.status(200).json({ status: "UP" });
});

app.get("/ipca", (req, res) => {
	const clientInfo = {
		ip: req.ip,
		headers: req.headers,
		userAgent: req.get("User-Agent"),
		method: req.method,
		url: req.originalUrl,
	};

	console.log(`Client info: ${JSON.stringify(clientInfo)}`);

	res.status(200).json(ipcaData);
});

const PORT = 5500;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
