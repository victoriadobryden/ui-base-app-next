// pages/api/cases.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('http://localhost:8080/api/cases/_list', req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
