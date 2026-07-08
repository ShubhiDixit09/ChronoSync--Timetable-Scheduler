import React, { useState } from 'react';
import { updateFaculty } from '../../api/facultyApi';
import { useAuth } from '../../hooks/useAuth';

export default function PreferencesForm() {
  const { user } = useAuth();
  const [avoidBackToBack, setAvoidBackToBack] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await updateFaculty(user.faculty, { preferences: { avoidBackToBack } });
    setSaved(true);
  };

  return (
    <div className="page">
      <h2>My preferences</h2>
      <div className="card">
        <label>
          <input type="checkbox" checked={avoidBackToBack} onChange={(e) => setAvoidBackToBack(e.target.checked)} />
          {' '}Avoid back-to-back classes
        </label>
        {/* TODO: preferred slots picker, preferred subjects picker */}
        <br />
        <button onClick={handleSave}>Save</button>
        {saved && <p>Saved.</p>}
      </div>
    </div>
  );
}
