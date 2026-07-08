import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAllSubjects, createSubject, updateSubject, deleteSubject } from '../../api/subjectApi';

const columns = [{ key: 'name', label: 'Name' }, { key: 'code', label: 'Code' }, { key: 'classesPerWeek', label: 'Classes/week' }];

export default function ManageSubjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    getAllSubjects().then((data) => { setItems(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async (row) => {
    await deleteSubject(row._id);
    load();
  };

  const handleEdit = (row) => {
    setEditing(row);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <h2>Subjects</h2>
      <button onClick={() => { setEditing(null); setModalOpen(true); }}>Add Subject</button>
      <DataTable columns={columns} rows={items} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* TODO: build a real form per entity — this is a placeholder */}
        <p>{editing ? 'Edit' : 'Create'} Subject form goes here.</p>
      </Modal>
    </div>
  );
}
