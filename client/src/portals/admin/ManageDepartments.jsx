import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../../api/departmentApi';

const columns = [{ key: 'name', label: 'Name' }, { key: 'code', label: 'Code' }];

export default function ManageDepartments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    getAllDepartments().then((data) => { setItems(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async (row) => {
    await deleteDepartment(row._id);
    load();
  };

  const handleEdit = (row) => {
    setEditing(row);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <h2>Departments</h2>
      <button onClick={() => { setEditing(null); setModalOpen(true); }}>Add Department</button>
      <DataTable columns={columns} rows={items} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* TODO: build a real form per entity — this is a placeholder */}
        <p>{editing ? 'Edit' : 'Create'} Department form goes here.</p>
      </Modal>
    </div>
  );
}
