import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

export default function CaseCreate() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    clientName: '', clientPhone: '', clientEmail: '', clientAddress: '',
    bank: 'ICICI Bank',
    propertyAddress: '', surveyNo: '', village: '', taluka: '', district: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (role !== 'admin') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 48 }}>🔒</div>
        <div style={{ fontFamily: 'Playfair Display', fontSize: 24, color: 'var(--navy)' }}>Access Denied</div>
        <div style={{ color: 'var(--muted)' }}>Only Admin can create new cases.</div>
      </div>
    );
  }

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.clientPhone || !form.propertyAddress) {
      setError('Please fill all required fields.');
      return;
    }
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await API.post('/cases', form, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess(`Case ${res.data.case.caseId} created successfully!`);
      setTimeout(() => navigate(`/cases/${res.data.case._id}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create case.');
    }
    setLoading(false);
  };

  const inputStyle = { width: '100%', border: '1px solid var(--border)', padding: '10px 14px',
    borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'DM Sans', transition: 'border-color 0.2s' };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)',
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 };
  const cardStyle = { background: 'white', borderRadius: 12, padding: '28px 32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 20 };

  return (
    <div className="animate-in" style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: 28, color: 'var(--navy)', margin: 0 }}>Create New Case</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>Fill in the details below to register a new non-litigation case.</p>
      </div>

      {/* Step Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
        {[{n:1,l:'Client'},{n:2,l:'Bank'},{n:3,l:'Property'}].map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--navy)',
                color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700 }}>{s.n}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{s.l}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: 'var(--border)', margin: '0 12px' }} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Client Info */}
        <div style={cardStyle}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 18, color: 'var(--navy)', marginTop: 0, marginBottom: 20 }}>
            1. Client Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Client Name <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input style={inputStyle} value={form.clientName} onChange={e => set('clientName', e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <label style={labelStyle}>Phone <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input style={inputStyle} value={form.clientPhone} onChange={e => set('clientPhone', e.target.value)} placeholder="+91 XXXXXXXXXX" />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)} placeholder="email@example.com" />
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <input style={inputStyle} value={form.clientAddress} onChange={e => set('clientAddress', e.target.value)} placeholder="Client address" />
            </div>
          </div>
        </div>

        {/* Bank */}
        <div style={cardStyle}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 18, color: 'var(--navy)', marginTop: 0, marginBottom: 20 }}>
            2. Bank Selection
          </h2>
          <div style={{ display: 'flex', gap: 12 }}>
            {['ICICI Bank', 'Aditya Birla', 'Bajaj Finserv'].map(b => (
              <button key={b} type="button" onClick={() => set('bank', b)}
                style={{ flex: 1, padding: '14px', border: `2px solid ${form.bank === b ? 'var(--navy)' : 'var(--border)'}`,
                  borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  background: form.bank === b ? 'var(--navy)' : 'white',
                  color: form.bank === b ? 'var(--gold)' : 'var(--muted)',
                  transition: 'all 0.2s' }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Property */}
        <div style={cardStyle}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 18, color: 'var(--navy)', marginTop: 0, marginBottom: 20 }}>
            3. Property Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Property Address <span style={{ color: 'var(--danger)' }}>*</span></label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                value={form.propertyAddress} onChange={e => set('propertyAddress', e.target.value)}
                placeholder="Full property address" />
            </div>
            <div>
              <label style={labelStyle}>Survey No.</label>
              <input style={inputStyle} value={form.surveyNo} onChange={e => set('surveyNo', e.target.value)} placeholder="e.g. 12/3A" />
            </div>
            <div>
              <label style={labelStyle}>Village</label>
              <input style={inputStyle} value={form.village} onChange={e => set('village', e.target.value)} placeholder="Village name" />
            </div>
            <div>
              <label style={labelStyle}>Taluka</label>
              <input style={inputStyle} value={form.taluka} onChange={e => set('taluka', e.target.value)} placeholder="Taluka" />
            </div>
            <div>
              <label style={labelStyle}>District</label>
              <input style={inputStyle} value={form.district} onChange={e => set('district', e.target.value)} placeholder="District" />
            </div>
          </div>
        </div>

        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', color: 'var(--danger)', marginBottom: 16, fontSize: 14 }}>{error}</div>}
        {success && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', color: 'var(--success)', marginBottom: 16, fontSize: 14 }}>✅ {success}</div>}

        <button type="submit" disabled={loading}
          style={{ background: 'var(--navy)', color: 'white', border: 'none', padding: '14px 32px',
            borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, width: '100%' }}>
          {loading ? 'Creating case...' : '➕ Create Case'}
        </button>
      </form>
    </div>
  );
}
