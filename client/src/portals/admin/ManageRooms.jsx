import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAllRooms, createRoom, updateRoom, deleteRoom } from '../../api/roomApi';

const columns = [{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'capacity', label: 'Capacity' }];

export default function ManageRooms() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    getAllRooms().then((data) => { setItems(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async (row) => {
    await deleteRoom(row._id);
    load();
  };

  const handleEdit = (row) => {
    setEditing(row);
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <h2>Rooms</h2>
      <button onClick={() => { setEditing(null); setModalOpen(true); }}>Add Room</button>
      <DataTable columns={columns} rows={items} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* TODO: build a real form per entity — this is a placeholder */}
        <p>{editing ? 'Edit' : 'Create'} Room form goes here.</p>
      </Modal>
    </div>
  );
}
