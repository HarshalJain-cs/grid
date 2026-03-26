import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerPanel from '@/components/shared/VolunteerPanel';
import { Leaf, Building2, HelpCircle, Lock, Timer } from 'lucide-react';

const FORM_PIN = 'ieeecs2';
const FORM_URL = 'https://docs.google.com/forms/d/1YMMsAzu9c7NY_4pepCMuSlDBpog36ftd5gb6ItVHbHs/edit';

export default function Zone2CarbonQuest() {
  const [formPin, setFormPin] = useState('');
  const [formUnlocked, setFormUnlocked] = useState(false);

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">Zone 02</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink">Carbon Quest</h1>
        <span className="inline-block font-mono text-[11px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full mt-3">DIGITAL ZONE · 5 MINUTES</span>
      </div>

      <Tabs defaultValue="rules">
        <TabsList className="bg-cream-alt border border-cream-border">
          <TabsTrigger value="rules" className="data-[state=active]:bg-leaf data-[state=active]:text-white font-mono text-xs">Rules & Info</TabsTrigger>
          <TabsTrigger value="form" className="data-[state=active]:bg-leaf data-[state=active]:text-white font-mono text-xs">Start Round</TabsTrigger>
          <TabsTrigger value="volunteer" className="data-[state=active]:bg-leaf data-[state=active]:text-white font-mono text-xs">Volunteer</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6 space-y-6">
          {/* Timer badge */}
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <Timer size={16} className="text-amber-600" />
            <p className="font-mono text-xs text-amber-700">Time Limit: 5 minutes — manage your time wisely across all 3 sections</p>
          </div>

          {/* Section 1 */}
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0">
                <Leaf size={16} className="text-leaf" />
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">Section 1: Track & Reduce Your Footprint</h3>
                <p className="font-mono text-[11px] text-ink-muted uppercase mt-1">Lifestyle Assessment</p>
              </div>
            </div>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              You will track and reduce your carbon footprint by choosing options based on your current lifestyle and then refining them realistically. Be honest — extreme changes are penalized.
            </p>
            <div className="mt-3 space-y-1">
              {['Answer questions about travel, AC usage, food, screen time & more', 'Then optimize your choices realistically', 'Changing more than 2 steps on any question triggers a penalty'].map((r, i) => (
                <p key={i} className="font-body text-sm text-ink-muted">
                  <span className="font-mono text-leaf mr-2">→</span>{r}
                </p>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0">
                <Building2 size={16} className="text-leaf" />
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">Section 2: Upgrade the Campus</h3>
                <p className="font-mono text-[11px] text-ink-muted uppercase mt-1">Budget Challenge</p>
              </div>
            </div>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              You will upgrade a campus within a ₹100 budget. Your decisions will be evaluated based on energy efficiency, environmental impact, and long-term usefulness, with success depending on how effectively your choices work together.
            </p>
            <div className="mt-3 space-y-1">
              {['Choose from 10 upgrade options (solar, LED, composting, etc.)', 'Combo bonuses for smart pairings', 'Spending exactly ₹100 earns a bonus'].map((r, i) => (
                <p key={i} className="font-body text-sm text-ink-muted">
                  <span className="font-mono text-leaf mr-2">→</span>{r}
                </p>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0">
                <HelpCircle size={16} className="text-leaf" />
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">Section 3: Sustainability Riddles</h3>
                <p className="font-mono text-[11px] text-ink-muted uppercase mt-1">Knowledge Test</p>
              </div>
            </div>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              Apply your green knowledge to solve sustainability-based riddles. Think carefully — each one tests a different aspect of environmental awareness.
            </p>
          </div>

          {/* Scoring */}
          <div className="border border-cream-border rounded-xl overflow-hidden">
            <div className="bg-cream-alt px-4 py-2 font-mono text-[11px] text-ink-muted uppercase">Scoring Breakdown</div>
            {[['Section 1 (Lifestyle)', 'up to 30 pts'], ['Section 2 (Campus)', 'up to 45 pts'], ['Section 3 (Riddles)', 'up to 30 pts'], ['Total Maximum', '100 pts']].map(([l, p]) => (
              <div key={l} className="flex justify-between px-4 py-2.5 border-t border-cream-border">
                <span className="font-body text-sm text-ink">{l}</span>
                <span className="font-mono text-sm text-leaf font-bold">{p}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-leaf-bg border border-leaf/20 rounded-xl p-5">
            <h3 className="font-display text-lg text-ink mb-3">Tips & Strategy</h3>
            <div className="space-y-2">
              {[
                'Be honest in Section 1 — extreme jumps are penalized',
                'In Section 2, look for combo bonuses to maximize impact',
                'Don\'t overspend your ₹100 budget — going over means 0 points',
                'Read riddles carefully — the answer is often in the wording',
                'Manage your 5 minutes across all 3 sections',
              ].map((tip, i) => (
                <p key={i} className="font-body text-sm text-ink-muted">
                  <span className="font-mono text-leaf mr-2">→</span>{tip}
                </p>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="form" className="mt-6">
          {!formUnlocked ? (
            <div className="max-w-sm mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cream-alt border border-cream-border flex items-center justify-center mx-auto mb-4">
                <Lock size={24} className="text-ink-muted" />
              </div>
              <h3 className="font-display text-xl text-ink mb-2">Form Locked</h3>
              <p className="font-body text-sm text-ink-muted mb-6">Ask your volunteer to enter the PIN to access the round form.</p>
              <input
                type="password"
                value={formPin}
                onChange={e => setFormPin(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && formPin === FORM_PIN && setFormUnlocked(true)}
                placeholder="Enter PIN"
                className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink text-center text-base sm:text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-leaf mb-4 min-h-[48px]"
              />
              <button
                onClick={() => formPin === FORM_PIN ? setFormUnlocked(true) : null}
                className="bg-leaf text-white font-body font-medium px-8 py-3 rounded-full hover:bg-leaf/90 transition-colors"
              >
                Unlock Form
              </button>
              {formPin.length > 0 && formPin !== FORM_PIN && (
                <p className="font-mono text-xs text-red-500 mt-2">Incorrect PIN — ask your volunteer</p>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-leaf-bg flex items-center justify-center mx-auto mb-2">
                <Leaf size={24} className="text-leaf" />
              </div>
              <h3 className="font-display text-xl text-ink">Form Unlocked!</h3>
              <p className="font-body text-sm text-ink-muted">Click the button below to open the Carbon Quest form. Good luck!</p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-leaf text-white font-body font-medium px-8 py-3 rounded-full hover:bg-leaf/90 transition-colors"
              >
                Open Carbon Quest Form →
              </a>
            </div>
          )}
        </TabsContent>

        <TabsContent value="volunteer" className="mt-6">
          <VolunteerPanel zone="zone2" judgingCriteria={[
            { label: 'Section 1 (Lifestyle)', points: 'up to 30 pts' },
            { label: 'Section 2 (Campus)', points: 'up to 45 pts' },
            { label: 'Section 3 (Riddles)', points: 'up to 30 pts' },
          ]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
