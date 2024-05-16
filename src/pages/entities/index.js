// pages/entities/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const EntityList = () => {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ name: '', investigatorId: '' });
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchEntities();
    }, [filters, page]);

    const fetchEntities = async () => {
        try {
            const response = await axios.post('/api/cases', {
                entity2Id: filters.investigatorId,
                name: filters.name,
                page,
                size: 10
            });
            setEntities(response.data.list);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this case?')) {
            try {
                await axios.delete(`/api/cases/${id}`);
                fetchEntities();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Case List</h1>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                </label>
                <label>
                    Investigator ID:
                    <input
                        type="text"
                        value={filters.investigatorId}
                        onChange={(e) => setFilters({ ...filters, investigatorId: e.target.value })}
                    />
                </label>
                <button onClick={fetchEntities}>Filter</button>
            </div>
            <Link href="/entities/new">
                <button>Add Case</button>
            </Link>
            <ul>
                {entities.map(entity => (
                    <li key={entity.id}>
                        <Link href={`/entities/${entity.id}`}>
                            <a>{entity.name}</a>
                        </Link>
                        <button onClick={() => handleDelete(entity.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EntityList;
