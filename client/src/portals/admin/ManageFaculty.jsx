import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAllFacultys, createFaculty, updateFaculty, deleteFaculty } from '../../api/facultyApi';

const columns = [{ key: 'name', label: 'Name' }, { key: 'maxLoadPerWeek', label: 'Max load/week' }];

export default function ManageFacultys() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    getAllFacultys().then((data) => { setItems(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async (row) => {
    await deleteFaculty(row._id);
    load();
  };

  const handleEdit = (row) => {
    setEditing(row);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <h2>Facultys</h2>
      <button onClick={() => { setEditing(null); setModalOpen(true); }}>Add Faculty</button>
      <DataTable columns={columns} rows={items} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* TODO: build a real form per entity — this is a placeholder */}
        <p>{editing ? 'Edit' : 'Create'} Faculty form goes here.</p>
      </Modal>
    </div>
  );
}
