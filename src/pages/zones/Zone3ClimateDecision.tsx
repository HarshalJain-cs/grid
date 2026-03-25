import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerPanel from '@/components/shared/VolunteerPanel';
import { Cloud, Lock, Timer, AlertTriangle, Lightbulb } from 'lucide-react';

const FORM_PIN = 'ieeecs26';
const FORM_URL = 'https://docs.google.com/forms/d/1OkGHoIZcuhK9V3sCIjx3LhefrH35ttuB5boGQdMsPkE/edit';

export default function Zone3ClimateDecision() {
  const [formPin, setFormPin] = useState('');
  const [formUnlocked, setFormUnlocked] = useState(false);

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">Zone 03</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink">Climate Decision Room</h1>
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
            <p className="font-mono text-xs text-amber-700">Time Limit: 5 minutes — think critically, decide wisely</p>
          </div>

          {/* Overview */}
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <h3 className="font-display text-xl text-ink mb-3">The Challenge</h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              You will be given 12 scenario-based questions. Each scenario presents a climate crisis or sustainability dilemma. Choose the best option that you think will solve the crisis. There are no wrong answers — but some choices are significantly better than others.
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-3">
            <h3 className="font-display text-lg text-ink">Rules</h3>
            {[
              { icon: Cloud, text: '12 real-world climate scenarios to solve' },
              { icon: Lightbulb, text: 'Choose the best option for each scenario — balance cost, sustainability, and impact' },
              { icon: AlertTriangle, text: 'No option is completely wrong, but some earn significantly more points' },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-cream-border rounded-xl bg-white">
                <div className="w-8 h-8 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <r.icon size={14} className="text-leaf" />
                </div>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Scoring */}
          <div className="border border-cream-border rounded-xl overflow-hidden">
            <div className="bg-cream-alt px-4 py-2 font-mono text-[11px] text-ink-muted uppercase">Scoring</div>
            {[['Best choice per scenario', 'Full marks'], ['Second-best choice', 'Partial marks'], ['Least effective choice', 'Minimum marks'], ['Total Maximum', '100 pts']].map(([l, p]) => (
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
                'Think about long-term sustainability, not just short-term fixes',
                'Consider the balance between cost, environmental impact, and grid reliability',
                'Discuss with your teammate — two perspectives are better than one',
                'Read each scenario carefully before choosing',
                'Don\'t overthink — trust your instincts on sustainability',
              ].map((tip, i) => (
                <p key={i} className="font-body text-sm text-ink-muted">
                  <span className="font-mono text-leaf mr-2">→</span>{tip}
                </p>
              ))}
            </div>
          </div>

          {/* Motivation */}
          <div className="text-center py-6">
            <p className="font-display text-2xl text-ink mb-2">Every decision matters.</p>
            <p className="font-body text-sm text-ink-muted">Real-world problems demand real thinking. Show us your best judgment!</p>
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
                className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-leaf mb-4"
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
                <Cloud size={24} className="text-leaf" />
              </div>
              <h3 className="font-display text-xl text-ink">Form Unlocked!</h3>
              <p className="font-body text-sm text-ink-muted">Click the button below to open the Climate Decision form. Good luck!</p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-leaf text-white font-body font-medium px-8 py-3 rounded-full hover:bg-leaf/90 transition-colors"
              >
                Open Climate Decision Form →
              </a>
            </div>
          )}
        </TabsContent>

        <TabsContent value="volunteer" className="mt-6">
          <VolunteerPanel zone="zone3" judgingCriteria={[
            { label: 'Best choice per scenario', points: 'Full marks' },
            { label: 'Second-best choice', points: 'Partial marks' },
            { label: 'Total maximum', points: '100 pts' },
          ]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
