import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const STATUS_STYLES = {
  draft: { bg: '#f1f5f9', color: '#475569', label: 'Draft' },
  submitted: { bg: '#fef3c7', color: '#d97706', label: 'Submitted' },
  approved: { bg: '#dcfce7', color: '#16a34a', label: 'Approved' },
  rejected: { bg: '#fee2e2', color: '#dc2626', label: 'Changes Requested' }
};

export default function TSRGenerator() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [caseData, setCaseData] = useState(null);
  const [docs, setDocs] = useState([]);
  const [tsr, setTsr] = useState(null);
  
  const [draftContent, setDraftContent] = useState('');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [caseRes, docsRes, tsrRes] = await Promise.all([
          API.get(`/cases/${caseId}`, { headers: { Authorization: `Bearer ${token}` } }),
          API.get(`/documents/${caseId}`, { headers: { Authorization: `Bearer ${token}` } }),
          API.get(`/tsr/${caseId}`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setCaseData(caseRes.data.case);
        setDocs(docsRes.data.documents);
        if (tsrRes.data.tsr) {
          setTsr(tsrRes.data.tsr);
          setDraftContent(tsrRes.data.tsr.draftContent);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [caseId, token]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await API.post(`/tsr/generate/${caseId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setTsr(res.data.tsr);
      setDraftContent(res.data.tsr.draftContent);
    } catch (err) {
      console.error(err);
      alert('Generation failed');
    }
    setGenerating(false);
  };

  const handleSave = async () => {
    if (!tsr) return;
    setSaving(true);
    try {
      const res = await API.put(`/tsr/${tsr._id}`, { draftContent }, { headers: { Authorization: `Bearer ${token}` } });
      setTsr(res.data.tsr);
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    }
    setSaving(false);
  };

  const handleSubmit = async () => {
    if (!tsr) return;
    setSubmitting(true);
    try {
      // Auto save before submit
      await API.put(`/tsr/${tsr._id}`, { draftContent }, { headers: { Authorization: `Bearer ${token}` } });
      const res = await API.post(`/tsr/${tsr._id}/submit`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setTsr(res.data.tsr);
      alert('Submitted to NLK Sir successfully!');
      navigate(`/cases/${caseId}`);
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    }
    setSubmitting(false);
  };

  if (!caseData) return <div style={{ padding: 40, color: 'var(--muted)' }}>Loading...</div>;

  const statusStyle = tsr ? STATUS_STYLES[tsr.status] : STATUS_STYLES.draft;

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
      
      {/* Top Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        
        {/* Case Info */}
        <div style={{ background: 'white', borderRadius: 12, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 22, color: 'var(--navy)', margin: '0 0 16px 0' }}>Title Search Report Generator</h2>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>Case ID</div>
              <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>{caseData.caseId}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>Client</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{caseData.clientId?.name}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>Bank</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{caseData.bank}</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>Property</div>
            <div style={{ fontSize: 13, color: 'var(--text)' }}>{caseData.propertyId?.address}</div>
          </div>
        </div>

        {/* Docs Ref */}
        <div style={{ background: 'white', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px 0' }}>Referenced Docs ({docs.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 120, overflowY: 'auto' }}>
            {docs.map(d => (
              <div key={d._id} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>📄</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.originalName}</span>
              </div>
            ))}
            {docs.length === 0 && <div style={{ fontSize: 12, color: 'var(--muted)' }}>No docs uploaded</div>}
          </div>
        </div>
      </div>

      {tsr && tsr.status === 'rejected' && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '16px', color: 'var(--danger)' }}>
          <strong>Changes Requested by NLK Sir:</strong>
          <p style={{ margin: '8px 0 0 0', fontSize: 14 }}>{tsr.approvalNotes}</p>
        </div>
      )}

      {/* Main Section */}
      <div style={{ background: 'white', borderRadius: 12, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={handleGenerate} disabled={generating}
              style={{ background: 'var(--gold)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: generating ? 'not-allowed' : 'pointer', fontFamily: 'Playfair Display' }}>
              {generating ? '🤖 Generating...' : '✨ Generate AI Draft'}
            </button>
            {generating && <span style={{ color: 'var(--muted)', fontSize: 14 }}>🤖 AI is analyzing documents...</span>}
          </div>
          
          {tsr && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', background: 'var(--bg)', padding: '4px 10px', borderRadius: 12 }}>Version {tsr.version}</span>
              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: statusStyle.bg, color: statusStyle.color }}>
                {statusStyle.label}
              </span>
            </div>
          )}
        </div>

        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          placeholder="TSR draft will appear here..."
          style={{ width: '100%', minHeight: 500, padding: 20, border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.6, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
        />

        {tsr && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button onClick={handleSave} disabled={saving} style={{ background: 'white', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              {saving ? 'Saving...' : '💾 Save Draft'}
            </button>
            <button onClick={handleSubmit} disabled={submitting || tsr.status === 'submitted' || tsr.status === 'approved'} style={{ background: 'var(--navy)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: (tsr.status === 'submitted' || tsr.status === 'approved') ? 0.5 : 1 }}>
              {submitting ? 'Submitting...' : '📤 Submit to NLK Sir'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
