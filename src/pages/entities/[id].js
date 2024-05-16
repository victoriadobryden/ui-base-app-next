// pages/entities/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CaseDetail = () => {
    const [entity, setEntity] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchEntity();
        }
    }, [id]);

    const fetchEntity = async () => {
        try {
            const response = await axios.get(`/api/cases/${id}`);
            setEntity(response.data);
            setFormData({ name: response.data.name, description: response.data.description });
        } catch (error) {
            console.error('Error fetching case:', error);
        }
    };

    const handleSave = async () => {
        if (formData.name.trim() === '' || formData.description.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        try {
            await axios.put(`/api/cases/${id}`, formData);
            setEditMode(false);
            fetchEntity();
        } catch (error) {
            console.error('Error saving case:', error);
            setError('Error saving case');
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData({ name: entity.name, description: entity.description });
        setError(null);
    };

    if (!entity) return <div>Loading...</div>;

    return (
        <div>
            <h1>Case Detail</h1>
            {editMode ? (
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>Name: {entity.name}</p>
                    <p>Description: {entity.description}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={() => router.push('/entities')}>Back to List</button>
        </div>
    );
};

export default CaseDetail;
