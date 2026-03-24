'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editSource, setEditSource] = useState('');
  const [analysisTitle, setAnalysisTitle] = useState('');
  const [analysisContent, setAnalysisContent] = useState('');
  const [analysisCategory, setAnalysisCategory] = useState('daily_brief');
  const [analysisSources, setAnalysisSources] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) { setToken(data.token); loadMetrics(data.token); }
      else setError(data.error || 'Login failed');
    } catch { setError('Connection error'); }
  };

  const loadMetrics = async (t: string) => {
    const res = await fetch('/api/admin/metrics', { headers: { Authorization: `Bearer ${t}` } });
    const data = await res.json();
    setMetrics(data.metrics || {});
  };

  const updateMetric = async () => {
    if (!editKey || !editValue) return;
    await fetch('/api/admin/metrics', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ key: editKey, value: editValue, source: editSource }),
    });
    setMessage(`Updated ${editKey}`);
    setEditKey(''); setEditValue(''); setEditSource('');
    loadMetrics(token);
    setTimeout(() => setMessage(''), 3000);
  };

  const publishAnalysis = async () => {
    if (!analysisTitle || !analysisContent) return;
    await fetch('/api/data/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: analysisTitle,
        content: analysisContent,
        category: analysisCategory,
        sources: JSON.stringify(analysisSources.split(',').map(s => s.trim())),
      }),
    });
    setMessage('Analysis published');
    setAnalysisTitle(''); setAnalysisContent(''); setAnalysisSources('');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="bg-bg-card border border-border rounded-lg p-8 w-full max-w-md">
          <h1 className="font-heading font-bold text-xl text-txt-primary mb-6">GeoWire Admin</h1>
          {error && <div className="bg-accent-red/10 border border-accent-red/30 rounded p-2 text-accent-red text-sm mb-4">{error}</div>}
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
            className="w-full mb-3 px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm focus:border-accent-blue outline-none" />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full mb-4 px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm focus:border-accent-blue outline-none" />
          <button onClick={login}
            className="w-full py-2 bg-accent-blue rounded text-white font-heading font-semibold hover:bg-accent-blue/80 transition-colors">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-heading font-bold text-xl text-txt-primary">GeoWire Admin Panel</h1>
          <a href="/" className="text-accent-blue text-sm hover:underline">← Back to Dashboard</a>
        </div>

        {message && <div className="bg-accent-green/10 border border-accent-green/30 rounded p-2 text-accent-green text-sm">{message}</div>}

        {/* Update Metric */}
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h2 className="font-heading font-semibold text-txt-primary mb-3">Update Metric</h2>
          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-xs text-txt-dim block mb-1">Metric Key</label>
              <select value={editKey} onChange={e => { setEditKey(e.target.value); setEditValue(metrics[e.target.value]?.value || ''); }}
                className="w-full px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm outline-none">
                <option value="">Select metric...</option>
                {Object.entries(metrics).map(([key, val]: [string, any]) => (
                  <option key={key} value={key}>{val.label || key}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-txt-dim block mb-1">New Value</label>
              <input value={editValue} onChange={e => setEditValue(e.target.value)}
                className="w-full px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs text-txt-dim block mb-1">Source</label>
              <input value={editSource} onChange={e => setEditSource(e.target.value)}
                className="w-full px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm outline-none" />
            </div>
          </div>
          <button onClick={updateMetric}
            className="px-4 py-2 bg-accent-blue rounded text-white text-sm font-heading hover:bg-accent-blue/80 transition-colors">
            Update Metric
          </button>
        </div>

        {/* Publish Analysis */}
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h2 className="font-heading font-semibold text-txt-primary mb-3">Publish Analysis</h2>
          <input placeholder="Title" value={analysisTitle} onChange={e => setAnalysisTitle(e.target.value)}
            className="w-full mb-3 px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm outline-none" />
          <select value={analysisCategory} onChange={e => setAnalysisCategory(e.target.value)}
            className="w-full mb-3 px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm outline-none">
            <option value="daily_brief">Daily Brief</option>
            <option value="deep_dive">Deep Dive</option>
            <option value="scenario_update">Scenario Update</option>
            <option value="breaking">Breaking</option>
          </select>
          <textarea placeholder="Content (Markdown)" value={analysisContent} onChange={e => setAnalysisContent(e.target.value)}
            rows={10}
            className="w-full mb-3 px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm outline-none resize-y font-mono" />
          <input placeholder="Sources (comma-separated)" value={analysisSources} onChange={e => setAnalysisSources(e.target.value)}
            className="w-full mb-3 px-3 py-2 bg-bg-secondary border border-border rounded text-txt-primary text-sm outline-none" />
          <button onClick={publishAnalysis}
            className="px-4 py-2 bg-accent-purple rounded text-white text-sm font-heading hover:bg-accent-purple/80 transition-colors">
            Publish Analysis
          </button>
        </div>

        {/* Current Metrics Table */}
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h2 className="font-heading font-semibold text-txt-primary mb-3">All Metrics ({Object.keys(metrics).length})</h2>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-bg-card">
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left text-xs text-txt-dim">Key</th>
                  <th className="px-3 py-2 text-left text-xs text-txt-dim">Value</th>
                  <th className="px-3 py-2 text-left text-xs text-txt-dim">Category</th>
                  <th className="px-3 py-2 text-left text-xs text-txt-dim">Source</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(metrics).map(([key, val]: [string, any]) => (
                  <tr key={key} className="border-b border-border/30 hover:bg-bg-card-hover cursor-pointer"
                    onClick={() => { setEditKey(key); setEditValue(val.value); setEditSource(val.source || ''); }}>
                    <td className="px-3 py-2 font-mono text-xs text-txt-dim">{key}</td>
                    <td className="px-3 py-2 font-mono text-txt-primary">{val.value}</td>
                    <td className="px-3 py-2 text-txt-muted">{val.category}</td>
                    <td className="px-3 py-2 text-txt-muted text-xs">{val.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
