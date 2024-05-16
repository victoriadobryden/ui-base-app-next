// pages/api/entities.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { entity2Id, name, page, size } = req.body;
        // Dummy data for demonstration purposes
        const entities = [
            { id: 1, name: 'Entity 1', description: 'Description 1' },
            { id: 2, name: 'Entity 2', description: 'Description 2' },
        ];
        res.status(200).json({
            list: entities,
            totalPages: 1
        });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
