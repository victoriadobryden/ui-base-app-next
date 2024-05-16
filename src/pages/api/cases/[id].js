// pages/api/cases/[id].js
import axios from 'axios';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await axios.get(`http://localhost:8080/api/cases/${id}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await axios.put(`http://localhost:8080/api/cases/${id}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
