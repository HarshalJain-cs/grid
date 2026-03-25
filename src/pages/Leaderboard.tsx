import { useState } from 'react';
import { useGame } from '@/store/gameStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Leaderboard() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [lookupId, setLookupId] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [editData, setEditData] = useState({ teamName: '', zone1: 0, zone2: 0, zone3: 0, zone4: 0, trivia: 0 });
  const [newTeam, setNewTeam] = useState({ teamId: '', teamName: '' });

  const sorted = [...state.leaderboard].sort((a, b) => b.total - a.total);
  const top3 = sorted.slice(0, 3);
  const lookupEntry = state.leaderboard.find(e => e.teamId.toLowerCase() === lookupId.toLowerCase());

  const handleAdminUnlock = () => {
    if (adminPin === '2604') setAdminUnlocked(true);
    else toast.error('Incorrect PIN');
  };

  const startEdit = (teamId: string) => {
    const e = state.leaderboard.find(x => x.teamId === teamId);
    if (!e) return;
    setEditData({ teamName: e.teamName, zone1: e.zone1, zone2: e.zone2, zone3: e.zone3, zone4: e.zone4, trivia: e.trivia });
    setEditingTeam(teamId);
  };

  const saveEdit = () => {
    if (!editingTeam) return;
    dispatch({ type: 'UPDATE_TEAM', teamId: editingTeam, data: editData });
    setEditingTeam(null);
    toast.success('Team updated');
  };

  const addTeam = () => {
    if (!newTeam.teamId.trim()) return;
    dispatch({
      type: 'ADD_TEAM', entry: {
        teamId: newTeam.teamId.trim(), teamName: newTeam.teamName || newTeam.teamId.trim(),
        zone1: 0, zone2: 0, zone3: 0, zone4: 0, trivia: 0, total: 0, timestamp: Date.now()
      }
    });
    setNewTeam({ teamId: '', teamName: '' });
    toast.success('Team added');
  };

  const exportCSV = () => {
    const header = 'Rank,Team ID,Team Name,Z1,Z2,Z3,Z4,Trivia,Total\n';
    const rows = sorted.map((e, i) => `${i + 1},${e.teamId},${e.teamName},${e.zone1},${e.zone2},${e.zone3},${e.zone4},${e.trivia},${e.total}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'gridquest_leaderboard.csv'; a.click();
  };

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl text-zone-fg text-center mb-8">Leaderboard</h1>

      {/* Team Lookup */}
      <div className="max-w-md mx-auto mb-12">
        <div className="flex gap-2">
          <input value={lookupId} onChange={e => setLookupId(e.target.value)} placeholder="Enter Team ID"
            className="flex-1 bg-zone-bg2 border border-zone-accent/20 rounded-xl px-4 py-3 font-mono text-sm text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
          <button onClick={() => {}} className="bg-zone-accent text-zone-bg font-body font-medium px-6 py-3 rounded-full">Look Up</button>
        </div>
        {lookupEntry && (
          <div className="mt-4 border border-zone-accent/20 rounded-xl p-4 bg-zone-bg2/50">
            <p className="font-display text-lg text-zone-fg mb-1">Team {lookupEntry.teamId}</p>
            <p className="font-mono text-2xl text-zone-accent font-bold mb-3">{lookupEntry.total}/500</p>
            {(['zone1', 'zone2', 'zone3', 'zone4', 'trivia'] as const).map(z => (
              <div key={z} className="flex justify-between py-1">
                <span className="font-body text-sm text-zone-muted capitalize">{z}</span>
                <span className="font-mono text-sm text-zone-accent">{lookupEntry[z]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Podium */}
      {top3.length >= 3 && (
        <div className="flex items-end justify-center gap-4 mb-12 h-48">
          {[1, 0, 2].map(i => {
            const e = top3[i];
            if (!e) return null;
            const heights = ['h-40', 'h-32', 'h-24'];
            const medals = ['🥇', '🥈', '🥉'];
            return (
              <div key={e.teamId} className={`flex flex-col items-center justify-end ${heights[i]} w-28`}>
                <span className="text-2xl mb-1">{medals[i]}</span>
                <div className={`w-full bg-zone-accent/10 border border-zone-accent/30 rounded-t-xl flex flex-col items-center justify-center flex-1 p-2`}>
                  <p className="font-mono text-xs text-zone-fg truncate w-full text-center">{e.teamName}</p>
                  <p className="font-mono text-lg text-zone-accent font-bold">{e.total}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rankings Table */}
      <div className="border border-zone-accent/20 rounded-xl overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zone-bg2">
                {['Rank', 'Team', 'Z1', 'Z2', 'Z3', 'Z4', 'Trivia', 'Total'].map(h => (
                  <th key={h} className="px-3 py-2 font-mono text-[11px] text-zone-muted text-left uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((e, i) => (
                <tr key={e.teamId} className={`border-t border-zone-accent/10 ${e.teamId === state.teamId ? 'bg-zone-accent/5' : ''}`}>
                  <td className="px-3 py-2 font-mono text-sm text-zone-accent">{i + 1}</td>
                  <td className="px-3 py-2 font-body text-sm text-zone-fg">{e.teamName}</td>
                  <td className="px-3 py-2 font-mono text-sm text-zone-muted">{e.zone1}</td>
                  <td className="px-3 py-2 font-mono text-sm text-zone-muted">{e.zone2}</td>
                  <td className="px-3 py-2 font-mono text-sm text-zone-muted">{e.zone3}</td>
                  <td className="px-3 py-2 font-mono text-sm text-zone-muted">{e.zone4}</td>
                  <td className="px-3 py-2 font-mono text-sm text-zone-muted">{e.trivia}</td>
                  <td className="px-3 py-2 font-mono text-sm text-zone-accent font-bold">{e.total}</td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-8 text-center font-body text-sm text-zone-muted">No teams yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Panel */}
      <div className="border border-zone-accent/20 rounded-2xl p-6 bg-zone-bg2/30">
        <h3 className="font-display text-xl text-zone-fg mb-4">Admin Panel</h3>
        {!adminUnlocked ? (
          <div className="flex gap-2 max-w-xs">
            <input type="password" value={adminPin} onChange={e => setAdminPin(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminUnlock()}
              placeholder="PIN" className="flex-1 bg-zone-bg2 border border-zone-accent/20 rounded-xl px-4 py-2 font-mono text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
            <button onClick={handleAdminUnlock} className="bg-zone-accent text-zone-bg font-body font-medium px-6 py-2 rounded-full">Unlock</button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Add Team */}
            <div>
              <p className="font-mono text-[11px] text-zone-muted uppercase mb-2">Add Team</p>
              <div className="flex gap-2 flex-wrap">
                <input value={newTeam.teamId} onChange={e => setNewTeam(p => ({ ...p, teamId: e.target.value }))} placeholder="Team ID"
                  className="bg-zone-bg2 border border-zone-accent/20 rounded-xl px-3 py-2 font-mono text-sm text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
                <input value={newTeam.teamName} onChange={e => setNewTeam(p => ({ ...p, teamName: e.target.value }))} placeholder="Team Name"
                  className="bg-zone-bg2 border border-zone-accent/20 rounded-xl px-3 py-2 font-mono text-sm text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
                <button onClick={addTeam} className="bg-zone-accent text-zone-bg font-mono text-xs px-4 py-2 rounded-full">Add</button>
              </div>
            </div>

            {/* Edit Teams */}
            <div className="space-y-2">
              <p className="font-mono text-[11px] text-zone-muted uppercase">Manage Teams</p>
              {state.leaderboard.map(e => (
                <div key={e.teamId} className="border border-zone-accent/10 rounded-xl p-3">
                  {editingTeam === e.teamId ? (
                    <div className="space-y-2">
                      <input value={editData.teamName} onChange={ev => setEditData(p => ({ ...p, teamName: ev.target.value }))} placeholder="Name"
                        className="w-full bg-zone-bg2 border border-zone-accent/20 rounded-lg px-3 py-1.5 font-mono text-sm text-zone-fg focus:outline-none" />
                      <div className="grid grid-cols-5 gap-2">
                        {(['zone1', 'zone2', 'zone3', 'zone4', 'trivia'] as const).map(z => (
                          <div key={z}>
                            <label className="font-mono text-[10px] text-zone-muted">{z}</label>
                            <input type="number" min={0} max={100} value={editData[z]} onChange={ev => setEditData(p => ({ ...p, [z]: Number(ev.target.value) }))}
                              className="w-full bg-zone-bg2 border border-zone-accent/20 rounded-lg px-2 py-1 font-mono text-sm text-zone-fg focus:outline-none" />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="bg-zone-accent text-zone-bg font-mono text-xs px-4 py-1.5 rounded-full">Save</button>
                        <button onClick={() => setEditingTeam(null)} className="font-mono text-xs text-zone-muted">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm text-zone-fg">{e.teamName} ({e.teamId}) — {e.total} pts</span>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(e.teamId)} className="font-mono text-xs text-zone-accent hover:underline">Edit</button>
                        <button onClick={() => { dispatch({ type: 'DELETE_TEAM', teamId: e.teamId }); toast.success('Deleted'); }} className="font-mono text-xs text-red-400 hover:underline">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="flex gap-3">
              <button onClick={() => { if (confirm('Reset all leaderboard data?')) { dispatch({ type: 'RESET_LEADERBOARD' }); toast.success('Leaderboard reset'); } }}
                className="border border-red-400/50 text-red-400 font-mono text-xs px-4 py-2 rounded-full hover:bg-red-400/10">Reset Leaderboard</button>
              <button onClick={exportCSV} className="border border-zone-accent/50 text-zone-accent font-mono text-xs px-4 py-2 rounded-full hover:bg-zone-accent/10">Export CSV</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
