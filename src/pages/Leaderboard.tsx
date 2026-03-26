import { useState, useEffect, useRef } from 'react';
import { useGame } from '@/store/gameStore';
import { useConvexLeaderboard } from '@/hooks/useConvexLeaderboard';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function Leaderboard() {
  const { state } = useGame();
  const { leaderboard, isLoading, upsertEntry, updateEntry, deleteEntry, resetLeaderboard } = useConvexLeaderboard();
  const [lookupId, setLookupId] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [editData, setEditData] = useState({ teamName: '', zone1: 0, zone2: 0, zone3: 0, zone4: 0, trivia: 0 });
  const [newTeam, setNewTeam] = useState({ teamId: '', teamName: '' });
  const [lastUpdate, setLastUpdate] = useState<{ teamName: string; timestamp: number } | null>(null);
  const prevLeaderboardRef = useRef<typeof leaderboard>([]);

  // Detect real-time changes
  useEffect(() => {
    const prev = prevLeaderboardRef.current;
    if (prev.length > 0 && leaderboard.length > 0) {
      // Check for new teams
      const newTeams = leaderboard.filter(e => !prev.find(p => p.teamId === e.teamId));
      if (newTeams.length > 0) {
        setLastUpdate({ teamName: newTeams[0].teamName, timestamp: Date.now() });
      } else {
        // Check for score changes
        for (const entry of leaderboard) {
          const old = prev.find(p => p.teamId === entry.teamId);
          if (old && old.total !== entry.total) {
            setLastUpdate({ teamName: entry.teamName, timestamp: Date.now() });
            break;
          }
        }
      }
    }
    prevLeaderboardRef.current = leaderboard;
  }, [leaderboard]);

  // Auto-dismiss update indicator after 5s
  useEffect(() => {
    if (!lastUpdate) return;
    const timer = setTimeout(() => setLastUpdate(null), 5000);
    return () => clearTimeout(timer);
  }, [lastUpdate]);

  const sorted = [...leaderboard].sort((a, b) => b.total - a.total);
  const top3 = sorted.slice(0, 3);
  const lookupEntry = leaderboard.find(e => e.teamId.toLowerCase() === lookupId.toLowerCase());

  const handleAdminUnlock = () => {
    if (adminPin === 'ieeecs26') setAdminUnlocked(true);
    else toast.error('Incorrect PIN');
  };

  const startEdit = (teamId: string) => {
    const e = leaderboard.find(x => x.teamId === teamId);
    if (!e) return;
    setEditData({ teamName: e.teamName, zone1: e.zone1, zone2: e.zone2, zone3: e.zone3, zone4: e.zone4, trivia: e.trivia });
    setEditingTeam(teamId);
  };

  const saveEdit = async () => {
    if (!editingTeam) return;
    try {
      await updateEntry(editingTeam, editData);
      setEditingTeam(null);
      toast.success('Team updated');
    } catch (e) {
      toast.error('Failed to update team');
    }
  };

  const addTeam = async () => {
    if (!newTeam.teamId.trim()) return;
    try {
      await upsertEntry({
        teamId: newTeam.teamId.trim(),
        teamName: newTeam.teamName || newTeam.teamId.trim(),
        zone1: 0, zone2: 0, zone3: 0, zone4: 0, trivia: 0, total: 0,
        timestamp: Date.now(),
      });
      setNewTeam({ teamId: '', teamName: '' });
      toast.success('Team added');
    } catch (e) {
      toast.error('Failed to add team');
    }
  };

  const exportCSV = () => {
    const header = 'Rank,Team ID,Team Name,Trivia,Z2,Z3,Z1,Z4,Total\n';
    const rows = sorted.map((e, i) => `${i + 1},${e.teamId},${e.teamName},${e.trivia},${e.zone2},${e.zone3},${e.zone1},${e.zone4},${e.total}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'gridquest_leaderboard.csv'; a.click();
  };

  if (isLoading) {
    return (
      <div className="pt-20 pb-12 px-4 text-center">
        <p className="font-body text-ink-muted">Loading leaderboard…</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-4xl mx-auto">
      {/* Live update indicator */}
      <AnimatePresence>
        {lastUpdate && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-leaf text-white font-mono text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            {lastUpdate.teamName} just updated!
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="font-display text-3xl md:text-5xl text-ink text-center mb-6">Leaderboard</h1>

      {/* Team Lookup */}
      <div className="max-w-md mx-auto mb-10">
        <div className="flex gap-2">
          <input value={lookupId} onChange={e => setLookupId(e.target.value)} placeholder="Enter Team ID"
            className="flex-1 bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-leaf min-h-[48px]" />
          <button onClick={() => {}} className="bg-leaf text-white font-body font-medium px-5 py-3 rounded-full min-h-[48px] whitespace-nowrap">Look Up</button>
        </div>
        {lookupEntry && (
          <div className="mt-4 border border-cream-border rounded-xl p-4 bg-white">
            <p className="font-display text-lg text-ink mb-1">Team {lookupEntry.teamId}</p>
            <p className="font-mono text-2xl text-leaf font-bold mb-3">{lookupEntry.total}/380</p>
            {(['trivia', 'zone2', 'zone3', 'zone1', 'zone4'] as const).map(z => (
              <div key={z} className="flex justify-between py-1">
                <span className="font-body text-sm text-ink-muted capitalize">{z}</span>
                <span className="font-mono text-sm text-leaf">{lookupEntry[z]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Podium */}
      {top3.length >= 3 && (
        <div className="flex items-end justify-center gap-3 mb-10 h-44">
          {[1, 0, 2].map(i => {
            const e = top3[i];
            if (!e) return null;
            const heights = ['h-40', 'h-32', 'h-24'];
            const medals = ['🥇', '🥈', '🥉'];
            const ranks = ['1st', '2nd', '3rd'];
            return (
              <div key={e.teamId} className={`flex flex-col items-center justify-end ${heights[i]} w-[30%] max-w-28`}>
                <span className="text-2xl mb-1">{medals[i]}</span>
                <div className="w-full bg-leaf-bg border border-leaf/30 rounded-t-xl flex flex-col items-center justify-center flex-1 p-2">
                  <p className="font-mono text-[10px] text-ink-muted">{ranks[i]}</p>
                  <p className="font-mono text-[11px] text-ink truncate w-full text-center">{e.teamName}</p>
                  <p className="font-mono text-lg text-leaf font-bold">{e.total}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rankings — Card layout on mobile, table on desktop */}
      <div className="mb-10">
        {/* Mobile card view */}
        <div className="md:hidden space-y-2">
          {sorted.map((e, i) => (
            <div key={e.teamId} className={`border border-cream-border rounded-xl p-3 ${e.teamId === state.teamId ? 'bg-leaf-bg' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-leaf font-bold w-6">#{i + 1}</span>
                  <span className="font-body text-sm text-ink font-medium">{e.teamName}</span>
                </div>
                <span className="font-mono text-lg text-leaf font-bold">{e.total}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {([['T', e.trivia], ['Z2', e.zone2], ['Z3', e.zone3], ['Z1', e.zone1], ['Z4', e.zone4]] as [string, number][]).map(([label, score]) => (
                  <span key={label} className="font-mono text-[11px] text-ink-muted bg-cream-alt px-2 py-0.5 rounded">
                    {label}: {score}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {sorted.length === 0 && (
            <p className="text-center font-body text-sm text-ink-muted py-8">No teams yet</p>
          )}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block border border-cream-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-cream-alt">
                {['Rank', 'Team', 'Trivia', 'Z2', 'Z3', 'Z1', 'Z4', 'Total'].map(h => (
                  <th key={h} className="px-3 py-2 font-mono text-[11px] text-ink-muted text-left uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((e, i) => (
                <tr key={e.teamId} className={`border-t border-cream-border ${e.teamId === state.teamId ? 'bg-leaf-bg' : 'bg-white'}`}>
                  <td className="px-3 py-2 font-mono text-sm text-leaf">{i + 1}</td>
                  <td className="px-3 py-2 font-body text-sm text-ink">{e.teamName}</td>
                  <td className="px-3 py-2 font-mono text-sm text-ink-muted">{e.trivia}</td>
                  <td className="px-3 py-2 font-mono text-sm text-ink-muted">{e.zone2}</td>
                  <td className="px-3 py-2 font-mono text-sm text-ink-muted">{e.zone3}</td>
                  <td className="px-3 py-2 font-mono text-sm text-ink-muted">{e.zone1}</td>
                  <td className="px-3 py-2 font-mono text-sm text-ink-muted">{e.zone4}</td>
                  <td className="px-3 py-2 font-mono text-sm text-leaf font-bold">{e.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Panel */}
      <div className="border border-cream-border rounded-2xl p-4 md:p-6 bg-white">
        <h3 className="font-display text-xl text-ink mb-4">Admin Panel</h3>
        {!adminUnlocked ? (
          <div className="flex gap-2">
            <input type="password" value={adminPin} onChange={e => setAdminPin(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminUnlock()}
              placeholder="PIN" className="flex-1 bg-cream border border-cream-border rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-leaf min-h-[48px]" />
            <button onClick={handleAdminUnlock} className="bg-leaf text-white font-body font-medium px-6 py-3 rounded-full min-h-[48px]">Unlock</button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[11px] text-ink-muted uppercase mb-2">Add Team</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input value={newTeam.teamId} onChange={e => setNewTeam(p => ({ ...p, teamId: e.target.value }))} placeholder="Team ID"
                  className="flex-1 bg-cream border border-cream-border rounded-xl px-3 py-3 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-leaf min-h-[48px]" />
                <input value={newTeam.teamName} onChange={e => setNewTeam(p => ({ ...p, teamName: e.target.value }))} placeholder="Team Name"
                  className="flex-1 bg-cream border border-cream-border rounded-xl px-3 py-3 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-leaf min-h-[48px]" />
                <button onClick={addTeam} className="bg-leaf text-white font-mono text-xs px-4 py-3 rounded-full min-h-[48px]">Add</button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[11px] text-ink-muted uppercase">Manage Teams</p>
              {leaderboard.map(e => (
                <div key={e.teamId} className="border border-cream-border rounded-xl p-3">
                  {editingTeam === e.teamId ? (
                    <div className="space-y-2">
                      <input value={editData.teamName} onChange={ev => setEditData(p => ({ ...p, teamName: ev.target.value }))} placeholder="Name"
                        className="w-full bg-cream border border-cream-border rounded-lg px-3 py-2.5 font-mono text-sm text-ink focus:outline-none min-h-[44px]" />
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {(['zone1', 'zone2', 'zone3', 'zone4', 'trivia'] as const).map(z => (
                          <div key={z}>
                            <label className="font-mono text-[10px] text-ink-muted">{z}</label>
                            <input type="number" min={0} max={100} value={editData[z]} onChange={ev => setEditData(p => ({ ...p, [z]: Number(ev.target.value) }))}
                              className="w-full bg-cream border border-cream-border rounded-lg px-2 py-2 font-mono text-sm text-ink focus:outline-none min-h-[44px]" />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="bg-leaf text-white font-mono text-xs px-4 py-2.5 rounded-full min-h-[44px]">Save</button>
                        <button onClick={() => setEditingTeam(null)} className="font-mono text-xs text-ink-muted min-h-[44px] px-3">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-body text-sm text-ink truncate">{e.teamName} ({e.teamId}) — {e.total} pts</span>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => startEdit(e.teamId)} className="font-mono text-xs text-leaf hover:underline min-h-[44px] px-2">Edit</button>
                        <button onClick={async () => { try { await deleteEntry(e.teamId); toast.success('Deleted'); } catch { toast.error('Failed to delete'); } }} className="font-mono text-xs text-red-500 hover:underline min-h-[44px] px-2">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={async () => { if (confirm('Reset all leaderboard data?')) { try { await resetLeaderboard(); toast.success('Leaderboard reset'); } catch { toast.error('Failed to reset'); } } }}
                className="border border-red-300 text-red-500 font-mono text-xs px-4 py-3 rounded-full hover:bg-red-50 min-h-[48px]">Reset Leaderboard</button>
              <button onClick={exportCSV} className="border border-leaf/50 text-leaf font-mono text-xs px-4 py-3 rounded-full hover:bg-leaf-bg min-h-[48px]">Export CSV</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
