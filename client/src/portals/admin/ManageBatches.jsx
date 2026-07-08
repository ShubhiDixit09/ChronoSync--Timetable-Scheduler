import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAllBatchs, createBatch, updateBatch, deleteBatch } from '../../api/batchApi';

const columns = [{ key: 'name', label: 'Name' }, { key: 'semester', label: 'Semester' }, { key: 'strength', label: 'Strength' }];

export default function ManageBatchs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    getAllBatchs().then((data) => { setItems(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async (row) => {
    await deleteBatch(row._id);
    load();
  };

  const handleEdit = (row) => {
    setEditing(row);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <h2>Batchs</h2>
      <button onClick={() => { setEditing(null); setModalOpen(true); }}>Add Batch</button>
      <DataTable columns={columns} rows={items} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* TODO: build a real form per entity — this is a placeholder */}
        <p>{editing ? 'Edit' : 'Create'} Batch form goes here.</p>
      </Modal>
    </div>
  );
}
